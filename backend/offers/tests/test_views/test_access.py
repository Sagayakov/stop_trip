from functools import partial

from django.urls import reverse
from pytest import mark
from rest_framework import status
from rest_framework.test import APITestCase

from offers.constants import CategoryChoices
from offers.models import Advertisement
from users.tests.factories import UserFactory
from ..factories import BaseAdvertisementFactory


@mark.django_db
class AdvertisementAccessTest(APITestCase):
    """Права доступа к объявлениям."""

    def setUp(self):
        self.list_url: str = reverse("advertisements-list")
        self.detail_url = partial(reverse, "advertisements-detail")

    def test_patch_by_not_owner_is_forbidden(self):
        owner = UserFactory()
        stranger = UserFactory()
        advertisement = BaseAdvertisementFactory(owner=owner, title="original")
        self.client.force_login(stranger)

        res = self.client.patch(
            self.detail_url(kwargs={"slug": advertisement.slug}),
            data={"title": "hacked"},
            format="json",
        )

        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)
        advertisement.refresh_from_db()
        self.assertEqual(advertisement.title, "original")
        self.assertEqual(advertisement.owner, owner)

    def test_patch_by_anonymous_is_unauthorized(self):
        advertisement = BaseAdvertisementFactory(owner=UserFactory())

        res = self.client.patch(
            self.detail_url(kwargs={"slug": advertisement.slug}),
            data={"is_published": False},
            format="json",
        )

        self.assertIn(res.status_code, (status.HTTP_401_UNAUTHORIZED, status.HTTP_403_FORBIDDEN))
        advertisement.refresh_from_db()
        self.assertTrue(advertisement.is_published)

    def test_owner_cannot_be_changed_through_update(self):
        owner = UserFactory()
        other_user = UserFactory()
        advertisement = BaseAdvertisementFactory(owner=owner)
        self.client.force_login(owner)

        res = self.client.patch(
            self.detail_url(kwargs={"slug": advertisement.slug}),
            data={"owner": other_user.id, "is_published": False},
            format="json",
        )

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        advertisement.refresh_from_db()
        self.assertEqual(advertisement.owner, owner)
        self.assertFalse(advertisement.is_published)

    def test_update_title_keeps_slug(self):
        owner = UserFactory()
        advertisement = BaseAdvertisementFactory(owner=owner, title="old title")
        old_slug = advertisement.slug
        self.client.force_login(owner)

        res = self.client.patch(
            self.detail_url(kwargs={"slug": old_slug}),
            data={"title": "new title"},
            format="json",
        )

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        advertisement.refresh_from_db()
        self.assertEqual(advertisement.title, "new title")
        self.assertEqual(advertisement.slug, old_slug)

    def test_unpublished_visible_only_to_owner(self):
        owner = UserFactory()
        advertisement = BaseAdvertisementFactory(owner=owner, is_published=False)
        url = self.detail_url(kwargs={"slug": advertisement.slug})

        self.assertEqual(self.client.get(url).status_code, status.HTTP_404_NOT_FOUND)

        self.client.force_login(UserFactory())
        self.assertEqual(self.client.get(url).status_code, status.HTTP_404_NOT_FOUND)

        self.client.force_login(owner)
        self.assertEqual(self.client.get(url).status_code, status.HTTP_200_OK)

    def test_new_advertisement_appears_in_list_immediately(self):
        """Список не должен кэшироваться: новое объявление видно сразу."""

        owner = UserFactory()
        BaseAdvertisementFactory(owner=owner, category=CategoryChoices.TAXI.value)
        self.assertEqual(self.client.get(self.list_url).json()["count"], 1)

        BaseAdvertisementFactory(owner=owner, category=CategoryChoices.TAXI.value)
        self.assertEqual(self.client.get(self.list_url).json()["count"], 2)

    def test_create_with_unknown_category_returns_400(self):
        self.client.force_login(UserFactory())

        res = self.client.post(self.list_url, data={"category": "unknown", "title": "x"})

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("category", res.json())
        self.assertEqual(Advertisement.objects.count(), 0)

    def test_reference_endpoints_are_public(self):
        for name, params in (
            ("advertisements-get-regions-by-country", {"country": "india"}),
            ("advertisements-get-cities-by-region", {"region": "north-goa"}),
            ("advertisements-get-transport-brands", {}),
            ("advertisements-get-transport-models-by-brand", {"brand": "audi"}),
        ):
            res = self.client.get(reverse(name), data=params)
            self.assertEqual(res.status_code, status.HTTP_200_OK, name)

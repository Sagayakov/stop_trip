from functools import partial

from django.urls import reverse
from pytest import mark
from rest_framework import status
from rest_framework.test import APITestCase

from users.tests.factories import UserFactory
from ..factories import BaseAdvertisementFactory


@mark.django_db
class ContactsTest(APITestCase):
    """Телефон продавца: только по кнопке и с ограничением частоты."""

    def setUp(self):
        self.detail_url = partial(reverse, "advertisements-detail")
        self.contacts_url = partial(reverse, "advertisements-contacts")
        self.list_url = reverse("advertisements-list")

    def test_phone_not_in_public_responses(self):
        owner = UserFactory(phone="+84901234567")
        advertisement = BaseAdvertisementFactory(owner=owner)

        detail = self.client.get(self.detail_url(kwargs={"slug": advertisement.slug})).json()
        self.assertNotIn("phone", detail["owner"])
        self.assertNotIn("email", detail["owner"])

        listing = self.client.get(self.list_url).json()
        self.assertNotIn("+84901234567", str(listing))

    def test_contacts_returns_phone_for_anonymous(self):
        owner = UserFactory(phone="+84901234567")
        advertisement = BaseAdvertisementFactory(owner=owner)

        res = self.client.get(self.contacts_url(kwargs={"slug": advertisement.slug}))

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.json()["phone"], "+84901234567")

    def test_contacts_of_unpublished_advertisement_hidden(self):
        advertisement = BaseAdvertisementFactory(owner=UserFactory(), is_published=False)

        res = self.client.get(self.contacts_url(kwargs={"slug": advertisement.slug}))

        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)

    def test_contacts_throttled_for_anonymous(self):
        advertisement = BaseAdvertisementFactory(owner=UserFactory())
        url = self.contacts_url(kwargs={"slug": advertisement.slug})

        statuses = [self.client.get(url).status_code for _ in range(21)]

        # 20 запросов в час с одного IP проходят, 21-й — отклоняется.
        self.assertEqual(statuses[:20], [status.HTTP_200_OK] * 20)
        self.assertEqual(statuses[20], status.HTTP_429_TOO_MANY_REQUESTS)

from django.db import connection
from django.test.utils import CaptureQueriesContext
from django.urls import reverse
from pytest import mark
from rest_framework.test import APITestCase

from offers.constants import CategoryChoices
from users.tests.factories import UserFactory
from ..factories import BaseAdvertisementFactory


@mark.django_db
class GuestCacheTest(APITestCase):
    """Лента кэшируется для гостей и сразу обновляется при изменениях."""

    def setUp(self):
        self.list_url = reverse("advertisements-list")

    def test_second_request_served_from_cache(self):
        BaseAdvertisementFactory(owner=UserFactory(), category=CategoryChoices.TAXI.value)
        first = self.client.get(self.list_url)

        with self.assertNumQueries(0):
            second = self.client.get(self.list_url)

        self.assertEqual(first.json(), second.json())

    def test_cache_reset_on_change(self):
        owner = UserFactory()
        advertisement = BaseAdvertisementFactory(owner=owner, title="старое")
        self.client.get(self.list_url)

        advertisement.title = "новое"
        advertisement.save()

        res = self.client.get(self.list_url).json()
        self.assertEqual(res["results"][0]["title"], "новое")

    def test_cache_reset_on_delete(self):
        advertisement = BaseAdvertisementFactory(owner=UserFactory())
        self.assertEqual(self.client.get(self.list_url).json()["count"], 1)

        advertisement.delete()

        self.assertEqual(self.client.get(self.list_url).json()["count"], 0)

    def test_logged_in_user_not_served_from_cache(self):
        BaseAdvertisementFactory(owner=UserFactory())
        self.client.get(self.list_url)
        self.client.force_login(UserFactory())

        with CaptureQueriesContext(connection) as queries:
            self.client.get(self.list_url)

        self.assertGreater(len(queries), 0)

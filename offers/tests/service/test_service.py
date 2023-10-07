from django.urls import reverse
from pytest import mark
from rest_framework import status
from functools import partial
from rest_framework.test import APITestCase
from offers.models import Advertisement
from users.tests.factories import UserFactory
from offers.constants import (
    CategoryChoices,
)


@mark.django_db
class AdvertisementViewSetTest(APITestCase):
    def setUp(self):
        self.list_url: str = reverse("advertisements-list")
        self.detail_url = partial(reverse, "advertisements-detail")

    def test_create_service(self):
        payload = {
            "category": CategoryChoices.SERVICE.value,
            "title": "test",
            "price": 10_000,
            "home_visit": False
        }

        self.assertEqual(Advertisement.objects.count(), 0)
        user = UserFactory()
        self.client.force_login(user)

        res = self.client.post(self.list_url, data=payload)
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Advertisement.objects.count(), 1)

        new_advertisement = Advertisement.objects.first()

        self.assertEqual(new_advertisement.owner, user)
        self.assertEqual(new_advertisement.title, payload["title"])
        self.assertEqual(new_advertisement.price, payload["price"])
        self.assertEqual(new_advertisement.home_visit, payload["home_visit"])

    def test_update_service(self):
        user = UserFactory()






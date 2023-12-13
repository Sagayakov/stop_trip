from django.urls import reverse
from pytest import mark
from rest_framework import status
from rest_framework.test import APITestCase

from offers.constants import CategoryChoices
from users.tests.factories import UserFactory
from ..factories import BaseAdvertisementFactory


@mark.django_db
class AdvertisementViewSetTest(APITestCase):
    def setUp(self):
        self.list_url: str = reverse("advertisement_user-list")

    def test_list(self):
        user_1 = UserFactory()
        user_2 = UserFactory()

        advertisements = [
            BaseAdvertisementFactory(owner=user_1, category=category)
            for category in CategoryChoices.values
        ]
        self.client.force_login(user_2)
        with self.assertNumQueries(3):
            res = self.client.get(self.list_url)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(res_json["count"], 0)
        self.assertNotEqual(len(advertisements), 0)

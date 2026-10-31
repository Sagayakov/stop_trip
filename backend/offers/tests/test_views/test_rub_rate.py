from decimal import Decimal

from django.urls import reverse
from pytest import mark
from rest_framework import status
from rest_framework.test import APITestCase

from offers.models import RubExchangeRate


@mark.django_db
class RubRateTest(APITestCase):
    def setUp(self):
        self.url = reverse("advertisements-rub-rate")

    def test_rate_not_set(self):
        res = self.client.get(self.url)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertIsNone(res.json()["vnd_per_rub"])

    def test_rate_set_in_admin_is_returned_immediately(self):
        self.client.get(self.url)  # ответ попадает в кэш

        rate = RubExchangeRate.get_solo()
        rate.vnd_per_rub = Decimal("290.50")
        rate.save()

        res = self.client.get(self.url)
        self.assertEqual(res.json()["vnd_per_rub"], 290.5)

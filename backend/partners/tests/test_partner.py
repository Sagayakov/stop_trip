from pytest import mark
from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse

from .factories import PartnerFactory


@mark.django_db
class PartnerViewSetTest(APITestCase):
    def setUp(self):
        self.list_url: str = reverse("partners-list")

    def test_list_partners(self):
        partners = [PartnerFactory() for _ in range(10)]

        with self.assertNumQueries(3):
            res = self.client.get(self.list_url)

        res_json = res.json()
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res_json["count"], len(partners))

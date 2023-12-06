from functools import partial

from django.urls import reverse
from pytest import mark
from rest_framework import status
from rest_framework.test import APITestCase

from offers.constants import (
    CategoryChoices,
    TaxiUnit,
    TaxiType,
)
from offers.models import Advertisement
from users.tests.factories import UserFactory
from ..factories import (
    AdvertisementImageFactory,
    TaxiAdvertisementFactory,
)


@mark.django_db
class TaxiTest(APITestCase):
    def setUp(self):
        self.list_url: str = reverse("advertisements-list")
        self.detail_url = partial(reverse, "advertisements-detail")

    def test_create_taxi(self):
        payload = {
            "category": CategoryChoices.TAXI.value,
            "title": "test_taxi",
            "price": 1000,
            "taxi_unit": TaxiUnit.KM.value,
            "taxi_type": TaxiType.BUSINESS.value,
        }
        self.assertEqual(Advertisement.objects.count(), 0)
        user = UserFactory()
        self.client.force_login(user)

        with self.assertNumQueries(3):
            res = self.client.post(self.list_url, data=payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Advertisement.objects.count(), 1)

        new_advertisement = Advertisement.objects.first()
        self.assertEqual(new_advertisement.owner, user)
        self.assertEqual(new_advertisement.category, payload["category"])
        self.assertEqual(new_advertisement.title, payload["title"])
        self.assertEqual(new_advertisement.price, payload["price"])
        self.assertEqual(new_advertisement.taxi_unit, payload["taxi_unit"])
        self.assertEqual(new_advertisement.taxi_type, payload["taxi_type"])

    def test_update_taxi(self):
        user = UserFactory()
        advertisement = TaxiAdvertisementFactory(
            owner=user,
            title="taxi",
            price=1500,
            taxi_unit=TaxiUnit.KM.value,
            taxi_type=TaxiType.ECONOMY.value,
        )

        payload = {
            "price": 3000,
            "taxi_unit": TaxiUnit.ROUTE.value,
            "taxi_type": TaxiType.COMFORT.value,
        }
        self.assertEqual(Advertisement.objects.count(), 1)
        self.client.force_login(user)

        with self.assertNumQueries(7):
            res = self.client.put(self.detail_url(kwargs={"pk": advertisement.id}), data=payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Advertisement.objects.count(), 1)
        advertisement.refresh_from_db()

        self.assertEqual(advertisement.price, payload["price"])
        self.assertEqual(advertisement.taxi_unit, payload["taxi_unit"])
        self.assertEqual(advertisement.taxi_type, payload["taxi_type"])

    def test_delete_taxi(self):
        user = UserFactory()
        advertisement = TaxiAdvertisementFactory(
            owner=user,
        )
        [AdvertisementImageFactory(advertisement=advertisement) for _ in range(10)]

        self.assertEqual(Advertisement.objects.count(), 1)
        self.client.force_login(user)

        with self.assertNumQueries(6):
            res = self.client.delete(self.detail_url(kwargs={"pk": advertisement.id}))

        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Advertisement.objects.count(), 0)

    def test_filter_taxi_unit(self):
        user = UserFactory()
        taxi_set = [
            TaxiAdvertisementFactory(
                owner=user,
                category=CategoryChoices.TRANSPORT.value,
                price=100_000 + _ * 50_000,
                taxi_unit=[TaxiUnit.KM, TaxiUnit.ROUTE][_ % 2],
                taxi_type=TaxiType.ECONOMY,
            )
            for _ in range(2)
        ]
        with self.assertNumQueries(2):
            res = self.client.get(
                self.list_url,
                {"taxi_unit": TaxiUnit.KM.value},
            )

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(len(res_json), len(taxi_set) // 2)

    def test_filter_taxi_type(self):
        user = UserFactory()
        taxi_set = [
            TaxiAdvertisementFactory(
                owner=user,
                category=CategoryChoices.TRANSPORT.value,
                price=100_000 + _ * 50_000,
                taxi_unit=TaxiUnit.KM,
                taxi_type=[TaxiType.ECONOMY, TaxiType.BUSINESS][_ % 2],
            )
            for _ in range(2)
        ]
        with self.assertNumQueries(2):
            res = self.client.get(
                self.list_url,
                {"taxi_type": TaxiType.ECONOMY.value},
            )

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(len(res_json), len(taxi_set) // 2)

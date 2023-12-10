from functools import partial

from django.urls import reverse
from pytest import mark
from rest_framework import status
from rest_framework.test import APITestCase

from offers.constants import CategoryChoices
from offers.models import Advertisement
from users.tests.factories import UserFactory
from ..factories import (ExcursionAdvertisementFactory,
                         CountryFactory,
                         RegionFactory,
                         CityFactory)


@mark.django_db
class ExcursionTest(APITestCase):
    def setUp(self):
        self.list_url: str = reverse("advertisements-list")
        self.detail_url = partial(reverse, "advertisements-detail")

    def test_create_excursion(self):
        country = CountryFactory()
        region = RegionFactory(country=country)
        city = CityFactory(region=region)
        payload = {
            "category": CategoryChoices.EXCURSION.value,
            "country": country.id,
            "region": region.id,
            "city": city.id,
            "title": "excursion",
            "price": 1_000,
            "excursion_food": True,
            "excursion_transfer": False,
        }

        self.assertEqual(Advertisement.objects.count(), 0)
        user = UserFactory()
        self.client.force_login(user)

        with self.assertNumQueries(6):
            res = self.client.post(self.list_url, data=payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Advertisement.objects.count(), 1)

        new_advertisement = Advertisement.objects.first()

        self.assertEqual(new_advertisement.owner, user)
        self.assertEqual(new_advertisement.category, payload["category"])
        self.assertEqual(new_advertisement.country.id, payload["country"])
        self.assertEqual(new_advertisement.region.id, payload["region"])
        self.assertEqual(new_advertisement.city.id, payload["city"])
        self.assertEqual(new_advertisement.title, payload["title"])
        self.assertEqual(new_advertisement.price, payload["price"])
        self.assertEqual(new_advertisement.excursion_food, payload["excursion_food"])
        self.assertEqual(new_advertisement.excursion_transfer, payload["excursion_transfer"])

    def test_update_excursion(self):
        user = UserFactory()
        country = CountryFactory()
        region = RegionFactory(country=country)
        city = CityFactory(region=region)
        advertisement = ExcursionAdvertisementFactory(
            owner=user,
            country=country,
            region=region,
            city=city
        )
        new_country = CountryFactory()
        new_region = RegionFactory(country=country)
        new_city = CityFactory(region=region)
        payload = {
            "category": CategoryChoices.DOCUMENT.value,
            "title": "excursion_new",
            "country": new_country.id,
            "region": new_region.id,
            "city": new_city.id,
            "price": 10_000,
            "excursion_food": True,
            "excursion_transfer": False,
        }

        self.assertEqual(Advertisement.objects.count(), 1)
        self.client.force_login(user)

        with self.assertNumQueries(10):
            res = self.client.put(self.detail_url(kwargs={"pk": advertisement.id}), data=payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Advertisement.objects.count(), 1)
        advertisement.refresh_from_db()

        self.assertEqual(advertisement.owner, user)
        self.assertEqual(advertisement.country.id, payload["country"])
        self.assertEqual(advertisement.region.id, payload["region"])
        self.assertEqual(advertisement.city.id, payload["city"])
        self.assertEqual(advertisement.category, payload["category"])
        self.assertEqual(advertisement.title, payload["title"])
        self.assertEqual(advertisement.price, payload["price"])
        self.assertEqual(advertisement.excursion_food, payload["excursion_food"])
        self.assertEqual(advertisement.excursion_transfer, payload["excursion_transfer"])

    def test_delete_excursion(self):
        user = UserFactory()
        country = CountryFactory()
        region = RegionFactory(country=country)
        city = CityFactory(region=region)
        advertisement = ExcursionAdvertisementFactory(
            owner=user,
            country=country,
            region=region,
            city=city
        )

        self.assertEqual(Advertisement.objects.count(), 1)
        self.client.force_login(user)

        with self.assertNumQueries(6):
            res = self.client.delete(self.detail_url(kwargs={"pk": advertisement.id}))

        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Advertisement.objects.count(), 0)

from functools import partial

from django.urls import reverse
from pytest import mark
from rest_framework import status
from rest_framework.test import APITestCase

from offers.constants import CategoryChoices
from offers.models import Advertisement
from users.tests.factories import UserFactory
from ..factories import (
    ServiceAdvertisementFactory,
    CountryFactory,
    RegionFactory,
    CityFactory,
)


@mark.django_db
class ServiceTest(APITestCase):
    def setUp(self):
        self.list_url: str = reverse("advertisements-list")
        self.detail_url = partial(reverse, "advertisements-detail")

    def test_create_service(self):
        country = CountryFactory()
        region = RegionFactory(country=country)
        city = CityFactory(region=region)
        payload = {
            "category": CategoryChoices.SERVICE.value,
            "country": country.id,
            "region": region.id,
            "city": city.id,
            "title": "service",
            "price": 10_000,
            "service_home_visit": False,
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
        self.assertEqual(new_advertisement.title, payload["title"])
        self.assertEqual(new_advertisement.price, payload["price"])
        self.assertEqual(
            new_advertisement.service_home_visit, payload["service_home_visit"]
        )

    def test_update_service(self):
        user = UserFactory()
        country = CountryFactory()
        region = RegionFactory(country=country)
        city = CityFactory(region=region)
        advertisement = ServiceAdvertisementFactory(
            owner=user,
            country=country,
            region=region,
            city=city,
        )
        new_country = CountryFactory()
        new_region = RegionFactory(country=country)
        new_city = CityFactory(region=region)
        payload = {
            "category": CategoryChoices.SERVICE.value,
            "country": new_country.id,
            "region": new_region.id,
            "city": new_city.id,
            "title": "service",
            "price": 10_000,
            "service_home_visit": True,
        }

        self.assertEqual(Advertisement.objects.count(), 1)
        self.client.force_login(user)

        with self.assertNumQueries(9):
            res = self.client.put(
                self.detail_url(kwargs={"pk": advertisement.id}), data=payload
            )

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Advertisement.objects.count(), 1)
        advertisement.refresh_from_db()

        self.assertEqual(advertisement.owner, user)
        self.assertEqual(advertisement.category, payload["category"])
        self.assertEqual(advertisement.country.id, payload["country"])
        self.assertEqual(advertisement.region.id, payload["region"])
        self.assertEqual(advertisement.city.id, payload["city"])
        self.assertEqual(advertisement.title, payload["title"])
        self.assertEqual(advertisement.price, payload["price"])

    def test_delete_service(self):
        user = UserFactory()
        advertisement = ServiceAdvertisementFactory(owner=user)
        self.assertEqual(Advertisement.objects.count(), 1)
        self.client.force_login(user)

        with self.assertNumQueries(5):
            res = self.client.delete(self.detail_url(kwargs={"pk": advertisement.id}))

        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Advertisement.objects.count(), 0)

    def test_filter_service_home_visit(self):
        user = UserFactory()
        country = CountryFactory()
        region = RegionFactory(country=country)
        city = CityFactory(region=region)
        event_set = [
            ServiceAdvertisementFactory(
                owner=user,
                country=country,
                region=region,
                city=city,
                category=CategoryChoices.TRANSPORT.value,
                price=100_000 + _ * 50_000,
                service_home_visit=[True, False][_ % 2],
            )
            for _ in range(2)
        ]
        with self.assertNumQueries(2):
            res = self.client.get(
                self.list_url,
                {"service_home_visit": True},
            )

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(len(res_json), len(event_set) // 2)

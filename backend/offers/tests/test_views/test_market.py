from functools import partial

from django.urls import reverse
from pytest import mark
from rest_framework import status
from rest_framework.test import APITestCase

from offers.constants import CategoryChoices, MarketCondition
from offers.models import Advertisement
from users.tests.factories import UserFactory
from ..factories import (
    MarketAdvertisementFactory,
    CountryFactory,
    RegionFactory,
    CityFactory,
)


@mark.django_db
class MarketTest(APITestCase):
    def setUp(self):
        self.list_url: str = reverse("advertisements-list")
        self.detail_url = partial(reverse, "advertisements-detail")

    def test_create_market(self):
        country = CountryFactory()
        region = RegionFactory(country=country)
        city = CityFactory(region=region)
        payload = {
            "category": CategoryChoices.MARKET.value,
            "country": country.id,
            "region": region.id,
            "city": city.id,
            "title": "market",
            "price": 1_000,
            "market_condition": MarketCondition.NEW,
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
        self.assertEqual(new_advertisement.country, country)
        self.assertEqual(new_advertisement.region, region)
        self.assertEqual(new_advertisement.city, city)
        self.assertEqual(new_advertisement.category, payload["category"])
        self.assertEqual(new_advertisement.title, payload["title"])
        self.assertEqual(new_advertisement.price, payload["price"])
        self.assertEqual(new_advertisement.market_condition, payload["market_condition"])

    def test_update_market(self):
        user = UserFactory()
        country = CountryFactory()
        region = RegionFactory(country=country)
        city = CityFactory(region=region)
        advertisement = MarketAdvertisementFactory(
            owner=user, country=country, region=region, city=city
        )
        new_country = CountryFactory()
        new_region = RegionFactory(country=country)
        new_city = CityFactory(region=region)
        payload = {
            "category": CategoryChoices.MARKET.value,
            "country": new_country.id,
            "region": new_region.id,
            "city": new_city.id,
            "title": "market_new",
            "price": 10_000,
            "market_condition": MarketCondition.USED,
        }

        self.assertEqual(Advertisement.objects.count(), 1)
        self.client.force_login(user)

        with self.assertNumQueries(9):
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
        self.assertEqual(advertisement.market_condition, payload["market_condition"])

    def test_delete_market(self):
        user = UserFactory()
        advertisement = MarketAdvertisementFactory(owner=user)

        self.assertEqual(Advertisement.objects.count(), 1)
        self.client.force_login(user)

        with self.assertNumQueries(5):
            res = self.client.delete(self.detail_url(kwargs={"pk": advertisement.id}))

        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Advertisement.objects.count(), 0)

    def test_market_condition_filter(self):
        user = UserFactory()
        country = CountryFactory()
        region = RegionFactory(country=country)
        city = CityFactory(region=region)
        market_set = [
            MarketAdvertisementFactory(
                owner=user,
                country=country,
                region=region,
                city=city,
                category=CategoryChoices.MARKET.value,
                title="market_new",
                price=10_000,
                market_condition=[MarketCondition.USED, MarketCondition.NEW][_ % 2],
            )
            for _ in range(2)
        ]
        with self.assertNumQueries(3):
            res = self.client.get(self.list_url, {" market_condition": MarketCondition.USED.value})

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(res_json["count"], len(market_set))

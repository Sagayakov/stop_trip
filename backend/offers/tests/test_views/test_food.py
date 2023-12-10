from functools import partial

from django.urls import reverse
from pytest import mark
from rest_framework import status
from rest_framework.test import APITestCase

from offers.constants import CategoryChoices, FoodType
from offers.models import Advertisement
from users.tests.factories import UserFactory
from ..factories import (
    DocumentAdvertisementFactory,
    FoodAdvertisementFactory,
    CountryFactory,
    RegionFactory,
    CityFactory
)


@mark.django_db
class FoodTest(APITestCase):
    def setUp(self):
        self.list_url: str = reverse("advertisements-list")
        self.detail_url = partial(reverse, "advertisements-detail")

    def test_create_food(self):
        country = CountryFactory()
        region = RegionFactory(country=country)
        city = CityFactory(region=region)
        payload = {
            "category": CategoryChoices.FOOD.value,
            "country": country.id,
            "region": region.id,
            "city": city.id,
            "title": "food",
            "price": 1_000,
            "food_delivery": True,
            "food_establishment": True,
            "food_type": FoodType.READY_FOOD,
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
        self.assertEqual(new_advertisement.food_delivery, payload["food_delivery"])
        self.assertEqual(new_advertisement.food_establishment, payload["food_establishment"])
        self.assertEqual(new_advertisement.food_type, payload["food_type"])

    def test_update_food(self):
        user = UserFactory()
        country = CountryFactory()
        region = RegionFactory(country=country)
        city = CityFactory(region=region)
        advertisement = DocumentAdvertisementFactory(
            owner=user,
            country=country,
            region=region,
            city=city
        )
        new_country = CountryFactory()
        new_region = RegionFactory(country=country)
        new_city = CityFactory(region=region)
        payload = {
            "category": CategoryChoices.FOOD.value,
            "title": "food",
            "country": new_country.id,
            "region": new_region.id,
            "city": new_city.id,
            "price": 1_000,
            "food_delivery": True,
            "food_establishment": True,
            "food_type": FoodType.READY_FOOD,
        }

        self.assertEqual(Advertisement.objects.count(), 1)
        self.client.force_login(user)

        with self.assertNumQueries(10):
            res = self.client.put(self.detail_url(kwargs={"pk": advertisement.id}), data=payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Advertisement.objects.count(), 1)
        advertisement.refresh_from_db()

        self.assertEqual(advertisement.owner, user)
        self.assertEqual(advertisement.category, payload["category"])
        self.assertEqual(advertisement.title, payload["title"])
        self.assertEqual(advertisement.price, payload["price"])
        self.assertEqual(advertisement.food_delivery, payload["food_delivery"])
        self.assertEqual(advertisement.food_establishment, payload["food_establishment"])
        self.assertEqual(advertisement.food_type, payload["food_type"])

    def test_delete_food(self):
        user = UserFactory()
        country = CountryFactory()
        region = RegionFactory(country=country)
        city = CityFactory(region=region)
        advertisement = FoodAdvertisementFactory(owner=user,
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

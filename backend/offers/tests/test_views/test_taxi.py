from functools import partial

from django.urls import reverse
from pytest import mark
from rest_framework import status
from rest_framework.test import APITestCase

from common.utils import generate_image_file
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
    CountryFactory,
    RegionFactory,
    CityFactory,
)


@mark.django_db
class TaxiTest(APITestCase):
    def setUp(self):
        self.list_url: str = reverse("advertisements-list")
        self.detail_url = partial(reverse, "advertisements-detail")

    def test_create_taxi(self):
        country = CountryFactory()
        region = RegionFactory(country=country)
        city = CityFactory(region=region)
        payload_images = [generate_image_file() for _ in range(5)]
        payload = {
            "category": CategoryChoices.TAXI.value,
            "country": country.slug,
            "region": region.slug,
            "city": city.slug,
            "title": "test_taxi",
            "price": 1000,
            "taxi_unit": TaxiUnit.KM.value,
            "taxi_type": TaxiType.BUSINESS.value,
            "images": payload_images,
        }
        self.assertEqual(Advertisement.objects.count(), 0)
        user = UserFactory()
        self.client.force_login(user)

        with self.assertNumQueries(8):
            res = self.client.post(self.list_url, data=payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Advertisement.objects.count(), 1)

        new_advertisement = Advertisement.objects.first()
        self.assertEqual(new_advertisement.owner, user)
        self.assertEqual(new_advertisement.country.slug, payload["country"])
        self.assertEqual(new_advertisement.region.slug, payload["region"])
        self.assertEqual(new_advertisement.city.slug, payload["city"])
        self.assertEqual(new_advertisement.category, payload["category"])
        self.assertEqual(new_advertisement.title, payload["title"])
        self.assertEqual(new_advertisement.price, payload["price"])
        self.assertEqual(new_advertisement.taxi_unit, payload["taxi_unit"])
        self.assertEqual(new_advertisement.taxi_type, payload["taxi_type"])
        self.assertEqual(new_advertisement.images.count(), len(payload_images))

    def test_update_taxi(self):
        user = UserFactory()
        country = CountryFactory()
        region = RegionFactory(country=country)
        city = CityFactory(region=region)
        advertisement = TaxiAdvertisementFactory(
            owner=user,
            country=country,
            region=region,
            city=city,
            title="taxi",
            price=1500,
            taxi_unit=TaxiUnit.KM.value,
            taxi_type=TaxiType.ECONOMY.value,
        )
        advertisement_images = [
            AdvertisementImageFactory(advertisement=advertisement) for _ in range(5)
        ]

        new_country = CountryFactory()
        new_region = RegionFactory(country=country)
        new_city = CityFactory(region=region)
        payload_images = [generate_image_file() for _ in range(5)]
        payload = {
            "country": new_country.slug,
            "region": new_region.slug,
            "city": new_city.slug,
            "price": 3000,
            "title": "new_taxi",
            "taxi_unit": TaxiUnit.ROUTE.value,
            "taxi_type": TaxiType.COMFORT.value,
            "delete_images": [
                advertisement_image.id for advertisement_image in advertisement_images[3:]
            ],
            "upload_images": payload_images,
        }

        self.assertEqual(Advertisement.objects.count(), 1)
        self.client.force_login(user)

        with self.assertNumQueries(13):
            res = self.client.put(
                self.detail_url(kwargs={"slug": advertisement.slug}), data=payload
            )

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Advertisement.objects.count(), 1)
        advertisement.refresh_from_db()

        self.assertEqual(advertisement.country.slug, payload["country"])
        self.assertEqual(advertisement.region.slug, payload["region"])
        self.assertEqual(advertisement.city.slug, payload["city"])
        self.assertEqual(advertisement.title, payload["title"])
        self.assertEqual(advertisement.price, payload["price"])
        self.assertEqual(advertisement.taxi_unit, payload["taxi_unit"])
        self.assertEqual(advertisement.taxi_type, payload["taxi_type"])
        self.assertEqual(advertisement.images.count(), len(payload_images) + 3)
        new_images_ids = advertisement.images.values_list("id", flat=True)
        for image in advertisement_images[3:]:
            self.assertTrue(image.id not in new_images_ids)

    def test_delete_taxi(self):
        user = UserFactory()
        country = CountryFactory()
        region = RegionFactory(country=country)
        city = CityFactory(region=region)
        advertisement = TaxiAdvertisementFactory(
            owner=user,
            country=country,
            region=region,
            city=city,
        )
        [AdvertisementImageFactory(advertisement=advertisement) for _ in range(10)]

        self.assertEqual(Advertisement.objects.count(), 1)
        self.client.force_login(user)

        with self.assertNumQueries(6):
            res = self.client.delete(self.detail_url(kwargs={"slug": advertisement.slug}))

        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Advertisement.objects.count(), 0)

    def test_filter_taxi_unit(self):
        user = UserFactory()
        country = CountryFactory()
        region = RegionFactory(country=country)
        city = CityFactory(region=region)
        taxi_set = [
            TaxiAdvertisementFactory(
                owner=user,
                country=country,
                region=region,
                city=city,
                category=CategoryChoices.TRANSPORT.value,
                price=100_000 + _ * 50_000,
                taxi_unit=[TaxiUnit.KM, TaxiUnit.ROUTE][_ % 2],
                taxi_type=TaxiType.ECONOMY,
            )
            for _ in range(2)
        ]
        with self.assertNumQueries(4):
            res = self.client.get(
                self.list_url,
                {"taxi_unit": TaxiUnit.KM.value},
            )

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(res_json["count"], len(taxi_set) // 2)

        with self.assertNumQueries(4):
            res = self.client.get(
                self.list_url,
                {"taxi_unit": f"{TaxiUnit.KM.value},{TaxiUnit.ROUTE.value}"},
            )

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(res_json["count"], len(taxi_set))

    def test_filter_taxi_type(self):
        user = UserFactory()
        country = CountryFactory()
        region = RegionFactory(country=country)
        city = CityFactory(region=region)
        taxi_set = [
            TaxiAdvertisementFactory(
                owner=user,
                country=country,
                region=region,
                city=city,
                category=CategoryChoices.TRANSPORT.value,
                price=100_000 + _ * 50_000,
                taxi_unit=TaxiUnit.KM,
                taxi_type=[TaxiType.ECONOMY, TaxiType.BUSINESS][_ % 2],
            )
            for _ in range(2)
        ]
        with self.assertNumQueries(4):
            res = self.client.get(
                self.list_url,
                {"taxi_type": TaxiType.ECONOMY.value},
            )

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(res_json["count"], len(taxi_set) // 2)

        with self.assertNumQueries(4):
            res = self.client.get(
                self.list_url, {"taxi_type": f"{TaxiType.ECONOMY.value},{TaxiType.BUSINESS.value}"}
            )

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(res_json["count"], len(taxi_set))

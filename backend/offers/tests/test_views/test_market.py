from functools import partial

from django.urls import reverse
from pytest import mark
from rest_framework import status
from rest_framework.test import APITestCase

from common.utils import generate_image_file, encode_bytes_to_base64
from offers.constants import CategoryChoices, MarketCondition
from offers.models import Advertisement
from users.tests.factories import UserFactory
from ..factories import (
    MarketAdvertisementFactory,
    CountryFactory,
    RegionFactory,
    CityFactory,
    AdvertisementImageFactory,
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
        payload_images = [encode_bytes_to_base64(generate_image_file()) for _ in range(5)]
        payload = {
            "category": CategoryChoices.MARKET.value,
            "country": country.slug,
            "region": region.slug,
            "city": city.slug,
            "title": "market",
            "price": 1_000,
            "market_condition": MarketCondition.NEW,
            "images": payload_images,
            "youtube": "https://youtu.be/jNQXAC9IVRw?si=7eaplvei50RcVeFR",
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
        self.assertEqual(new_advertisement.country, country)
        self.assertEqual(new_advertisement.region, region)
        self.assertEqual(new_advertisement.city, city)
        self.assertEqual(new_advertisement.category, payload["category"])
        self.assertEqual(new_advertisement.title, payload["title"])
        self.assertEqual(new_advertisement.price, payload["price"])
        self.assertEqual(new_advertisement.market_condition, payload["market_condition"])
        self.assertEqual(new_advertisement.images.count(), len(payload_images))
        self.assertEqual(
            new_advertisement.youtube, "https://www.youtube.com/embed/jNQXAC9IVRw?controls=0"
        )

    def test_update_market(self):
        user = UserFactory()
        country = CountryFactory()
        region = RegionFactory(country=country)
        city = CityFactory(region=region)
        advertisement = MarketAdvertisementFactory(
            owner=user, country=country, region=region, city=city
        )
        advertisement_images = [
            AdvertisementImageFactory(advertisement=advertisement) for _ in range(5)
        ]

        new_country = CountryFactory()
        new_region = RegionFactory(country=country)
        new_city = CityFactory(region=region)
        payload_images = [encode_bytes_to_base64(generate_image_file()) for _ in range(5)]
        payload = {
            "country": new_country.slug,
            "region": new_region.slug,
            "city": new_city.slug,
            "title": "market_new",
            "price": 10_000,
            "market_condition": MarketCondition.USED,
            "delete_images": [
                advertisement_image.id for advertisement_image in advertisement_images[3:]
            ],
            "upload_images": payload_images,
            "youtube": "https://youtu.be/VaLXzI92t9M?si=7eaplvei50RcVeFR",
        }

        self.assertEqual(Advertisement.objects.count(), 1)
        self.client.force_login(user)

        with self.assertNumQueries(12):
            res = self.client.put(
                self.detail_url(kwargs={"slug": advertisement.slug}), data=payload
            )

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Advertisement.objects.count(), 1)
        advertisement.refresh_from_db()

        self.assertEqual(advertisement.owner, user)
        self.assertEqual(advertisement.country.slug, payload["country"])
        self.assertEqual(advertisement.region.slug, payload["region"])
        self.assertEqual(advertisement.city.slug, payload["city"])
        self.assertEqual(advertisement.title, payload["title"])
        self.assertEqual(advertisement.price, payload["price"])
        self.assertEqual(advertisement.market_condition, payload["market_condition"])
        self.assertEqual(advertisement.images.count(), len(payload_images) + 3)
        self.assertEqual(
            advertisement.youtube, "https://www.youtube.com/embed/VaLXzI92t9M?controls=0"
        )
        new_images_ids = advertisement.images.values_list("id", flat=True)
        for image in advertisement_images[3:]:
            self.assertTrue(image.id not in new_images_ids)

    def test_delete_market(self):
        user = UserFactory()
        advertisement = MarketAdvertisementFactory(owner=user)

        self.assertEqual(Advertisement.objects.count(), 1)
        self.client.force_login(user)

        with self.assertNumQueries(8):
            res = self.client.delete(self.detail_url(kwargs={"slug": advertisement.slug}))

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
        with self.assertNumQueries(5):
            res = self.client.get(self.list_url, {" market_condition": MarketCondition.USED.value})

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(res_json["count"], len(market_set))

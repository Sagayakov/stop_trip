from functools import partial

from django.urls import reverse
from pytest import mark
from rest_framework import status
from rest_framework.test import APITestCase

from common.utils import generate_image_file
from offers.constants import CategoryChoices
from offers.models import Advertisement
from users.tests.factories import UserFactory
from ..factories import (
    CurrencyFactory,
    ExchangeAdvertisementFactory,
    CountryFactory,
    RegionFactory,
    CityFactory,
    AdvertisementImageFactory,
)


@mark.django_db
class ExchangeRateTest(APITestCase):
    def setUp(self):
        self.list_url: str = reverse("advertisements-list")
        self.detail_url = partial(reverse, "advertisements-detail")

    def test_create_exchange_rate(self):
        proposed_currency = CurrencyFactory()
        country = CountryFactory()
        region = RegionFactory(country=country)
        city = CityFactory(region=region)
        exchange_for = CurrencyFactory()
        payload_images = [generate_image_file() for _ in range(5)]
        payload = {
            "category": CategoryChoices.EXCHANGE_RATE.value,
            "country": country.slug,
            "region": region.slug,
            "city": city.slug,
            "title": "test_exchange_rate",
            "proposed_currency": proposed_currency.short_name,
            "exchange_for": exchange_for.short_name,
            "exchange_rate": 2.15,
            "images": payload_images,
            "youtube": "https://youtu.be/jNQXAC9IVRw?si=7eaplvei50RcVeFR",
        }

        self.assertEqual(Advertisement.objects.count(), 0)
        user = UserFactory()
        self.client.force_login(user)

        with self.assertNumQueries(10):
            res = self.client.post(self.list_url, data=payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Advertisement.objects.count(), 1)

        new_advertisement = Advertisement.objects.first()
        self.assertEqual(new_advertisement.owner, user)
        self.assertEqual(new_advertisement.category, payload["category"])
        self.assertEqual(new_advertisement.country.slug, payload["country"])
        self.assertEqual(new_advertisement.region.slug, payload["region"])
        self.assertEqual(new_advertisement.city.slug, payload["city"])
        self.assertEqual(new_advertisement.title, payload["title"])
        self.assertEqual(new_advertisement.proposed_currency, proposed_currency)
        self.assertEqual(new_advertisement.exchange_for, exchange_for)
        self.assertEqual(new_advertisement.exchange_rate, payload["exchange_rate"])
        self.assertEqual(new_advertisement.images.count(), len(payload_images))
        self.assertEqual(
            new_advertisement.youtube, "https://www.youtube.com/embed/jNQXAC9IVRw?controls=0"
        )

    def test_update_exchange_rate(self):
        user = UserFactory()
        country = CountryFactory()
        region = RegionFactory(country=country)
        city = CityFactory(region=region)
        proposed_currency = [CurrencyFactory() for _ in range(2)]
        exchange_for = [CurrencyFactory() for _ in range(2)]
        advertisement = ExchangeAdvertisementFactory(
            owner=user,
            country=country,
            region=region,
            city=city,
            title="exchange_rate",
            price=1500,
            proposed_currency=proposed_currency[0],
            exchange_for=exchange_for[0],
            exchange_rate=3.15,
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
            "title": "new_title",
            "proposed_currency": proposed_currency[1].short_name,
            "exchange_for": exchange_for[1].short_name,
            "exchange_rate": 2.15,
            "delete_images": [
                advertisement_image.id for advertisement_image in advertisement_images[3:]
            ],
            "upload_images": payload_images,
            "youtube": "https://youtu.be/VaLXzI92t9M?si=7eaplvei50RcVeFR",
        }

        self.assertEqual(Advertisement.objects.count(), 1)
        self.client.force_login(user)

        with self.assertNumQueries(14):
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
        self.assertEqual(advertisement.proposed_currency, proposed_currency[1])
        self.assertEqual(advertisement.exchange_for, exchange_for[1])
        self.assertEqual(advertisement.exchange_rate, payload["exchange_rate"])
        self.assertEqual(advertisement.images.count(), len(payload_images) + 3)
        self.assertEqual(
            advertisement.youtube, "https://www.youtube.com/embed/VaLXzI92t9M?controls=0"
        )
        new_images_ids = advertisement.images.values_list("id", flat=True)
        for image in advertisement_images[3:]:
            self.assertTrue(image.id not in new_images_ids)

    def test_delete_exchange_rate(self):
        user = UserFactory()
        advertisement = ExchangeAdvertisementFactory(
            owner=user,
        )

        self.assertEqual(Advertisement.objects.count(), 1)
        self.client.force_login(user)

        with self.assertNumQueries(7):
            res = self.client.delete(self.detail_url(kwargs={"slug": advertisement.slug}))

        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Advertisement.objects.count(), 0)

    def test_proposed_currency_filter(self):
        user = UserFactory()
        names = ["Фунт", "Евро", "Рубль", "Доллар"]
        short_names = ["FNT", "EUR", "RUB", "USD"]

        currency = [
            CurrencyFactory(name=name, short_name=short_name)
            for name, short_name in zip(names, short_names)
        ]

        currency_exchange_set = [
            ExchangeAdvertisementFactory(
                owner=user,
                title="exchange_rate",
                price=1500,
                proposed_currency=currency[0],
                exchange_for=currency[0],
                exchange_rate=3.15,
            )
            for _ in range(2)
        ]

        with self.assertNumQueries(5):
            res = self.client.get(
                self.list_url,
                {"proposed_currency": currency[0].short_name},
            )

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(res_json["count"], len(currency_exchange_set))

    def test_exchange_for_filter(self):
        user = UserFactory()
        names = ["Фунт", "Евро", "Рубль", "Доллар"]
        short_names = ["FNT", "EUR", "RUB", "USD"]

        currency = [
            CurrencyFactory(name=name, short_name=short_name)
            for name, short_name in zip(names, short_names)
        ]

        currency_exchange_set = [
            ExchangeAdvertisementFactory(
                owner=user,
                title="exchange_rate",
                price=1500,
                proposed_currency=currency[0],
                exchange_for=currency[0],
                exchange_rate=3.15,
            )
            for _ in range(2)
        ]

        with self.assertNumQueries(5):
            res = self.client.get(
                self.list_url,
                {"exchange_for": currency[0].short_name},
            )

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(res_json["count"], len(currency_exchange_set))

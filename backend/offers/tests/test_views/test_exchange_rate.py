from functools import partial

from django.urls import reverse
from pytest import mark
from rest_framework import status
from rest_framework.test import APITestCase

from offers.constants import CategoryChoices
from offers.models import Advertisement
from users.tests.factories import UserFactory
from ..factories import (
    CurrencyFactory,
    ExchangeAdvertisementFactory,
    CountryFactory,
    RegionFactory,
    CityFactory,
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
        payload = {
            "category": CategoryChoices.EXCHANGE_RATE.value,
            "country": country.id,
            "region": region.id,
            "city": city.id,
            "title": "test_exchange_rate",
            "proposed_currency": proposed_currency.id,
            "exchange_for": exchange_for.id,
            "exchange_rate": 2.15,
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
        self.assertEqual(new_advertisement.category, payload["category"])
        self.assertEqual(new_advertisement.country.id, payload["country"])
        self.assertEqual(new_advertisement.region.id, payload["region"])
        self.assertEqual(new_advertisement.city.id, payload["city"])
        self.assertEqual(new_advertisement.title, payload["title"])
        self.assertEqual(new_advertisement.proposed_currency, proposed_currency)
        self.assertEqual(new_advertisement.exchange_for, exchange_for)
        self.assertEqual(new_advertisement.exchange_rate, payload["exchange_rate"])

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
        new_country = CountryFactory()
        new_region = RegionFactory(country=country)
        new_city = CityFactory(region=region)

        payload = {
            "country": new_country.id,
            "region": new_region.id,
            "city": new_city.id,
            "proposed_currency": proposed_currency[1].id,
            "exchange_for": exchange_for[1].id,
            "exchange_rate": 2.15,
        }
        self.assertEqual(Advertisement.objects.count(), 1)
        self.client.force_login(user)

        with self.assertNumQueries(11):
            res = self.client.put(self.detail_url(kwargs={"pk": advertisement.id}), data=payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Advertisement.objects.count(), 1)
        advertisement.refresh_from_db()
        self.assertEqual(advertisement.country.id, payload["country"])
        self.assertEqual(advertisement.region.id, payload["region"])
        self.assertEqual(advertisement.city.id, payload["city"])
        self.assertEqual(advertisement.proposed_currency, proposed_currency[1])
        self.assertEqual(advertisement.exchange_for, exchange_for[1])
        self.assertEqual(advertisement.exchange_rate, payload["exchange_rate"])

    def test_delete_exchange_rate(self):
        user = UserFactory()
        advertisement = ExchangeAdvertisementFactory(
            owner=user,
        )

        self.assertEqual(Advertisement.objects.count(), 1)
        self.client.force_login(user)

        with self.assertNumQueries(5):
            res = self.client.delete(self.detail_url(kwargs={"pk": advertisement.id}))

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

        with self.assertNumQueries(3):
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

        with self.assertNumQueries(3):
            res = self.client.get(
                self.list_url,
                {"exchange_for": currency[0].short_name},
            )

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(res_json["count"], len(currency_exchange_set))

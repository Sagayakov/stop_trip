from functools import partial

from django.urls import reverse
from pytest import mark
from rest_framework import status
from rest_framework.test import APITestCase

from forbidden_words.tests.factories import ForbiddenWordsFactory
from offers.constants import (
    CategoryChoices,
    TransportCondition,
    TransportBodyType,
    TransportTransmissionType,
    TransportDriveType,
    TransportEngineType,
    TransportCategory,
    TransportType,
    TransportTypeOfService,
    TaxiUnit,
    TaxiType,
    PropertyRentalCondition,
    PropertyHouseType,
    PropertyBathroomType,
    PropertyTypeOfService,
    JobType,
    JobDurationType,
    JobPaymentType,
    FoodType,
    DocumentType,
    DocumentDuration,
    MarketCondition,
    PropertyType,
)
from users.tests.factories import UserFactory
from ..factories import BaseAdvertisementFactory
from offers.models import Advertisement


@mark.django_db
class AdvertisementViewSetTest(APITestCase):
    def setUp(self):
        self.list_url: str = reverse("advertisements-list")
        self.detail_url = partial(reverse, "advertisements-detail")
        self.get_filter_params_url: str = reverse("advertisements-get-filter-params")

    def test_create_advertisement_forbidden_words_exception(self):
        forbidden_words = ForbiddenWordsFactory()
        payload = {
            "category": CategoryChoices.DOCUMENT.value,
            "title": forbidden_words.russian_words[0],
            "price": 1_100,
            "document_type": DocumentType.OTHER_DOCUMENT,
            "document_duration": DocumentDuration.OTHER,
        }

        self.assertEqual(Advertisement.objects.count(), 0)
        user = UserFactory()
        self.client.force_login(user)

        with self.assertNumQueries(2):
            res = self.client.post(self.list_url, data=payload)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_advertisement_forbidden_words(self):
        forbidden_words = ForbiddenWordsFactory()
        payload = {
            "category": CategoryChoices.DOCUMENT.value,
            "title": "document",
            "price": 1_100,
            "document_type": DocumentType.OTHER_DOCUMENT,
            "document_duration": DocumentDuration.OTHER,
        }

        self.assertEqual(Advertisement.objects.count(), 0)
        user = UserFactory()
        self.client.force_login(user)

        with self.assertNumQueries(4):
            res = self.client.post(self.list_url, data=payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Advertisement.objects.count(), 1)

        new_advertisement = Advertisement.objects.first()
        self.assertNotIn(new_advertisement.title, forbidden_words.russian_words)
        self.assertNotIn(new_advertisement.title, forbidden_words.english_words)

    def test_list(self):
        user = UserFactory()
        advertisements = [
            BaseAdvertisementFactory(owner=user, category=category)
            for category in CategoryChoices.values
        ]

        with self.assertNumQueries(3):
            res = self.client.get(self.list_url)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(res_json["count"], len(advertisements))

    def test_detail(self):
        user = UserFactory()
        advertisements = [
            BaseAdvertisementFactory(owner=user, category=category)
            for category in CategoryChoices.values
        ]

        with self.assertNumQueries(3):
            res = self.client.get(self.detail_url(kwargs={"pk": advertisements[0].id}))

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(res_json["id"], advertisements[0].id)

    def test_filter_category(self):
        user = UserFactory()
        advertisements = [
            BaseAdvertisementFactory(owner=user, category=category)
            for category in CategoryChoices.values
        ]

        with self.assertNumQueries(3):
            res = self.client.get(
                self.list_url,
                {"category": CategoryChoices.TRANSPORT},
            )

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(res_json["count"], len(advertisements) // len(CategoryChoices.values))

    def test_filter_price(self):
        user = UserFactory()
        advertisements = [
            BaseAdvertisementFactory(owner=user, price=_)
            for _ in [i * 100_000 for i in range(1, 10)]
        ]

        with self.assertNumQueries(3):
            res = self.client.get(
                self.list_url,
                {"price_min": advertisements[1].price, "price_max": advertisements[-2].price},
            )

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(res_json["count"], len(advertisements) - 2)

    def test_filter_order_date_create(self):
        user = UserFactory()
        advertisements = [BaseAdvertisementFactory(owner=user) for _ in range(3)]

        with self.assertNumQueries(3):
            res = self.client.get(
                self.list_url,
                {"order": "-date_create"},
            )

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(res_json["count"], len(advertisements))
        self.assertEqual(res_json["results"][0]["id"], advertisements[-1].id)
        self.assertEqual(res_json["results"][-1]["id"], advertisements[0].id)

    def test_get_filter_params(self):
        with self.assertNumQueries(16):
            res = self.client.get(self.get_filter_params_url)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()

        for spec in res_json["params"]:
            # advertisement
            if spec["name"] == "category":
                self.assertEqual(len(spec["choices"]), len(CategoryChoices.choices))
            elif spec["name"] == "price":
                self.assertTrue(len(spec["range"]))
            # event
            elif spec["name"] == "is_online":
                self.assertEqual(len(spec["choices"]), len([True, False]))
            # job
            elif spec["name"] == "job_type":
                self.assertEqual(len(spec["choices"]), len(JobType.choices))
            elif spec["name"] == "job_duration":
                self.assertEqual(len(spec["choices"]), len(JobDurationType.choices))
            elif spec["name"] == "job_payment_type":
                self.assertEqual(len(spec["choices"]), len(JobPaymentType.choices))
            elif spec["name"] == "job_experience":
                self.assertEqual(len(spec["choices"]), len([True, False]))
            # property
            elif spec["name"] == "property_type":
                self.assertEqual(len(spec["choices"]), len(PropertyType.choices))
            elif spec["name"] == "property_type_of_service":
                self.assertEqual(len(spec["choices"]), len(PropertyTypeOfService.choices))
            elif spec["name"] == "property_city":
                self.assertEqual(len(spec["choices"]), 0)
            elif spec["name"] == "property_district":
                self.assertEqual(len(spec["choices"]), 0)
            elif spec["name"] == "property_bathroom_count":
                self.assertEqual(len(spec["choices"]), 0)
            elif spec["name"] == "property_bathroom_type":
                self.assertEqual(len(spec["choices"]), len(PropertyBathroomType.choices))
            elif spec["name"] == "property_house_type":
                self.assertEqual(len(spec["choices"]), len(PropertyHouseType.choices))
            elif spec["name"] == "property_sleeping_places":
                self.assertTrue(len(spec["range"]))
            elif spec["name"] == "property_rooms_count":
                self.assertTrue(len(spec["range"]))
            elif spec["name"] == "property_rental_condition":
                self.assertEqual(len(spec["choices"]), len(PropertyRentalCondition.choices))
            elif spec["name"] == "property_area":
                self.assertTrue(len(spec["range"]))
            elif spec["name"] == "property_has_furniture":
                self.assertEqual(len(spec["choices"]), len([True, False]))
            elif spec["name"] == "property_amenities":
                self.assertEqual(len(spec["choices"]), 0)
            # service
            elif spec["name"] == "service_home_visit":
                self.assertEqual(len(spec["choices"]), len([True, False]))
            # taxi
            elif spec["name"] == "taxi_unit":
                self.assertEqual(len(spec["choices"]), len(TaxiUnit.choices))
            elif spec["name"] == "taxi_type":
                self.assertEqual(len(spec["choices"]), len(TaxiType.choices))
            # transport
            elif spec["name"] == "transport_type_of_service":
                self.assertEqual(len(spec["choices"]), len(TransportTypeOfService.choices))
            elif spec["name"] == "transport_type":
                self.assertEqual(len(spec["choices"]), len(TransportType.choices))
            elif spec["name"] == "transport_category":
                self.assertEqual(len(spec["choices"]), len(TransportCategory.choices))
            elif spec["name"] == "transport_brand":
                self.assertEqual(len(spec["choices"]), 0)
            elif spec["name"] == "transport_model":
                self.assertEqual(len(spec["choices"]), 0)
            elif spec["name"] == "transport_engine_type":
                self.assertEqual(len(spec["choices"]), len(TransportEngineType.choices))
            elif spec["name"] == "transport_drive_type":
                self.assertEqual(len(spec["choices"]), len(TransportDriveType.choices))
            elif spec["name"] == "transport_engine_volume":
                self.assertTrue(len(spec["range"]))
            elif spec["name"] == "transport_year_of_production":
                self.assertTrue(len(spec["range"]))
            elif spec["name"] == "transport_transmission_type":
                self.assertEqual(len(spec["choices"]), len(TransportTransmissionType.choices))
            elif spec["name"] == "transport_body_type":
                self.assertEqual(len(spec["choices"]), len(TransportBodyType.choices))
            elif spec["name"] == "transport_condition":
                self.assertEqual(len(spec["choices"]), len(TransportCondition.choices))
            elif spec["name"] == "transport_commission":
                self.assertTrue(len(spec["range"]))
            # exchange
            elif spec["name"] == "proposed_currency":
                self.assertEqual(len(spec["choices"]), 0)
            elif spec["name"] == "exchange_for":
                self.assertEqual(len(spec["choices"]), 0)
            # food
            elif spec["name"] == "food_delivery":
                self.assertEqual(spec["choices"], [True, False])
            elif spec["name"] == "food_establishment":
                self.assertEqual(spec["choices"], [True, False])
            elif spec["name"] == "food_type":
                self.assertEqual(len(spec["choices"]), len(FoodType.choices))
            # documents
            elif spec["name"] == "document_type":
                self.assertTrue(len(spec["choices"]), len(DocumentType.choices))
            elif spec["name"] == "document_duration":
                self.assertTrue(len(spec["choices"]), len(DocumentDuration.choices))
            # excursion
            elif spec["name"] == "excursion_food":
                self.assertEqual(len(spec["choices"]), len([True, False]))
            elif spec["name"] == "excursion_transfer":
                self.assertEqual(len(spec["choices"]), len([True, False]))
            # market
            elif spec["name"] == "market_condition":
                self.assertEqual(len(spec["choices"]), len(MarketCondition.choices))
            else:
                assert False, f"Add test for spec['name'] = '{spec['name']}'"

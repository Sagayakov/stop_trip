from functools import partial

from django.urls import reverse
from pytest import mark
from rest_framework import status
from rest_framework.test import APITestCase

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


@mark.django_db
class AdvertisementViewSetTest(APITestCase):
    def setUp(self):
        self.list_url: str = reverse("advertisements-list")
        self.detail_url = partial(reverse, "advertisements-detail")
        self.get_filter_params_url: str = reverse("advertisements-get-filter-params")
        self.get_available_filtered_params_url: str = reverse(
            "advertisements-get-available-filtered-params"
        )
        self.my_advertisements_url: str = reverse("advertisements-my-advertisements")

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

    def test_my_advertisements(self):
        me = UserFactory()
        my_advertisements = [BaseAdvertisementFactory(owner=me) for _ in range(5)]

        user = UserFactory()
        advertisements = [BaseAdvertisementFactory(owner=user) for _ in range(5)]

        self.client.force_login(me)
        with self.assertNumQueries(3):
            res = self.client.get(self.my_advertisements_url)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(len(res_json), len(my_advertisements))

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
                {
                    "price_min": advertisements[1].price,
                    "price_max": advertisements[-2].price,
                },
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

    def test_filter_order_price(self):
        user = UserFactory()
        advertisements = [
            BaseAdvertisementFactory(owner=user, price=1_000_000 + _) for _ in range(3)
        ]

        with self.assertNumQueries(3):
            res = self.client.get(
                self.list_url,
                {"order": "-price"},
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
            elif spec["name"] == "region":
                self.assertEqual(len(spec["choices"]), 0)
            elif spec["name"] == "city":
                self.assertEqual(len(spec["choices"]), 0)
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
                self.assertEqual(len(spec["choices"]), len(DocumentType.choices))
            elif spec["name"] == "document_duration":
                self.assertEqual(len(spec["choices"]), len(DocumentDuration.choices))
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

    def test_get_available_filtered_params(self):
        with self.assertNumQueries(47):
            res = self.client.get(self.get_available_filtered_params_url)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()

        for facet, available_params in res_json["available_params"].items():
            # advertisement
            if facet == "category":
                self.assertEqual(len(available_params), 0)
            elif facet == "region":
                self.assertEqual(len(available_params), 0)
            elif facet == "city":
                self.assertEqual(len(available_params), 0)
            elif facet == "price":
                self.assertEqual(len(available_params), 2)
                self.assertTrue(all([param in available_params.keys() for param in ["min", "max"]]))
            # event
            elif facet == "is_online":
                self.assertEqual(len(available_params), 0)
            elif facet == "job_type":
                self.assertEqual(len(available_params), 0)
            elif facet == "job_duration":
                self.assertEqual(len(available_params), 0)
            elif facet == "job_payment_type":
                self.assertEqual(len(available_params), 0)
            elif facet == "job_experience":
                self.assertEqual(len(available_params), 0)
            # property
            elif facet == "property_type":
                self.assertEqual(len(available_params), 0)
            elif facet == "property_type_of_service":
                self.assertEqual(len(available_params), 0)
            elif facet == "property_bathroom_count":
                self.assertEqual(len(available_params), 0)
            elif facet == "property_bathroom_type":
                self.assertEqual(len(available_params), 0)
            elif facet == "property_house_type":
                self.assertEqual(len(available_params), 0)
            elif facet == "property_sleeping_places":
                self.assertTrue(len(available_params))
            elif facet == "property_rooms_count":
                self.assertEqual(len(available_params), 2)
                self.assertTrue(all([param in available_params.keys() for param in ["min", "max"]]))
            elif facet == "property_rental_condition":
                self.assertEqual(len(available_params), 0)
            elif facet == "property_area":
                self.assertEqual(len(available_params), 2)
                self.assertTrue(all([param in available_params.keys() for param in ["min", "max"]]))
            elif facet == "property_has_furniture":
                self.assertEqual(len(available_params), 0)
            elif facet == "property_amenities":
                self.assertEqual(len(available_params), 0)
            # service
            elif facet == "service_home_visit":
                self.assertEqual(len(available_params), 0)
            # taxi
            elif facet == "taxi_unit":
                self.assertEqual(len(available_params), 0)
            elif facet == "taxi_type":
                self.assertEqual(len(available_params), 0)
            # transport
            elif facet == "transport_type_of_service":
                self.assertEqual(len(available_params), 0)
            elif facet == "transport_type":
                self.assertEqual(len(available_params), 0)
            elif facet == "transport_category":
                self.assertEqual(len(available_params), 0)
            elif facet == "transport_brand":
                self.assertEqual(len(available_params), 0)
            elif facet == "transport_model":
                self.assertEqual(len(available_params), 0)
            elif facet == "transport_engine_type":
                self.assertEqual(len(available_params), 0)
            elif facet == "transport_drive_type":
                self.assertEqual(len(available_params), 0)
            elif facet == "transport_engine_volume":
                self.assertEqual(len(available_params), 2)
                self.assertTrue(all([param in available_params.keys() for param in ["min", "max"]]))
            elif facet == "transport_year_of_production":
                self.assertEqual(len(available_params), 2)
                self.assertTrue(all([param in available_params.keys() for param in ["min", "max"]]))
            elif facet == "transport_transmission_type":
                self.assertEqual(len(available_params), 0)
            elif facet == "transport_body_type":
                self.assertEqual(len(available_params), 0)
            elif facet == "transport_condition":
                self.assertEqual(len(available_params), 0)
            elif facet == "transport_commission":
                self.assertEqual(len(available_params), 2)
                self.assertTrue(all([param in available_params.keys() for param in ["min", "max"]]))
            # exchange
            elif facet == "proposed_currency":
                self.assertEqual(len(available_params), 0)
            elif facet == "exchange_for":
                self.assertEqual(len(available_params), 0)
            # food
            elif facet == "food_delivery":
                self.assertEqual(len(available_params), 0)
            elif facet == "food_establishment":
                self.assertEqual(len(available_params), 0)
            elif facet == "food_type":
                self.assertEqual(len(available_params), 0)
            # documents
            elif facet == "document_type":
                self.assertEqual(len(available_params), 0)
            elif facet == "document_duration":
                self.assertEqual(len(available_params), 0)
            # excursion
            elif facet == "excursion_food":
                self.assertEqual(len(available_params), 0)
            elif facet == "excursion_transfer":
                self.assertEqual(len(available_params), 0)
            # market
            elif facet == "market_condition":
                self.assertEqual(len(available_params), 0)
            else:
                assert False, f"Add test for facet = '{facet}'"

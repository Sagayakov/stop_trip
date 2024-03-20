from functools import partial

from django.urls import reverse
from pytest import mark
from rest_framework import status
from rest_framework.test import APITestCase

from common.utils import generate_image_file, encode_bytes_to_base64
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
    TransportRentDuration,
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
    PropertyPrepayment,
    PropertyBalcony,
    PropertyRentDuration,
)
from offers.models import Advertisement, AdvertisementImage
from users.tests.factories import UserFactory, UserMessengerFactory
from ..factories import (
    BaseAdvertisementFactory,
    CountryFactory,
    RegionFactory,
    CityFactory,
    TaxiAdvertisementFactory,
    AdvertisementImageFactory,
    TransportBrandFactory,
    TransportModelFactory,
)


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
        self.get_transport_brands_url: str = reverse("advertisements-get-transport-brands")
        self.get_transport_models_by_brand_url: str = reverse(
            "advertisements-get-transport-models-by-brand"
        )
        self.get_cities_by_region_url: str = reverse("advertisements-get-cities-by-region")
        self.get_regions_by_country_url: str = reverse("advertisements-get-regions-by-country")

    def test_create_advertisement_forbidden_words_exception(self):
        forbidden_words = ForbiddenWordsFactory()
        country = CountryFactory()
        region = RegionFactory(country=country)
        city = CityFactory(region=region)
        payload = {
            "category": CategoryChoices.DOCUMENT.value,
            "country": country.slug,
            "region": region.slug,
            "city": city.slug,
            "title": f"{forbidden_words.russian_words[0]}",
            "price": 1_000,
            "document_type": DocumentType.C_FORM,
            "document_duration": DocumentDuration.QUARTER,
        }

        self.assertEqual(Advertisement.objects.count(), 0)
        user = UserFactory()
        self.client.force_login(user)

        with self.assertNumQueries(5):
            res = self.client.post(self.list_url, data=payload)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        res_json = res.json()
        self.assertEqual(res_json["title"][0], "Название объявления содержит запрещенное слово.")

    def test_partial_update(self):
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

        payload = {"is_published": False}

        self.assertEqual(Advertisement.objects.count(), 1)
        self.client.force_login(user)

        with self.assertNumQueries(7):
            res = self.client.put(
                self.detail_url(kwargs={"slug": advertisement.slug}), data=payload
            )

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Advertisement.objects.count(), 1)
        advertisement.refresh_from_db()
        self.assertEqual(advertisement.is_published, payload["is_published"])

    def test_update_images(self):
        user = UserFactory()
        advertisement = TaxiAdvertisementFactory(owner=user)
        advertisement_images = [
            AdvertisementImageFactory(advertisement=advertisement) for _ in range(3)
        ]
        advertisement_images_ids = [image.id for image in advertisement_images]

        payload_images = [encode_bytes_to_base64(generate_image_file()) for _ in range(5)]
        payload = {
            "upload_images": payload_images,
            "delete_images": advertisement_images_ids,
        }

        self.assertEqual(Advertisement.objects.count(), 1)
        self.client.force_login(user)

        with self.assertNumQueries(9):
            res = self.client.put(
                self.detail_url(kwargs={"slug": advertisement.slug}), data=payload
            )

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Advertisement.objects.count(), 1)
        advertisement.refresh_from_db()

        self.assertEqual(AdvertisementImage.objects.count(), len(payload_images))
        self.assertEqual(
            AdvertisementImage.objects.filter(
                advertisement=advertisement.id, id__in=advertisement_images_ids
            ).count(),
            0,
        )

    def test_list(self):
        user = UserFactory()
        advertisements = [
            BaseAdvertisementFactory(owner=user, category=category)
            for category in CategoryChoices.values
        ]

        with self.assertNumQueries(5):
            res = self.client.get(self.list_url)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(res_json["count"], len(advertisements))

    def test_detail(self):
        user = UserFactory()
        user_messenger = UserMessengerFactory(owner=user)
        advertisements = [
            BaseAdvertisementFactory(owner=user, category=category)
            for category in CategoryChoices.values
        ]

        with self.assertNumQueries(5):
            res = self.client.get(self.detail_url(kwargs={"slug": advertisements[0].slug}))

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(res_json["slug"], advertisements[0].slug)
        self.assertTrue(res_json["owner"])
        self.assertEqual(res_json["owner"]["id"], user.id)
        self.assertEqual(
            res_json["owner"]["user_messengers"][0]["messenger"]["id"], user_messenger.id
        )
        self.assertEqual(
            res_json["owner"]["user_messengers"][0]["link_to_user"],
            user_messenger.link_to_user,
        )
        self.assertEqual(
            res_json["owner"]["user_messengers"][0]["messenger"]["name"],
            user_messenger.messenger.name,
        )
        self.assertIsNotNone(res_json["owner"]["avg_rating"])
        self.assertIsNotNone(res_json["owner"]["rating_num"])
        self.assertIsNone(res_json["owner"]["my_rating"])

    def test_my_advertisements(self):
        me = UserFactory()
        my_advertisements = [BaseAdvertisementFactory(owner=me) for _ in range(5)]
        my_unpublished_advertisements = [BaseAdvertisementFactory(owner=me) for _ in range(2)]

        user = UserFactory()
        advertisements = [BaseAdvertisementFactory(owner=user) for _ in range(5)]

        self.client.force_login(me)
        with self.assertNumQueries(3):
            res = self.client.get(self.my_advertisements_url)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(len(res_json), len(my_advertisements) + len(my_unpublished_advertisements))

    def test_get_transport_brands(self):
        brands = [TransportBrandFactory() for _ in range(10)]

        with self.assertNumQueries(1):
            res = self.client.get(self.get_transport_brands_url)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(len(res_json), len(brands))

    def test_get_transport_models_by_brand(self):
        brand = [TransportBrandFactory() for _ in range(2)]
        brand_0_models = [TransportModelFactory(brand=brand[0]) for _ in range(5)]
        brand_1_models = [TransportModelFactory(brand=brand[1]) for _ in range(3)]

        with self.assertNumQueries(1):
            res = self.client.get(
                self.get_transport_models_by_brand_url,
                data={"brand": brand[0].slug},
            )

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(len(res_json), len(brand_0_models))

        with self.assertNumQueries(1):
            res = self.client.get(
                self.get_transport_models_by_brand_url,
                data={"brand": brand[1].slug},
            )

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(len(res_json), len(brand_1_models))

    def test_get_cities_by_region(self):
        country = CountryFactory()
        regions = [RegionFactory(country=country) for _ in range(2)]
        region_0_cities = [CityFactory(region=regions[0]) for _ in range(5)]
        region_1_cities = [CityFactory(region=regions[1]) for _ in range(7)]

        with self.assertNumQueries(1):
            res = self.client.get(self.get_cities_by_region_url, data={"region": regions[0].slug})

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(len(res_json), len(region_0_cities))

        with self.assertNumQueries(1):
            res = self.client.get(self.get_cities_by_region_url, data={"region": regions[1].slug})

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(len(res_json), len(region_1_cities))

    def test_get_regions_by_country(self):
        country = [CountryFactory() for _ in range(2)]
        country_0_regions = [RegionFactory(country=country[0]) for _ in range(4)]
        country_1_regions = [RegionFactory(country=country[1]) for _ in range(6)]

        with self.assertNumQueries(1):
            res = self.client.get(
                self.get_regions_by_country_url, data={"country": country[0].slug}
            )

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(len(res_json), len(country_0_regions))

        with self.assertNumQueries(1):
            res = self.client.get(
                self.get_regions_by_country_url, data={"country": country[1].slug}
            )

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(len(res_json), len(country_1_regions))

    def test_filter_category(self):
        user = UserFactory()
        advertisements = [
            BaseAdvertisementFactory(owner=user, category=category)
            for category in CategoryChoices.values
        ]

        with self.assertNumQueries(5):
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

        with self.assertNumQueries(5):
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

    def test_filter_city(self):
        user = UserFactory()
        cities = [CityFactory() for _ in range(5)]
        advertisements = [BaseAdvertisementFactory(owner=user, city=city) for city in cities]

        with self.assertNumQueries(5):
            res = self.client.get(self.list_url, {"city": cities[0].slug})

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(res_json["count"], len(advertisements) // len(cities))

    def test_filter_region(self):
        user = UserFactory()
        regions = [RegionFactory() for _ in range(5)]
        advertisements = [BaseAdvertisementFactory(owner=user, region=region) for region in regions]

        with self.assertNumQueries(5):
            res = self.client.get(self.list_url, {"region": regions[0].slug})

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(res_json["count"], len(advertisements) // len(regions))

    def test_filter_order_date_create(self):
        user = UserFactory()
        advertisements = [BaseAdvertisementFactory(owner=user) for _ in range(3)]

        with self.assertNumQueries(5):
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

        with self.assertNumQueries(5):
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

        for spec, value in res_json.items():
            # advertisement
            if spec == "category":
                self.assertEqual(len(value), len(CategoryChoices.choices))
            elif spec == "region":
                self.assertEqual(len(value), 0)
            elif spec == "city":
                self.assertEqual(len(value), 0)
            elif spec == "price":
                self.assertTrue(len(value))
            # event
            elif spec == "is_online":
                self.assertEqual(
                    value,
                    [
                        {"value": True, "label": "Да"},
                        {"value": False, "label": "Нет"},
                    ],
                )
            # job
            elif spec == "job_type":
                self.assertEqual(len(value), len(JobType.choices))
            elif spec == "job_duration":
                self.assertEqual(len(value), len(JobDurationType.choices))
            elif spec == "job_payment_type":
                self.assertEqual(len(value), len(JobPaymentType.choices))
            elif spec == "job_experience":
                self.assertEqual(
                    value,
                    [
                        {"value": True, "label": "Да"},
                        {"value": False, "label": "Нет"},
                    ],
                )
            # property
            elif spec == "property_type":
                self.assertEqual(len(value), len(PropertyType.choices))
            elif spec == "property_type_of_service":
                self.assertEqual(len(value), len(PropertyTypeOfService.choices))
            elif spec == "property_bathroom_count":
                self.assertEqual(len(value), 0)
            elif spec == "property_bathroom_type":
                self.assertEqual(len(value), len(PropertyBathroomType.choices))
            elif spec == "property_house_type":
                self.assertEqual(len(value), len(PropertyHouseType.choices))
            elif spec == "property_sleeping_places":
                self.assertTrue(len(value))
            elif spec == "property_rooms_count":
                self.assertTrue(len(value))
            elif spec == "property_rental_condition":
                self.assertEqual(len(value), len(PropertyRentalCondition.choices))
            elif spec == "property_area":
                self.assertTrue(len(value))
            elif spec == "property_has_furniture":
                self.assertEqual(
                    value,
                    [
                        {"value": True, "label": "Да"},
                        {"value": False, "label": "Нет"},
                    ],
                )
            elif spec == "property_amenities":
                self.assertEqual(len(value), 0)
            elif spec == "property_prepayment":
                self.assertEqual(len(value), len(PropertyPrepayment.choices))
            elif spec == "property_balcony":
                self.assertEqual(len(value), len(PropertyBalcony.choices))
            elif spec == "property_rent_duration":
                self.assertEqual(len(value), len(PropertyRentDuration.choices))
            # service
            elif spec == "service_home_visit":
                self.assertEqual(
                    value,
                    [
                        {"value": True, "label": "Да"},
                        {"value": False, "label": "Нет"},
                    ],
                )
            # taxi
            elif spec == "taxi_unit":
                self.assertEqual(len(value), len(TaxiUnit.choices))
            elif spec == "taxi_type":
                self.assertEqual(len(value), len(TaxiType.choices))
            # transport
            elif spec == "transport_type_of_service":
                self.assertEqual(len(value), len(TransportTypeOfService.choices))
            elif spec == "transport_type":
                self.assertEqual(len(value), len(TransportType.choices))
            elif spec == "transport_category":
                self.assertEqual(len(value), len(TransportCategory.choices))
            elif spec == "transport_brand":
                self.assertEqual(len(value), 0)
            elif spec == "transport_model":
                self.assertEqual(len(value), 0)
            elif spec == "transport_engine_type":
                self.assertEqual(len(value), len(TransportEngineType.choices))
            elif spec == "transport_drive_type":
                self.assertEqual(len(value), len(TransportDriveType.choices))
            elif spec == "transport_engine_volume":
                self.assertTrue(len(value))
            elif spec == "transport_year_of_production":
                self.assertTrue(len(value))
            elif spec == "transport_transmission_type":
                self.assertEqual(len(value), len(TransportTransmissionType.choices))
            elif spec == "transport_body_type":
                self.assertEqual(len(value), len(TransportBodyType.choices))
            elif spec == "transport_condition":
                self.assertEqual(len(value), len(TransportCondition.choices))
            elif spec == "transport_commission":
                self.assertTrue(len(value))
            elif spec == "transport_rent_duration":
                self.assertEqual(len(value), len(TransportRentDuration.choices))
            # exchange
            elif spec == "proposed_currency":
                self.assertEqual(len(value), 0)
            elif spec == "exchange_for":
                self.assertEqual(len(value), 0)
            elif spec == "exchange_rate":
                self.assertTrue(len(value))
            # food
            elif spec == "food_delivery":
                self.assertEqual(
                    value,
                    [
                        {"value": True, "label": "Да"},
                        {"value": False, "label": "Нет"},
                    ],
                )
            elif spec == "food_establishment":
                self.assertEqual(
                    value,
                    [
                        {"value": True, "label": "Да"},
                        {"value": False, "label": "Нет"},
                    ],
                )
            elif spec == "food_type":
                self.assertEqual(len(value), len(FoodType.choices))
            # documents
            elif spec == "document_type":
                self.assertEqual(len(value), len(DocumentType.choices))
            elif spec == "document_duration":
                self.assertEqual(len(value), len(DocumentDuration.choices))
            # excursion
            elif spec == "excursion_food":
                self.assertEqual(
                    value,
                    [
                        {"value": True, "label": "Да"},
                        {"value": False, "label": "Нет"},
                    ],
                )
            elif spec == "excursion_transfer":
                self.assertEqual(
                    value,
                    [
                        {"value": True, "label": "Да"},
                        {"value": False, "label": "Нет"},
                    ],
                )
            # market
            elif spec == "market_condition":
                self.assertEqual(len(value), len(MarketCondition.choices))
            else:
                assert False, f"Add test for spec = '{spec}'"

    def test_get_available_filtered_params(self):
        with self.assertNumQueries(52):
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
            elif facet == "property_prepayment":
                self.assertEqual(len(available_params), 0)
            elif facet == "property_balcony":
                self.assertEqual(len(available_params), 0)
            elif facet == "property_rent_duration":
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
            elif facet == "transport_rent_duration":
                self.assertEqual(len(available_params), 0)
            # exchange
            elif facet == "proposed_currency":
                self.assertEqual(len(available_params), 0)
            elif facet == "exchange_for":
                self.assertEqual(len(available_params), 0)
            elif facet == "exchange_rate":
                self.assertEqual(len(available_params), 2)
                self.assertTrue(all([param in available_params.keys() for param in ["min", "max"]]))
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

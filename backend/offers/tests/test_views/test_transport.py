from functools import partial

from django.urls import reverse
from pytest import mark
from rest_framework import status
from rest_framework.test import APITestCase

from offers.constants import (
    CategoryChoices,
    TransportTypeOfService,
    TransportType,
    TransportCategory,
    TransportEngineType,
    TransportDriveType,
    TransportTransmissionType,
    TransportBodyType,
    TransportCondition,
)
from offers.models import Advertisement
from users.tests.factories import UserFactory
from ..factories import (
    AdvertisementImageFactory,
    TransportBrandFactory,
    TransportModelFactory,
    TransportAdvertisementFactory,
)


@mark.django_db
class TransportTest(APITestCase):
    def setUp(self):
        self.list_url: str = reverse("advertisements-list")
        self.detail_url = partial(reverse, "advertisements-detail")

    def test_create_transport(self):
        transport_brand = TransportBrandFactory(name="Audi")
        transport_model = TransportModelFactory(name="A7", brand=transport_brand)
        payload = {
            "category": CategoryChoices.TRANSPORT.value,
            "title": "test_transport",
            "price": 100_000,
            "coordinates": "35,56",
            "transport_type_of_service": TransportTypeOfService.SALE,
            "transport_type": TransportType.GROUND,
            "transport_category": TransportCategory.CAR,
            "transport_brand": transport_brand.id,
            "transport_model": transport_model.id,
            "transport_engine_type": TransportEngineType.FUEL,
            "transport_drive_type": TransportDriveType.ALL_WHEEL,
            "transport_engine_volume": 3.0,
            "transport_year_of_production": 2015,
            "transport_transmission_type": TransportTransmissionType.MECHANIC,
            "transport_body_type": TransportBodyType.LIFTBACK,
            "transport_condition": TransportCondition.USED,
            "transport_passengers_quality": 5,
            "transport_commission": 500,
        }
        self.assertEqual(Advertisement.objects.count(), 0)
        user = UserFactory()
        self.client.force_login(user)

        with self.assertNumQueries(5):
            res = self.client.post(self.list_url, data=payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Advertisement.objects.count(), 1)

        new_advertisement = Advertisement.objects.first()
        self.assertEqual(new_advertisement.owner, user)
        self.assertEqual(new_advertisement.category, payload["category"])
        self.assertEqual(new_advertisement.title, payload["title"])
        self.assertEqual(new_advertisement.price, payload["price"])
        self.assertEqual(new_advertisement.coordinates, payload["coordinates"])
        self.assertEqual(
            new_advertisement.transport_type_of_service, payload["transport_type_of_service"]
        )
        self.assertEqual(new_advertisement.transport_type, payload["transport_type"])
        self.assertEqual(new_advertisement.transport_category, payload["transport_category"])
        self.assertEqual(new_advertisement.transport_brand, transport_brand)
        self.assertEqual(new_advertisement.transport_model, transport_model)
        self.assertEqual(new_advertisement.transport_engine_type, payload["transport_engine_type"])
        self.assertEqual(new_advertisement.transport_drive_type, payload["transport_drive_type"])
        self.assertEqual(
            new_advertisement.transport_engine_volume, payload["transport_engine_volume"]
        )
        self.assertEqual(
            new_advertisement.transport_year_of_production, payload["transport_year_of_production"]
        )
        self.assertEqual(
            new_advertisement.transport_transmission_type, payload["transport_transmission_type"]
        )
        self.assertEqual(new_advertisement.transport_body_type, payload["transport_body_type"])
        self.assertEqual(new_advertisement.transport_condition, payload["transport_condition"])
        self.assertEqual(
            new_advertisement.transport_passengers_quality, payload["transport_passengers_quality"]
        )
        self.assertEqual(new_advertisement.transport_commission, payload["transport_commission"])

    def test_update_transport(self):
        user = UserFactory()
        transport_brand = TransportBrandFactory(name="Audi")
        transport_model = TransportModelFactory(name="A7", brand=transport_brand)
        advertisement = TransportAdvertisementFactory(
            owner=user,
            category=CategoryChoices.TRANSPORT.value,
            title="test_transport",
            price=100_000,
            transport_type_of_service=TransportTypeOfService.SALE,
            transport_type=TransportType.GROUND,
            transport_category=TransportCategory.CAR,
            transport_brand=transport_brand,
            transport_model=transport_model,
            transport_engine_type=TransportEngineType.FUEL,
            transport_drive_type=TransportDriveType.ALL_WHEEL,
            transport_engine_volume=3.0,
            transport_year_of_production=2015,
            transport_transmission_type=TransportTransmissionType.MECHANIC,
            transport_body_type=TransportBodyType.LIFTBACK,
            transport_condition=TransportCondition.USED,
            transport_passengers_quality=5,
            transport_commission=100,
        )

        new_transport_model = TransportModelFactory(name="RS7")
        payload = {
            "category": CategoryChoices.TRANSPORT.value,
            "title": "test_transport_new",
            "price": 120_000,
            "transport_type_of_service": TransportTypeOfService.SALE,
            "transport_type": TransportType.GROUND,
            "transport_category": TransportCategory.CAR,
            "transport_brand": transport_brand.id,
            "transport_model": new_transport_model.id,
            "transport_engine_type": TransportEngineType.DIESEL,
            "transport_drive_type": TransportDriveType.FOUR_WHEEL,
            "transport_engine_volume": 3.0,
            "transport_year_of_production": 2016,
            "transport_transmission_type": TransportTransmissionType.AUTOMATIC,
            "transport_body_type": TransportBodyType.LIFTBACK,
            "transport_condition": TransportCondition.USED,
            "transport_passengers_quality": 4,
            "transport_commission": 1_000,
        }
        self.assertEqual(Advertisement.objects.count(), 1)
        self.client.force_login(user)

        with self.assertNumQueries(8):
            res = self.client.put(self.detail_url(kwargs={"pk": advertisement.id}), data=payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Advertisement.objects.count(), 1)
        advertisement.refresh_from_db()

        self.assertEqual(advertisement.owner, user)
        self.assertEqual(advertisement.category, payload["category"])
        self.assertEqual(advertisement.title, payload["title"])
        self.assertEqual(advertisement.price, payload["price"])
        self.assertEqual(
            advertisement.transport_type_of_service, payload["transport_type_of_service"]
        )
        self.assertEqual(advertisement.transport_type, payload["transport_type"])
        self.assertEqual(advertisement.transport_category, payload["transport_category"])
        self.assertEqual(advertisement.transport_brand, transport_brand)
        self.assertEqual(advertisement.transport_model, new_transport_model)
        self.assertEqual(advertisement.transport_engine_type, payload["transport_engine_type"])
        self.assertEqual(advertisement.transport_drive_type, payload["transport_drive_type"])
        self.assertEqual(advertisement.transport_engine_volume, payload["transport_engine_volume"])
        self.assertEqual(
            advertisement.transport_year_of_production, payload["transport_year_of_production"]
        )
        self.assertEqual(
            advertisement.transport_transmission_type, payload["transport_transmission_type"]
        )
        self.assertEqual(advertisement.transport_body_type, payload["transport_body_type"])
        self.assertEqual(advertisement.transport_condition, payload["transport_condition"])
        self.assertEqual(
            advertisement.transport_passengers_quality, payload["transport_passengers_quality"]
        )
        self.assertEqual(advertisement.transport_commission, payload["transport_commission"])

    def test_delete_transport(self):
        user = UserFactory()
        advertisement = TransportAdvertisementFactory(
            owner=user,
        )
        [AdvertisementImageFactory(advertisement=advertisement) for _ in range(10)]

        self.assertEqual(Advertisement.objects.count(), 1)
        self.client.force_login(user)

        with self.assertNumQueries(5):
            res = self.client.delete(self.detail_url(kwargs={"pk": advertisement.id}))

        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Advertisement.objects.count(), 0)

    def test_filter_transport_type_of_service(self):
        user = UserFactory()
        transport_brands = [
            TransportBrandFactory(name=name) for name in ["Audi", "BMW", "Honda", "Lada"]
        ]
        transport_models = [
            TransportModelFactory(name=name, brand=brand)
            for name in ["1a", "2a", "3a", "4a"]
            for brand in transport_brands
        ]
        transport_set = [
            TransportAdvertisementFactory(
                owner=user,
                category=CategoryChoices.TRANSPORT.value,
                price=100_000 + _ * 50_000,
                transport_type_of_service=[
                    TransportTypeOfService.SALE,
                    TransportTypeOfService.RENT,
                ][_ % 2],
                transport_type=TransportType.GROUND,
                transport_category=TransportCategory.CAR,
                transport_brand=brand,
                transport_model=model,
                transport_engine_type=TransportEngineType.FUEL,
                transport_drive_type=TransportDriveType.ALL_WHEEL,
                transport_engine_volume=3.0,
                transport_year_of_production=2015,
                transport_transmission_type=TransportTransmissionType.MECHANIC,
                transport_body_type=TransportBodyType.LIFTBACK,
                transport_condition=TransportCondition.USED,
                transport_passengers_quality=5 + 1 * _,
                transport_commission=1000,
            )
            for model in transport_models
            for brand in transport_brands
            for _ in range(2)
        ]

        with self.assertNumQueries(2):
            res = self.client.get(
                self.list_url,
                {"transport_type_of_service": TransportTypeOfService.SALE.value},
            )

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(len(res_json), len(transport_set) // 2)

    def test_filter_transport_type(self):
        user = UserFactory()
        transport_brands = [
            TransportBrandFactory(name=name) for name in ["Audi", "BMW", "Honda", "Lada"]
        ]
        transport_models = [
            TransportModelFactory(name=name, brand=brand)
            for name in ["1a", "2a", "3a", "4a"]
            for brand in transport_brands
        ]
        transport_set = [
            TransportAdvertisementFactory(
                owner=user,
                category=CategoryChoices.TRANSPORT.value,
                price=100_000 + _ * 50_000,
                transport_type_of_service=TransportTypeOfService.SALE,
                transport_type=[
                    TransportType.GROUND,
                    TransportType.WATER,
                ][_ % 2],
                transport_category=TransportCategory.CAR,
                transport_brand=brand,
                transport_model=model,
                transport_engine_type=TransportEngineType.FUEL,
                transport_drive_type=TransportDriveType.ALL_WHEEL,
                transport_engine_volume=3.0,
                transport_year_of_production=2015,
                transport_transmission_type=TransportTransmissionType.MECHANIC,
                transport_body_type=TransportBodyType.LIFTBACK,
                transport_condition=TransportCondition.USED,
                transport_passengers_quality=5 + 1 * _,
                transport_commission=1000,
            )
            for model in transport_models
            for brand in transport_brands
            for _ in range(2)
        ]

        with self.assertNumQueries(2):
            res = self.client.get(
                self.list_url,
                {"transport_type": TransportType.GROUND.value},
            )

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(len(res_json), len(transport_set) // 2)

        with self.assertNumQueries(2):
            res = self.client.get(
                self.list_url,
                {"transport_type": [TransportType.GROUND.value, TransportType.WATER.value]},
            )

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(len(res_json), len(transport_set) // 2)

    def test_filter_transport_category(self):
        user = UserFactory()
        transport_brands = [
            TransportBrandFactory(name=name) for name in ["Audi", "BMW", "Honda", "Lada"]
        ]
        transport_models = [
            TransportModelFactory(name=name, brand=brand)
            for name in ["1a", "2a", "3a", "4a"]
            for brand in transport_brands
        ]
        transport_set = [
            TransportAdvertisementFactory(
                owner=user,
                category=CategoryChoices.TRANSPORT.value,
                price=100_000 + _ * 50_000,
                transport_type_of_service=TransportTypeOfService.SALE,
                transport_type=TransportType.GROUND,
                transport_category=[TransportCategory.MOTORCYCLE, TransportCategory.MOPED][_ % 2],
                transport_brand=brand,
                transport_model=model,
                transport_engine_type=TransportEngineType.FUEL,
                transport_drive_type=TransportDriveType.ALL_WHEEL,
                transport_engine_volume=3.0,
                transport_year_of_production=2015,
                transport_transmission_type=TransportTransmissionType.MECHANIC,
                transport_body_type=TransportBodyType.LIFTBACK,
                transport_condition=TransportCondition.USED,
                transport_passengers_quality=5 + 1 * _,
                transport_commission=1000,
            )
            for model in transport_models
            for brand in transport_brands
            for _ in range(2)
        ]

        with self.assertNumQueries(2):
            res = self.client.get(
                self.list_url,
                {"transport_category": TransportCategory.MOTORCYCLE.value},
            )

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(len(res_json), len(transport_set) // 2)

    def test_filter_transport_brand(self):
        user = UserFactory()
        transport_brands = [
            TransportBrandFactory(name=name) for name in ["Audi", "BMW", "Honda", "Lada"]
        ]
        transport_models = [
            TransportModelFactory(name=name, brand=brand)
            for name in ["1a", "2a", "3a", "4a"]
            for brand in transport_brands
        ]
        transport_set = [
            TransportAdvertisementFactory(
                owner=user,
                category=CategoryChoices.TRANSPORT.value,
                price=100_000 + _ * 50_000,
                transport_type_of_service=TransportTypeOfService.SALE,
                transport_type=TransportType.GROUND,
                transport_category=TransportCategory.MOTORCYCLE,
                transport_brand=brand,
                transport_model=model,
                transport_engine_type=TransportEngineType.FUEL,
                transport_drive_type=TransportDriveType.ALL_WHEEL,
                transport_engine_volume=3.0,
                transport_year_of_production=2015,
                transport_transmission_type=TransportTransmissionType.MECHANIC,
                transport_body_type=TransportBodyType.LIFTBACK,
                transport_condition=TransportCondition.USED,
                transport_passengers_quality=5 + 1 * _,
                transport_commission=1000,
            )
            for model in transport_models
            for brand in transport_brands
            for _ in range(2)
        ]

        with self.assertNumQueries(2):
            res = self.client.get(
                self.list_url,
                {"transport_brand": transport_brands[0].slug},
            )

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(len(res_json), len(transport_set) // len(transport_brands))

    def test_filter_transport_model(self):
        user = UserFactory()
        transport_brands = [
            TransportBrandFactory(name=name) for name in ["Audi", "BMW", "Honda", "Lada"]
        ]
        transport_models = [
            TransportModelFactory(
                name=["1a", "2a", "3a", "4a"][_ % len(transport_brands)], brand=brand
            )
            for _, brand in enumerate(transport_brands)
        ]
        transport_set = [
            TransportAdvertisementFactory(
                owner=user,
                category=CategoryChoices.TRANSPORT.value,
                price=100_000 + _ * 50_000,
                transport_type_of_service=TransportTypeOfService.SALE,
                transport_type=TransportType.GROUND,
                transport_category=TransportCategory.MOTORCYCLE,
                transport_brand=brand,
                transport_model=model,
                transport_engine_type=TransportEngineType.FUEL,
                transport_drive_type=TransportDriveType.ALL_WHEEL,
                transport_engine_volume=3.0,
                transport_year_of_production=2015,
                transport_transmission_type=TransportTransmissionType.MECHANIC,
                transport_body_type=TransportBodyType.LIFTBACK,
                transport_condition=TransportCondition.USED,
                transport_passengers_quality=5 + 1 * _,
                transport_commission=1000,
            )
            for model in transport_models
            for brand in transport_brands
            for _ in range(2)
        ]

        with self.assertNumQueries(2):
            res = self.client.get(
                f"{self.list_url}?transport_model={transport_models[0].slug},{transport_models[1].slug}"
            )

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(len(res_json), len(transport_set) // 2)

    def test_filter_transport_engine_type(self):
        user = UserFactory()
        transport_brands = [
            TransportBrandFactory(name=name) for name in ["Audi", "BMW", "Honda", "Lada"]
        ]
        transport_models = [
            TransportModelFactory(name=name, brand=brand)
            for name in ["1a", "2a", "3a", "4a"]
            for brand in transport_brands
        ]
        transport_set = [
            TransportAdvertisementFactory(
                owner=user,
                category=CategoryChoices.TRANSPORT.value,
                price=100_000 + _ * 50_000,
                transport_type_of_service=TransportTypeOfService.SALE,
                transport_type=TransportType.GROUND,
                transport_category=TransportCategory.MOTORCYCLE,
                transport_brand=brand,
                transport_model=model,
                transport_engine_type=[TransportEngineType.FUEL, TransportEngineType.DIESEL][_ % 2],
                transport_drive_type=TransportDriveType.ALL_WHEEL,
                transport_engine_volume=3.0,
                transport_year_of_production=2015,
                transport_transmission_type=TransportTransmissionType.MECHANIC,
                transport_body_type=TransportBodyType.LIFTBACK,
                transport_condition=TransportCondition.USED,
                transport_passengers_quality=5 + 1 * _,
                transport_commission=1000,
            )
            for model in transport_models
            for brand in transport_brands
            for _ in range(2)
        ]

        with self.assertNumQueries(2):
            res = self.client.get(
                self.list_url,
                {"transport_engine_type": TransportEngineType.FUEL.value},
            )

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(len(res_json), len(transport_set) // 2)

        with self.assertNumQueries(2):
            res = self.client.get(
                self.list_url,
                {
                    "transport_engine_type": [
                        TransportEngineType.FUEL.value,
                        TransportEngineType.DIESEL.value,
                    ]
                },
            )

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(len(res_json), len(transport_set) // 2)

    def test_filter_transport_drive_type(self):
        user = UserFactory()
        transport_brands = [
            TransportBrandFactory(name=name) for name in ["Audi", "BMW", "Honda", "Lada"]
        ]
        transport_models = [
            TransportModelFactory(name=name, brand=brand)
            for name in ["1a", "2a", "3a", "4a"]
            for brand in transport_brands
        ]
        transport_set = [
            TransportAdvertisementFactory(
                owner=user,
                category=CategoryChoices.TRANSPORT.value,
                price=100_000 + _ * 50_000,
                transport_type_of_service=TransportTypeOfService.SALE,
                transport_type=TransportType.GROUND,
                transport_category=TransportCategory.MOTORCYCLE,
                transport_brand=brand,
                transport_model=model,
                transport_engine_type=TransportEngineType.FUEL,
                transport_drive_type=[
                    TransportDriveType.ALL_WHEEL,
                    TransportDriveType.FRONT_WHEEL,
                ][_ % 2],
                transport_engine_volume=3.0,
                transport_year_of_production=2015,
                transport_transmission_type=TransportTransmissionType.MECHANIC,
                transport_body_type=TransportBodyType.LIFTBACK,
                transport_condition=TransportCondition.USED,
                transport_passengers_quality=5 + 1 * _,
                transport_commission=1000,
            )
            for model in transport_models
            for brand in transport_brands
            for _ in range(2)
        ]

        with self.assertNumQueries(2):
            res = self.client.get(
                self.list_url,
                {"transport_drive_type": TransportDriveType.ALL_WHEEL.value},
            )

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(len(res_json), len(transport_set) // 2)

        with self.assertNumQueries(2):
            res = self.client.get(
                self.list_url,
                {
                    "transport_drive_type": [
                        TransportDriveType.ALL_WHEEL.value,
                        TransportDriveType.FRONT_WHEEL.value,
                    ]
                },
            )

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(len(res_json), len(transport_set) // 2)

    def test_filter_transport_engine_volume(self):
        user = UserFactory()
        transport_set = [
            TransportAdvertisementFactory(
                owner=user,
                category=CategoryChoices.TRANSPORT.value,
                price=100_000,
                transport_type_of_service=TransportTypeOfService.SALE,
                transport_type=TransportType.GROUND,
                transport_category=TransportCategory.CAR,
                transport_engine_type=TransportEngineType.FUEL,
                transport_drive_type=TransportDriveType.ALL_WHEEL,
                transport_engine_volume=_,
                transport_year_of_production=2015,
                transport_transmission_type=TransportTransmissionType.MECHANIC,
                transport_body_type=TransportBodyType.LIFTBACK,
                transport_condition=TransportCondition.USED,
                transport_passengers_quality=5,
                transport_commission=1000,
            )
            for _ in list([float(i / 10) for i in range(10, 100)])
        ]

        with self.assertNumQueries(2):
            res = self.client.get(
                self.list_url,
                {"transport_engine_volume_min": 3.0, "transport_engine_volume_max": 4.0},
            )

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(len(res_json), 11)

    def test_filter_transport_year_of_production(self):
        user = UserFactory()
        transport_set = [
            TransportAdvertisementFactory(
                owner=user,
                category=CategoryChoices.TRANSPORT.value,
                price=100_000,
                transport_type_of_service=TransportTypeOfService.SALE,
                transport_type=TransportType.GROUND,
                transport_category=TransportCategory.CAR,
                transport_engine_type=TransportEngineType.FUEL,
                transport_drive_type=TransportDriveType.ALL_WHEEL,
                transport_engine_volume=1.5,
                transport_year_of_production=_,
                transport_transmission_type=TransportTransmissionType.MECHANIC,
                transport_body_type=TransportBodyType.LIFTBACK,
                transport_condition=TransportCondition.USED,
                transport_passengers_quality=5,
                transport_commission=1000,
            )
            for _ in list(range(2000, 2022))
        ]

        with self.assertNumQueries(2):
            res = self.client.get(
                self.list_url,
                {
                    "transport_year_of_production_min": 2020,
                    "transport_year_of_production_max": 2022,
                },
            )

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(len(res_json), 2)

    def test_filter_transport_transmission_type(self):
        user = UserFactory()
        transport_brands = [
            TransportBrandFactory(name=name) for name in ["Audi", "BMW", "Honda", "Lada"]
        ]
        transport_models = [
            TransportModelFactory(name=name, brand=brand)
            for name in ["1a", "2a", "3a", "4a"]
            for brand in transport_brands
        ]
        transport_set = [
            TransportAdvertisementFactory(
                owner=user,
                category=CategoryChoices.TRANSPORT.value,
                price=100_000 + _ * 50_000,
                transport_type_of_service=TransportTypeOfService.SALE,
                transport_type=TransportType.GROUND,
                transport_category=TransportCategory.MOTORCYCLE,
                transport_brand=brand,
                transport_model=model,
                transport_engine_type=TransportEngineType.FUEL,
                transport_drive_type=TransportDriveType.ALL_WHEEL,
                transport_engine_volume=3.0,
                transport_year_of_production=2015,
                transport_transmission_type=[
                    TransportTransmissionType.MECHANIC,
                    TransportTransmissionType.AUTOMATIC,
                ][_ % 2],
                transport_body_type=TransportBodyType.LIFTBACK,
                transport_condition=TransportCondition.USED,
                transport_passengers_quality=5 + 1 * _,
                transport_commission=1000,
            )
            for model in transport_models
            for brand in transport_brands
            for _ in range(2)
        ]

        with self.assertNumQueries(2):
            res = self.client.get(
                self.list_url,
                {"transport_transmission_type": TransportTransmissionType.MECHANIC.value},
            )

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(len(res_json), len(transport_set) // 2)

        with self.assertNumQueries(2):
            res = self.client.get(
                self.list_url,
                {
                    "transport_transmission_type": [
                        TransportTransmissionType.MECHANIC.value,
                        TransportTransmissionType.AUTOMATIC.value,
                    ]
                },
            )

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(len(res_json), len(transport_set) // 2)

    def test_filter_transport_body_type(self):
        user = UserFactory()
        transport_brands = [
            TransportBrandFactory(name=name) for name in ["Audi", "BMW", "Honda", "Lada"]
        ]
        transport_models = [
            TransportModelFactory(name=name, brand=brand)
            for name in ["1a", "2a", "3a", "4a"]
            for brand in transport_brands
        ]
        transport_set = [
            TransportAdvertisementFactory(
                owner=user,
                category=CategoryChoices.TRANSPORT.value,
                price=100_000 + _ * 50_000,
                transport_type_of_service=TransportTypeOfService.SALE,
                transport_type=TransportType.GROUND,
                transport_category=TransportCategory.MOTORCYCLE,
                transport_brand=brand,
                transport_model=model,
                transport_engine_type=TransportEngineType.FUEL,
                transport_drive_type=TransportDriveType.ALL_WHEEL,
                transport_engine_volume=3.0,
                transport_year_of_production=2015,
                transport_transmission_type=TransportTransmissionType.MECHANIC,
                transport_body_type=[TransportBodyType.LIFTBACK, TransportBodyType.SEDAN][_ % 2],
                transport_condition=TransportCondition.USED,
                transport_passengers_quality=5 + 1 * _,
                transport_commission=1000,
            )
            for model in transport_models
            for brand in transport_brands
            for _ in range(2)
        ]

        with self.assertNumQueries(2):
            res = self.client.get(
                self.list_url,
                {"transport_body_type": TransportBodyType.LIFTBACK.value},
            )

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(len(res_json), len(transport_set) // 2)

        with self.assertNumQueries(2):
            res = self.client.get(
                self.list_url,
                {
                    "transport_body_type": [
                        TransportBodyType.LIFTBACK.value,
                        TransportBodyType.SEDAN.value,
                    ]
                },
            )

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(len(res_json), len(transport_set) // 2)

    def test_filter_transport_condition(self):
        user = UserFactory()
        transport_brands = [
            TransportBrandFactory(name=name) for name in ["Audi", "BMW", "Honda", "Lada"]
        ]
        transport_models = [
            TransportModelFactory(name=name, brand=brand)
            for name in ["1a", "2a", "3a", "4a"]
            for brand in transport_brands
        ]
        transport_set = [
            TransportAdvertisementFactory(
                owner=user,
                category=CategoryChoices.TRANSPORT.value,
                price=100_000 + _ * 50_000,
                transport_type_of_service=TransportTypeOfService.SALE,
                transport_type=TransportType.GROUND,
                transport_category=TransportCategory.MOTORCYCLE,
                transport_brand=brand,
                transport_model=model,
                transport_engine_type=TransportEngineType.FUEL,
                transport_drive_type=TransportDriveType.ALL_WHEEL,
                transport_engine_volume=3.0,
                transport_year_of_production=2015,
                transport_transmission_type=TransportTransmissionType.MECHANIC,
                transport_body_type=TransportBodyType.LIFTBACK,
                transport_condition=[TransportCondition.USED, TransportCondition.NEW][_ % 2],
                transport_passengers_quality=5 + 1 * _,
                transport_commission=1000,
            )
            for model in transport_models
            for brand in transport_brands
            for _ in range(2)
        ]

        with self.assertNumQueries(2):
            res = self.client.get(
                self.list_url,
                {"transport_condition": TransportCondition.USED.value},
            )

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(len(res_json), len(transport_set) // 2)

        with self.assertNumQueries(2):
            res = self.client.get(
                self.list_url,
                {
                    "transport_condition": [
                        TransportCondition.USED.value,
                        TransportCondition.NEW.value,
                    ]
                },
            )

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(len(res_json), len(transport_set) // 2)

    def test_filter_transport_commission(self):
        user = UserFactory()
        transport_set = [
            TransportAdvertisementFactory(
                owner=user,
                category=CategoryChoices.TRANSPORT.value,
                price=100_000,
                transport_type_of_service=TransportTypeOfService.SALE,
                transport_type=TransportType.GROUND,
                transport_category=TransportCategory.CAR,
                transport_engine_type=TransportEngineType.FUEL,
                transport_drive_type=TransportDriveType.ALL_WHEEL,
                transport_engine_volume=1.5,
                transport_year_of_production=2021,
                transport_transmission_type=TransportTransmissionType.MECHANIC,
                transport_body_type=TransportBodyType.LIFTBACK,
                transport_condition=TransportCondition.USED,
                transport_passengers_quality=5,
                transport_commission=1000 + 100 * _,
            )
            for _ in range(5)
        ]

        with self.assertNumQueries(2):
            res = self.client.get(
                self.list_url,
                {
                    "transport_commission_min": 1200,
                    "transport_commission_max": 1800,
                },
            )

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(len(res_json), 3)

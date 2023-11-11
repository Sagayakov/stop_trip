import datetime
from functools import partial

from django.urls import reverse
from django.utils.timezone import now
from pytest import mark
from rest_framework import status
from rest_framework.test import APITestCase

from offers.constants import (
    CategoryChoices,
    PropertyTypeOfService,
    PropertyBathroomType,
    PropertyBalcony,
    PropertyHouseType,
    PropertyRentalCondition,
    PropertyPrepayment,
    TaxiUnit,
    TaxiType,
    TransportTypeOfService,
    TransportType,
    TransportCategory,
    TransportEngineType,
    TransportDriveType,
    TransportTransmissionType,
    TransportBodyType,
    TransportCondition,
    JobType,
    JobPaymentType,
    JobDurationType,
)
from offers.models import Advertisement
from users.tests.factories import UserFactory
from .factories import (
    PropertyAdvertisementFactory,
    PropertyAmenityFactory,
    TaxiAdvertisementFactory,
    TransportBrandFactory,
    TransportModelFactory,
    TransportAdvertisementFactory,
    EventAdvertisementFactory,
    JobAdvertisementFactory,
    ServiceAdvertisementFactory,
    AdvertisementImageFactory,
    ExchangeAdvertisementFactory,
    CurrencyFactory,
)


@mark.django_db
class AdvertisementViewSetTest(APITestCase):
    def setUp(self):
        self.list_url: str = reverse("advertisements-list")
        self.detail_url = partial(reverse, "advertisements-detail")

    def test_create_property(self):
        property_amenities = [PropertyAmenityFactory() for _ in range(10)]
        payload = {
            "category": CategoryChoices.PROPERTY.value,
            "title": "test",
            "price": 10_000,
            "property_city": "tokyo",
            "property_type_of_service": PropertyTypeOfService.RENT,
            "property_district": "new_district",
            "property_coords": "38,38",
            "property_building_max_floor": 15,
            "property_floor": 5,
            "property_bathroom_count": 1,
            "property_bathroom_type": PropertyBathroomType.COMBINED,
            "property_area": 45,
            "property_living_area": 30,
            "property_balcony": PropertyBalcony.YES,
            "property_has_furniture": True,
            "property_amenities": [amenity.id for amenity in property_amenities[:5]],
            "property_house_type": PropertyHouseType.BLOCK,
            "property_has_parking": True,
            "property_rental_condition": PropertyRentalCondition.FAMILY,
            "property_prepayment": PropertyPrepayment.MONTH,
            "property_sleeping_places": 3,
            "property_rooms_count": 4,
            "property_commission": 500,
        }
        self.assertEqual(Advertisement.objects.count(), 0)
        user = UserFactory()
        self.client.force_login(user)

        with self.assertNumQueries(11):
            res = self.client.post(self.list_url, data=payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Advertisement.objects.count(), 1)

        new_advertisement = Advertisement.objects.first()
        self.assertEqual(new_advertisement.owner, user)
        self.assertEqual(new_advertisement.category, payload["category"])
        self.assertEqual(new_advertisement.title, payload["title"])
        self.assertEqual(new_advertisement.price, payload["price"])
        self.assertEqual(new_advertisement.property_city, payload["property_city"])
        self.assertEqual(
            new_advertisement.property_type_of_service, payload["property_type_of_service"]
        )
        self.assertEqual(new_advertisement.property_district, payload["property_district"])
        self.assertEqual(new_advertisement.property_coords, payload["property_coords"])
        self.assertEqual(
            new_advertisement.property_building_max_floor, payload["property_building_max_floor"]
        )
        self.assertEqual(new_advertisement.property_floor, payload["property_floor"])
        self.assertEqual(
            new_advertisement.property_bathroom_count, payload["property_bathroom_count"]
        )
        self.assertEqual(
            new_advertisement.property_bathroom_type, payload["property_bathroom_type"]
        )
        self.assertEqual(new_advertisement.property_area, payload["property_area"])
        self.assertEqual(new_advertisement.property_living_area, payload["property_living_area"])
        self.assertEqual(new_advertisement.property_balcony, payload["property_balcony"])
        self.assertEqual(
            new_advertisement.property_has_furniture, payload["property_has_furniture"]
        )
        self.assertEqual(new_advertisement.property_house_type, payload["property_house_type"])
        self.assertEqual(new_advertisement.property_has_parking, payload["property_has_parking"])
        self.assertEqual(
            new_advertisement.property_rental_condition, payload["property_rental_condition"]
        )
        self.assertEqual(new_advertisement.property_prepayment, payload["property_prepayment"])
        self.assertEqual(
            new_advertisement.property_sleeping_places, payload["property_sleeping_places"]
        )
        self.assertEqual(new_advertisement.property_rooms_count, payload["property_rooms_count"])
        self.assertEqual(
            new_advertisement.property_amenities.count(), len(payload["property_amenities"])
        )
        self.assertEqual(new_advertisement.property_commission, payload["property_commission"])

    def test_update_property(self):
        user = UserFactory()
        advertisement = PropertyAdvertisementFactory(
            owner=user,
            title="property",
            price=1500,
            property_city="Moscow",
            property_type_of_service=PropertyTypeOfService.SALE,
            property_district="district",
            property_coords="36,36",
            property_building_max_floor=14,
            property_floor=4,
            property_bathroom_count=2,
            property_bathroom_type=PropertyBathroomType.SEPARATE,
            property_area=40,
            property_living_area=25,
            property_balcony=PropertyBalcony.NO,
            property_has_furniture=False,
            property_house_type=PropertyHouseType.BRICK,
            property_has_parking=False,
            property_rental_condition=PropertyRentalCondition.OFFICE,
            property_prepayment=PropertyPrepayment.TWO_MONTHS,
            property_sleeping_places=2,
            property_rooms_count=2,
            property_commission=100,
        )
        property_amenities = [PropertyAmenityFactory() for _ in range(10)]
        advertisement.property_amenities.set(property_amenities)

        payload = {
            "title": "test",
            "price": advertisement.price - 100,
            "property_city": "tokyo",
            "property_type_of_service": PropertyTypeOfService.RENT,
            "property_district": "new_district",
            "property_coords": "38,38",
            "property_building_max_floor": 15,
            "property_floor": 5,
            "property_bathroom_count": 1,
            "property_bathroom_type": PropertyBathroomType.COMBINED,
            "property_area": 45,
            "property_living_area": 30,
            "property_balcony": PropertyBalcony.YES,
            "property_has_furniture": True,
            "property_amenities": [amenity.id for amenity in property_amenities[:5]],
            "property_house_type": PropertyHouseType.BLOCK,
            "property_has_parking": True,
            "property_rental_condition": PropertyRentalCondition.FAMILY,
            "property_prepayment": PropertyPrepayment.MONTH,
            "property_sleeping_places": 3,
            "property_rooms_count": 4,
            "property_commission": 100,
        }
        self.assertEqual(Advertisement.objects.count(), 1)
        self.client.force_login(user)

        with self.assertNumQueries(13):
            res = self.client.put(self.detail_url(kwargs={"pk": advertisement.id}), data=payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Advertisement.objects.count(), 1)
        advertisement.refresh_from_db()

        self.assertEqual(advertisement.owner, user)
        self.assertEqual(advertisement.title, payload["title"])
        self.assertEqual(advertisement.price, payload["price"])
        self.assertEqual(advertisement.property_city, payload["property_city"])
        self.assertEqual(
            advertisement.property_type_of_service, payload["property_type_of_service"]
        )
        self.assertEqual(advertisement.property_district, payload["property_district"])
        self.assertEqual(advertisement.property_coords, payload["property_coords"])
        self.assertEqual(
            advertisement.property_building_max_floor, payload["property_building_max_floor"]
        )
        self.assertEqual(advertisement.property_floor, payload["property_floor"])
        self.assertEqual(advertisement.property_bathroom_count, payload["property_bathroom_count"])
        self.assertEqual(advertisement.property_bathroom_type, payload["property_bathroom_type"])
        self.assertEqual(advertisement.property_area, payload["property_area"])
        self.assertEqual(advertisement.property_living_area, payload["property_living_area"])
        self.assertEqual(advertisement.property_balcony, payload["property_balcony"])
        self.assertEqual(advertisement.property_has_furniture, payload["property_has_furniture"])
        self.assertEqual(advertisement.property_house_type, payload["property_house_type"])
        self.assertEqual(advertisement.property_has_parking, payload["property_has_parking"])
        self.assertEqual(
            advertisement.property_rental_condition, payload["property_rental_condition"]
        )
        self.assertEqual(advertisement.property_prepayment, payload["property_prepayment"])
        self.assertEqual(
            advertisement.property_sleeping_places, payload["property_sleeping_places"]
        )
        self.assertEqual(advertisement.property_rooms_count, payload["property_rooms_count"])
        self.assertEqual(
            advertisement.property_amenities.count(), len(payload["property_amenities"])
        )
        self.assertEqual(advertisement.property_commission, payload["property_commission"])

    def test_delete_property(self):
        user = UserFactory()
        advertisement = PropertyAdvertisementFactory(
            owner=user,
        )
        property_amenities = [PropertyAmenityFactory() for _ in range(10)]
        advertisement.property_amenities.set(property_amenities)
        [AdvertisementImageFactory(advertisement=advertisement) for _ in range(10)]

        self.assertEqual(Advertisement.objects.count(), 1)
        self.client.force_login(user)

        with self.assertNumQueries(6):
            res = self.client.delete(self.detail_url(kwargs={"pk": advertisement.id}))

        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Advertisement.objects.count(), 0)

    def test_create_taxi(self):
        payload = {
            "category": CategoryChoices.TAXI.value,
            "title": "test_taxi",
            "price": 1000,
            "taxi_unit": TaxiUnit.KM.value,
            "taxi_type": TaxiType.BUSINESS.value,
        }
        self.assertEqual(Advertisement.objects.count(), 0)
        user = UserFactory()
        self.client.force_login(user)

        with self.assertNumQueries(3):
            res = self.client.post(self.list_url, data=payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Advertisement.objects.count(), 1)

        new_advertisement = Advertisement.objects.first()
        self.assertEqual(new_advertisement.owner, user)
        self.assertEqual(new_advertisement.category, payload["category"])
        self.assertEqual(new_advertisement.title, payload["title"])
        self.assertEqual(new_advertisement.price, payload["price"])
        self.assertEqual(new_advertisement.taxi_unit, payload["taxi_unit"])
        self.assertEqual(new_advertisement.taxi_type, payload["taxi_type"])

    def test_update_taxi(self):
        user = UserFactory()
        advertisement = TaxiAdvertisementFactory(
            owner=user,
            title="taxi",
            price=1500,
            taxi_unit=TaxiUnit.KM.value,
            taxi_type=TaxiType.ECONOMY.value,
        )

        payload = {
            "price": 3000,
            "taxi_unit": TaxiUnit.ROUTE.value,
            "taxi_type": TaxiType.COMFORT.value,
        }
        self.assertEqual(Advertisement.objects.count(), 1)
        self.client.force_login(user)

        with self.assertNumQueries(7):
            res = self.client.put(self.detail_url(kwargs={"pk": advertisement.id}), data=payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Advertisement.objects.count(), 1)
        advertisement.refresh_from_db()

        self.assertEqual(advertisement.price, payload["price"])
        self.assertEqual(advertisement.taxi_unit, payload["taxi_unit"])
        self.assertEqual(advertisement.taxi_type, payload["taxi_type"])

    def test_delete_taxi(self):
        user = UserFactory()
        advertisement = TaxiAdvertisementFactory(
            owner=user,
        )
        [AdvertisementImageFactory(advertisement=advertisement) for _ in range(10)]

        self.assertEqual(Advertisement.objects.count(), 1)
        self.client.force_login(user)

        with self.assertNumQueries(6):
            res = self.client.delete(self.detail_url(kwargs={"pk": advertisement.id}))

        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Advertisement.objects.count(), 0)

    def test_create_transport(self):
        transport_brand = TransportBrandFactory(name="Audi")
        transport_model = TransportModelFactory(name="A7", brand=transport_brand)
        payload = {
            "category": CategoryChoices.TRANSPORT.value,
            "title": "test_transport",
            "price": 100_000,
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

        with self.assertNumQueries(9):
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

        with self.assertNumQueries(6):
            res = self.client.delete(self.detail_url(kwargs={"pk": advertisement.id}))

        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Advertisement.objects.count(), 0)

    def test_create_exchange_rate(self):
        proposed_currency = CurrencyFactory()
        exchange_for = CurrencyFactory()
        payload = {
            "category": CategoryChoices.EXCHANGE_RATE.value,
            "title": "test_taxi",
            "proposed_currency": proposed_currency.id,
            "exchange_for": exchange_for.id,
            "exchange_rate": 2.15,
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
        self.assertEqual(new_advertisement.proposed_currency, proposed_currency)
        self.assertEqual(new_advertisement.exchange_for, exchange_for)
        self.assertEqual(new_advertisement.exchange_rate, payload["exchange_rate"])

    def test_update_exchange_rate(self):
        user = UserFactory()
        proposed_currency = [CurrencyFactory() for _ in range(2)]
        exchange_for = [CurrencyFactory() for _ in range(2)]
        advertisement = ExchangeAdvertisementFactory(
            owner=user,
            title="exchange_rate",
            price=1500,
            proposed_currency=proposed_currency[0],
            exchange_for=exchange_for[0],
            exchange_rate=3.15,
        )

        payload = {
            "proposed_currency": proposed_currency[1].id,
            "exchange_for": exchange_for[1].id,
            "exchange_rate": 2.15,
        }
        self.assertEqual(Advertisement.objects.count(), 1)
        self.client.force_login(user)

        with self.assertNumQueries(9):
            res = self.client.put(self.detail_url(kwargs={"pk": advertisement.id}), data=payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Advertisement.objects.count(), 1)
        advertisement.refresh_from_db()

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

        with self.assertNumQueries(6):
            res = self.client.delete(self.detail_url(kwargs={"pk": advertisement.id}))

        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Advertisement.objects.count(), 0)

    def test_create_service(self):
        payload = {
            "category": CategoryChoices.SERVICE.value,
            "title": "service",
            "price": 10_000,
            "home_visit": False,
        }

        self.assertEqual(Advertisement.objects.count(), 0)
        user = UserFactory()
        self.client.force_login(user)

        with self.assertNumQueries(3):
            res = self.client.post(self.list_url, data=payload)
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Advertisement.objects.count(), 1)

        new_advertisement = Advertisement.objects.first()

        self.assertEqual(new_advertisement.owner, user)
        self.assertEqual(new_advertisement.title, payload["title"])
        self.assertEqual(new_advertisement.price, payload["price"])
        self.assertEqual(new_advertisement.home_visit, payload["home_visit"])

    def test_update_service(self):
        user = UserFactory()
        advertisement = ServiceAdvertisementFactory(owner=user)
        payload = {
            "category": CategoryChoices.SERVICE.value,
            "title": "service",
            "price": 10_000,
            "home_visit": True,
        }

        self.assertEqual(Advertisement.objects.count(), 1)
        self.client.force_login(user)

        with self.assertNumQueries(7):
            res = self.client.put(self.detail_url(kwargs={"pk": advertisement.id}), data=payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Advertisement.objects.count(), 1)
        advertisement.refresh_from_db()

        self.assertEqual(advertisement.owner, user)
        self.assertEqual(advertisement.category, payload["category"])
        self.assertEqual(advertisement.title, payload["title"])
        self.assertEqual(advertisement.price, payload["price"])

    def test_delete_service(self):
        user = UserFactory()

        advertisement = ServiceAdvertisementFactory(owner=user)

        self.assertEqual(Advertisement.objects.count(), 1)
        self.client.force_login(user)

        with self.assertNumQueries(6):
            res = self.client.delete(self.detail_url(kwargs={"pk": advertisement.id}))

        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Advertisement.objects.count(), 0)

    def test_create_job(self):
        payload = {
            "category": CategoryChoices.JOB.value,
            "job_type": JobType.PART_TIME.value,
            "title": "job",
            "price": 10_000,
            "job_duration": JobDurationType.TEMPORARY,
            "job_payment_type": JobPaymentType.MONTHLY_PAYMENT.value,
            "job_experience": True,
        }

        self.assertEqual(Advertisement.objects.count(), 0)
        user = UserFactory()
        self.client.force_login(user)

        with self.assertNumQueries(3):
            res = self.client.post(self.list_url, data=payload)
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Advertisement.objects.count(), 1)

        new_advertisement = Advertisement.objects.first()

        self.assertEqual(new_advertisement.owner, user)
        self.assertEqual(new_advertisement.job_type, payload["job_type"])
        self.assertEqual(new_advertisement.job_duration, payload["job_duration"])
        self.assertEqual(new_advertisement.job_experience, payload["job_experience"])

    def test_update_job(self):
        user = UserFactory()
        advertisement = JobAdvertisementFactory(owner=user)
        payload = {
            "category": CategoryChoices.JOB.value,
            "title": "job",
            "price": 10_000,
            "job_type": JobType.PART_TIME,
            "job_duration": JobDurationType.TEMPORARY.value,
            "job_payment_type": JobPaymentType.DAILY_PAYMENT.value,
            "job_experience": True,
        }
        self.assertEqual(Advertisement.objects.count(), 1)

        self.client.force_login(user)
        with self.assertNumQueries(7):
            res = self.client.put(self.detail_url(kwargs={"pk": advertisement.id}), data=payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Advertisement.objects.count(), 1)
        advertisement.refresh_from_db()

        self.assertEqual(advertisement.owner, user)
        self.assertEqual(advertisement.category, payload["category"])
        self.assertEqual(advertisement.title, payload["title"])
        self.assertEqual(advertisement.price, payload["price"])
        self.assertEqual(advertisement.job_type, payload["job_type"])
        self.assertEqual(advertisement.job_duration, payload["job_duration"])
        self.assertEqual(advertisement.job_payment_type, payload["job_payment_type"])
        self.assertEqual(advertisement.job_experience, payload["job_experience"])

    def test_delete_job(self):
        user = UserFactory()
        advertisement = JobAdvertisementFactory(owner=user)

        self.assertEqual(Advertisement.objects.count(), 1)
        self.client.force_login(user)

        with self.assertNumQueries(6):
            res = self.client.delete(self.detail_url(kwargs={"pk": advertisement.id}))

        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Advertisement.objects.count(), 0)

    def test_create_event(self):
        payload = {
            "category": CategoryChoices.EVENT.value,
            "title": "event",
            "price": 12_000,
            "start_date": str(now() + datetime.timedelta(days=2)),
            "end_date": str(now() + datetime.timedelta(days=3)),
            "is_online": True,
        }
        self.assertEqual(Advertisement.objects.count(), 0)
        user = UserFactory()
        self.client.force_login(user)

        with self.assertNumQueries(3):
            res = self.client.post(self.list_url, data=payload)
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Advertisement.objects.count(), 1)

        new_advertisement = Advertisement.objects.first()

        self.assertEqual(new_advertisement.owner, user)
        self.assertEqual(new_advertisement.category, payload["category"])
        self.assertEqual(new_advertisement.title, payload["title"])
        self.assertEqual(str(new_advertisement.start_date), payload["start_date"])
        self.assertEqual(str(new_advertisement.end_date), payload["end_date"])
        self.assertEqual(new_advertisement.is_online, payload["is_online"])

    def test_update_event(self):
        user = UserFactory()
        advertisement = EventAdvertisementFactory(owner=user)
        payload = {
            "category": CategoryChoices.EVENT.value,
            "title": "event_test",
            "price": 13_000,
            "start_date": str(now() + datetime.timedelta(days=2)),
            "end_date": str(now() + datetime.timedelta(days=3)),
            "is_online": True,
        }
        self.assertEqual(Advertisement.objects.count(), 1)

        self.client.force_login(user)
        with self.assertNumQueries(7):
            res = self.client.put(self.detail_url(kwargs={"pk": advertisement.id}), data=payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Advertisement.objects.count(), 1)
        advertisement.refresh_from_db()

        self.assertEqual(advertisement.owner, user)

    def test_delete_event(self):
        user = UserFactory()
        advertisement = EventAdvertisementFactory(owner=user)

        self.assertEqual(Advertisement.objects.count(), 1)
        self.client.force_login(user)

        with self.assertNumQueries(6):
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
                {"transport_model": transport_models[0].slug},
            )

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(len(res_json), len(transport_set) // len(transport_models))

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


#

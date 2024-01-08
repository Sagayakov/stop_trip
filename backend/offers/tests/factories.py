import datetime
import random

import factory
from django.utils.timezone import now
from factory import fuzzy

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
    JobPaymentType,
    JobType,
    JobDurationType,
    MarketCondition,
    FoodType,
    DocumentDuration,
    DocumentType,
)
from offers.models import (
    Advertisement,
    PropertyAmenity,
    TransportBrand,
    TransportModel,
    AdvertisementImage,
    Currency,
)
from countries.models import (
    Country,
    Region,
    City,
)


class CountryFactory(factory.django.DjangoModelFactory):
    """Фабрика страны"""

    name = factory.Faker("country")
    slug = factory.Sequence(lambda x: f"slug_{x}")

    class Meta:
        model = Country


class RegionFactory(factory.django.DjangoModelFactory):
    """Фабрика региона."""

    name = factory.Faker("word")
    slug = factory.Sequence(lambda x: f"slug_{x}")
    country = factory.SubFactory(CountryFactory)

    class Meta:
        model = Region


class CityFactory(factory.django.DjangoModelFactory):
    """Фабрика города."""

    name = factory.Faker("city")
    slug = factory.Sequence(lambda x: f"slug_{x}")
    region = factory.SubFactory(RegionFactory)

    class Meta:
        model = City


class BaseAdvertisementFactory(factory.django.DjangoModelFactory):
    """Базовая фабрика объявлений."""

    country = factory.SubFactory(CountryFactory)
    region = factory.SubFactory(RegionFactory)
    city = factory.SubFactory(CityFactory)
    category = fuzzy.FuzzyChoice(choices=CategoryChoices.values)
    title = factory.Faker("word")
    price = factory.Faker("pyint", min_value=1000, max_value=10_000)
    coordinates = "35,35"
    description = factory.Faker("sentence")
    is_published = True
    slug = factory.Sequence(lambda x: f"slug_{x}")

    class Meta:
        model = Advertisement


class AdvertisementImageFactory(factory.django.DjangoModelFactory):
    """Фабрика картинок объявлений."""

    advertisement = factory.SubFactory(BaseAdvertisementFactory)
    image = factory.django.ImageField()

    class Meta:
        model = AdvertisementImage


class PropertyAdvertisementFactory(BaseAdvertisementFactory):
    """Фабрика объявлений по недвижимости."""

    property_type_of_service = fuzzy.FuzzyChoice(choices=PropertyTypeOfService.values)
    property_building_max_floor = factory.Faker("pyint", min_value=1, max_value=15)
    property_floor = factory.Faker("pyint", min_value=1, max_value=15)
    property_bathroom_count = factory.Faker("pyint", min_value=1, max_value=3)
    property_bathroom_type = fuzzy.FuzzyChoice(choices=PropertyBathroomType.values)
    property_area = factory.Faker("pyint", min_value=15, max_value=100)
    property_living_area = factory.Faker("pyint", min_value=10, max_value=90)
    property_balcony = fuzzy.FuzzyChoice(choices=PropertyBalcony.values)
    property_has_furniture = True
    property_house_type = fuzzy.FuzzyChoice(choices=PropertyHouseType.values)
    property_has_parking = True
    property_rental_condition = fuzzy.FuzzyChoice(choices=PropertyRentalCondition.values)
    property_prepayment = fuzzy.FuzzyChoice(choices=PropertyPrepayment.values)
    property_sleeping_places = factory.Faker("pyint", min_value=1, max_value=8)
    property_rooms_count = factory.Faker("pyint", min_value=1, max_value=5)
    property_commission = factory.Faker("pyint", min_value=100, max_value=5_000)


class PropertyAmenityFactory(factory.django.DjangoModelFactory):
    """Фабрика удобств."""

    name = factory.Faker("word")
    slug = factory.Sequence(lambda x: f"slug_{x}")

    class Meta:
        model = PropertyAmenity


class TaxiAdvertisementFactory(BaseAdvertisementFactory):
    """Фабрика объявлений по такси."""

    taxi_unit = fuzzy.FuzzyChoice(choices=TaxiUnit.values)
    taxi_type = fuzzy.FuzzyChoice(choices=TaxiType.values)


class TransportBrandFactory(factory.django.DjangoModelFactory):
    """Фабрика бренда машины."""

    name = factory.Faker("word")
    slug = factory.Sequence(lambda x: f"slug_{x}")

    class Meta:
        model = TransportBrand


class TransportModelFactory(factory.django.DjangoModelFactory):
    """Фабрика модели машины."""

    name = factory.Faker("word")
    slug = factory.Sequence(lambda x: f"slug_{x}")
    brand = factory.SubFactory(TransportBrandFactory)

    class Meta:
        model = TransportModel


class TransportAdvertisementFactory(BaseAdvertisementFactory):
    """Фабрика объявлений по транспорту."""

    transport_type_of_service = fuzzy.FuzzyChoice(choices=TransportTypeOfService.values)
    transport_type = fuzzy.FuzzyChoice(choices=TransportType.values)
    transport_category = fuzzy.FuzzyChoice(choices=TransportCategory.values)
    transport_brand = factory.SubFactory(TransportBrandFactory)
    transport_model = factory.SubFactory(TransportModelFactory)
    transport_engine_type = fuzzy.FuzzyChoice(choices=TransportEngineType.values)
    transport_drive_type = fuzzy.FuzzyChoice(choices=TransportDriveType.values)
    transport_engine_volume = factory.Faker(
        "random_element",
        elements=[float(i / 10) for i in range(10, 100)],
    )
    transport_transmission_type = fuzzy.FuzzyChoice(choices=TransportTransmissionType.values)
    transport_body_type = fuzzy.FuzzyChoice(choices=TransportBodyType.values)
    transport_condition = fuzzy.FuzzyChoice(choices=TransportCondition.values)
    transport_passengers_quality = factory.Faker(provider="pyint", min_value=0, max_value=100)
    transport_commission = factory.Faker(provider="pyint", min_value=100, max_value=5_000)


class ServiceAdvertisementFactory(BaseAdvertisementFactory):
    """Фабрика объявлений по услугам."""

    service_home_visit = True


class EventAdvertisementFactory(BaseAdvertisementFactory):
    """Фабрика объявлений по мероприятиям."""

    start_date = now() + datetime.timedelta(days=1)
    end_date = now() + datetime.timedelta(days=4)
    is_online = False


class JobAdvertisementFactory(BaseAdvertisementFactory):
    """Фабрика объявлений по работе."""

    job_type = fuzzy.FuzzyChoice(choices=JobType.values)
    job_duration = fuzzy.FuzzyChoice(choices=JobDurationType.values)
    job_payment_type = fuzzy.FuzzyChoice(choices=JobPaymentType.values)
    job_experience = False


def eng_alphabet() -> list[str]:
    return [chr(_) for _ in range(ord("A"), ord("Z") + 1)]


def random_letter() -> str:
    return random.choice(eng_alphabet())


class CurrencyFactory(factory.django.DjangoModelFactory):
    """Фабрика валюты."""

    name = factory.Faker("word")
    short_name = factory.Sequence(lambda x: f"{random_letter()}{random_letter()}{random_letter()}")

    class Meta:
        model = Currency


class ExchangeAdvertisementFactory(BaseAdvertisementFactory):
    """Фабрика объявлений по валютным парам."""

    proposed_currency = factory.SubFactory(CurrencyFactory)
    exchange_for = factory.SubFactory(CurrencyFactory)
    exchange_rate = factory.Faker("pyfloat")


class MarketAdvertisementFactory(BaseAdvertisementFactory):
    """Фабрика объявлений по купли-продаже"""

    market_condition = fuzzy.FuzzyChoice(choices=MarketCondition.values)


class DocumentAdvertisementFactory(BaseAdvertisementFactory):
    """Фабрика объявлений по документам"""

    document_type = fuzzy.FuzzyChoice(choices=DocumentType)
    document_duration = fuzzy.FuzzyChoice(choices=DocumentDuration)


class FoodAdvertisementFactory(BaseAdvertisementFactory):
    """Фабрика объявлений по еде"""

    food_delivery = True
    food_establishment = False
    food_type = fuzzy.FuzzyChoice(choices=FoodType)


class ExcursionAdvertisementFactory(BaseAdvertisementFactory):
    """Фабрика объявлений по экскурсиям"""

    excursion_food = True
    excursion_transfer = False

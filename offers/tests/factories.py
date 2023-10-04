import datetime

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
)
from offers.models import Advertisement, PropertyAmenity


class BaseAdvertisementFactory(factory.django.DjangoModelFactory):
    """Базовая фабрика объявлений."""

    category = fuzzy.FuzzyChoice(choices=CategoryChoices.values)
    title = factory.Faker("word")
    price = factory.Faker("pyint", min_value=1000, max_value=10_000)
    description = factory.Faker("sentence")
    is_published = True
    date_create = now() - datetime.timedelta(days=1)
    date_update = now()
    slug = factory.Sequence(lambda x: f"slug_{x}")

    class Meta:
        model = Advertisement


class PropertyAdvertisementFactory(BaseAdvertisementFactory):
    """Фабрика объявлений по недвижимости."""

    property_type_of_service = fuzzy.FuzzyChoice(choices=PropertyTypeOfService.values)
    property_city = factory.Faker("word")
    property_district = factory.Faker("word")
    property_coords = "35,35"
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

    class Meta:
        model = Advertisement


class PropertyAmenityFactory(factory.django.DjangoModelFactory):
    """Фабрика удобств."""

    name = factory.Faker("word")

    class Meta:
        model = PropertyAmenity

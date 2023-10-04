from functools import partial

from django.urls import reverse
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
)
from offers.models import Advertisement
from offers.tests.factories import PropertyAdvertisementFactory, PropertyAmenityFactory
from users.tests.factories import UserFactory


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
        }
        self.assertEqual(Advertisement.objects.count(), 1)
        self.client.force_login(user)

        with self.assertNumQueries(12):
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

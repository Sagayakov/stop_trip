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
from users.tests.factories import UserFactory
from ..factories import (
    PropertyCityFactory,
    PropertyDistrictFactory,
    PropertyAmenityFactory,
    PropertyAdvertisementFactory,
    AdvertisementImageFactory,
)


@mark.django_db
class PropertyTest(APITestCase):
    def setUp(self):
        self.list_url: str = reverse("advertisements-list")
        self.detail_url = partial(reverse, "advertisements-detail")

    def test_create_property(self):
        property_city = PropertyCityFactory(name="Rome")
        property_district = PropertyDistrictFactory(city=property_city, name="Lazio")
        property_amenities = [PropertyAmenityFactory() for _ in range(10)]
        payload = {
            "category": CategoryChoices.PROPERTY.value,
            "title": "test",
            "price": 10_000,
            "coordinates": "35, 35",
            "property_city": property_city.id,
            "property_type_of_service": PropertyTypeOfService.RENT,
            "property_district": property_district.id,
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

        with self.assertNumQueries(13):
            res = self.client.post(self.list_url, data=payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Advertisement.objects.count(), 1)

        new_advertisement = Advertisement.objects.first()
        self.assertEqual(new_advertisement.owner, user)
        self.assertEqual(new_advertisement.category, payload["category"])
        self.assertEqual(new_advertisement.title, payload["title"])
        self.assertEqual(new_advertisement.price, payload["price"])
        self.assertEqual(new_advertisement.coordinates, payload["coordinates"])
        self.assertEqual(new_advertisement.property_city, property_city)
        self.assertEqual(
            new_advertisement.property_type_of_service, payload["property_type_of_service"]
        )
        self.assertEqual(new_advertisement.property_district, property_district)

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
        property_city = PropertyCityFactory(name="Milano")
        property_district = PropertyDistrictFactory(city=property_city, name="Milano Centrale")
        advertisement = PropertyAdvertisementFactory(
            owner=user,
            title="property",
            price=1500,
            coordinates="35,35",
            property_city=property_city,
            property_type_of_service=PropertyTypeOfService.SALE,
            property_district=property_district,
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
            property_commission=2000,
            property_sleeping_places=2,
            property_rooms_count=2,
        )
        property_amenities = [PropertyAmenityFactory() for _ in range(10)]
        advertisement.property_amenities.set(property_amenities)

        payload = {
            "title": "test",
            "price": advertisement.price - 100,
            "coordinates": "38,35",
            "property_city": property_city.id,
            "property_type_of_service": PropertyTypeOfService.RENT,
            "property_district": property_district.id,
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
            "property_commission": 1500,
            "property_sleeping_places": 3,
            "property_rooms_count": 4,
        }
        self.assertEqual(Advertisement.objects.count(), 1)
        self.client.force_login(user)

        with self.assertNumQueries(15):
            res = self.client.put(self.detail_url(kwargs={"pk": advertisement.id}), data=payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Advertisement.objects.count(), 1)
        advertisement.refresh_from_db()

        self.assertEqual(advertisement.owner, user)
        self.assertEqual(advertisement.title, payload["title"])
        self.assertEqual(advertisement.price, payload["price"])
        self.assertEqual(advertisement.coordinates, payload["coordinates"])
        self.assertEqual(advertisement.property_city, property_city)
        self.assertEqual(
            advertisement.property_type_of_service, payload["property_type_of_service"]
        )
        self.assertEqual(advertisement.property_district, property_district)

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
        self.assertEqual(advertisement.property_commission, payload["property_commission"])
        self.assertEqual(
            advertisement.property_sleeping_places, payload["property_sleeping_places"]
        )
        self.assertEqual(advertisement.property_rooms_count, payload["property_rooms_count"])
        self.assertEqual(
            advertisement.property_amenities.count(), len(payload["property_amenities"])
        )

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

    def test_filter_property_type_of_service(self):
        user = UserFactory()
        property_cities = [
            PropertyCityFactory(name=name) for name in ["Tokyo", "Paris", "Istanbul", "London"]
        ]
        property_districts = [
            PropertyDistrictFactory(name=name, city=city)
            for name in ["1d", "2d", "3d", "4d"]
            for city in property_cities
        ]
        property_set = [
            PropertyAdvertisementFactory(
                owner=user,
                price=100_000 + _ * 50_000,
                category=CategoryChoices.PROPERTY.value,
                coordinates="35,35",
                property_type_of_service=[PropertyTypeOfService.SALE, PropertyTypeOfService.RENT][
                    _ % 2
                ],
                property_city=city,
                property_district=district,
                property_building_max_floor=5,
                property_floor=4,
                property_bathroom_count=2,
                property_bathroom_type=PropertyBathroomType.SEPARATE,
                property_area=35,
                property_living_area=50,
                property_balcony=PropertyBalcony.YES,
                property_has_furniture=True,
                property_house_type=PropertyHouseType.BLOCK,
                property_has_parking=True,
                property_rental_condition=PropertyRentalCondition.FAMILY,
                property_prepayment=PropertyPrepayment.TWO_MONTHS,
                property_sleeping_places=5,
                property_rooms_count=3,
            )
            for city in property_cities
            for district in property_districts
            for _ in range(2)
        ]

        with self.assertNumQueries(2):
            res = self.client.get(
                self.list_url,
                {"property_type_of_service": PropertyTypeOfService.SALE.value},
            )

            self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(len(res_json), len(property_set) // 2)

    def test_filter_property_city(self):
        user = UserFactory()
        property_cities = [
            PropertyCityFactory(name=name) for name in ["Tokyo", "Paris", "Istanbul", "London"]
        ]
        property_districts = [
            PropertyDistrictFactory(name=name, city=city)
            for name in ["1d", "2d", "3d", "4d"]
            for city in property_cities
        ]
        property_set = [
            PropertyAdvertisementFactory(
                owner=user,
                price=100_000 + _ * 50_000,
                category=CategoryChoices.PROPERTY.value,
                coordinates="35,35",
                property_type_of_service=[PropertyTypeOfService.SALE, PropertyTypeOfService.RENT][
                    _ % 2
                ],
                property_city=city,
                property_district=district,
                property_building_max_floor=5,
                property_floor=4,
                property_bathroom_count=2,
                property_bathroom_type=PropertyBathroomType.SEPARATE,
                property_area=35,
                property_living_area=50,
                property_balcony=PropertyBalcony.YES,
                property_has_furniture=True,
                property_house_type=PropertyHouseType.BLOCK,
                property_has_parking=True,
                property_rental_condition=PropertyRentalCondition.FAMILY,
                property_prepayment=PropertyPrepayment.TWO_MONTHS,
                property_sleeping_places=5,
                property_rooms_count=3,
            )
            for city in property_cities
            for district in property_districts
            for _ in range(2)
        ]

        with self.assertNumQueries(2):
            res = self.client.get(
                self.list_url,
                {"property_city": property_cities[0].slug},
            )

            self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(len(res_json), len(property_set) // len(property_cities))

    def test_filter_property_district(self):
        user = UserFactory()
        property_cities = [
            PropertyCityFactory(name=name) for name in ["Tokyo", "Paris", "Istanbul", "London"]
        ]
        property_districts = [
            PropertyDistrictFactory(name=name, city=city)
            for name in ["1d", "2d", "3d", "4d"]
            for city in property_cities
        ]
        property_set = [
            PropertyAdvertisementFactory(
                owner=user,
                price=100_000 + _ * 50_000,
                category=CategoryChoices.PROPERTY.value,
                coordinates="35,35",
                property_type_of_service=[PropertyTypeOfService.SALE, PropertyTypeOfService.RENT][
                    _ % 2
                ],
                property_city=city,
                property_district=district,
                property_building_max_floor=5,
                property_floor=4,
                property_bathroom_count=2,
                property_bathroom_type=PropertyBathroomType.SEPARATE,
                property_area=35,
                property_living_area=50,
                property_balcony=PropertyBalcony.YES,
                property_has_furniture=True,
                property_house_type=PropertyHouseType.BLOCK,
                property_has_parking=True,
                property_rental_condition=PropertyRentalCondition.FAMILY,
                property_prepayment=PropertyPrepayment.TWO_MONTHS,
                property_sleeping_places=5,
                property_rooms_count=3,
            )
            for city in property_cities
            for district in property_districts
            for _ in range(2)
        ]

        with self.assertNumQueries(2):
            res = self.client.get(
                self.list_url,
                {"property_district": property_districts[0].slug},
            )

            self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(len(res_json), len(property_set) // len(property_districts))

    def test_filter_property_bathroom_type(self):
        user = UserFactory()
        property_cities = [
            PropertyCityFactory(name=name) for name in ["Tokyo", "Paris", "Istanbul", "London"]
        ]
        property_districts = [
            PropertyDistrictFactory(name=name, city=city)
            for name in ["1d", "2d", "3d", "4d"]
            for city in property_cities
        ]
        property_set = [
            PropertyAdvertisementFactory(
                owner=user,
                price=100_000 + _ * 50_000,
                category=CategoryChoices.PROPERTY.value,
                coordinates="35,35",
                property_type_of_service=PropertyTypeOfService.SALE,
                property_city=city,
                property_district=district,
                property_building_max_floor=5,
                property_floor=4,
                property_bathroom_count=2,
                property_bathroom_type=[
                    PropertyBathroomType.SEPARATE,
                    PropertyBathroomType.COMBINED,
                ][_ % 2],
                property_area=35,
                property_living_area=50,
                property_balcony=PropertyBalcony.YES,
                property_has_furniture=True,
                property_house_type=PropertyHouseType.BLOCK,
                property_has_parking=True,
                property_rental_condition=PropertyRentalCondition.FAMILY,
                property_prepayment=PropertyPrepayment.TWO_MONTHS,
                property_sleeping_places=5,
                property_rooms_count=3,
            )
            for city in property_cities
            for district in property_districts
            for _ in range(2)
        ]

        with self.assertNumQueries(2):
            res = self.client.get(
                self.list_url,
                {"property_bathroom_type": PropertyBathroomType.COMBINED.value},
            )

            self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(len(res_json), len(property_set) // 2)

    def test_filter_property_bathroom_count(self):
        user = UserFactory()
        property_cities = [
            PropertyCityFactory(name=name) for name in ["Tokyo", "Paris", "Istanbul", "London"]
        ]
        property_districts = [
            PropertyDistrictFactory(name=name, city=city)
            for name in ["1d", "2d", "3d", "4d"]
            for city in property_cities
        ]
        property_set = [
            PropertyAdvertisementFactory(
                owner=user,
                price=100_000 + _ * 50_000,
                category=CategoryChoices.PROPERTY.value,
                coordinates="35,35",
                property_type_of_service=PropertyTypeOfService.SALE,
                property_city=city,
                property_district=district,
                property_building_max_floor=5,
                property_floor=4,
                property_bathroom_count=1 + _ * 1,
                property_bathroom_type=PropertyBathroomType.SEPARATE,
                property_area=35,
                property_living_area=50,
                property_balcony=PropertyBalcony.YES,
                property_has_furniture=True,
                property_house_type=PropertyHouseType.BLOCK,
                property_has_parking=True,
                property_rental_condition=PropertyRentalCondition.FAMILY,
                property_prepayment=PropertyPrepayment.TWO_MONTHS,
                property_sleeping_places=5,
                property_rooms_count=3,
            )
            for city in property_cities
            for district in property_districts
            for _ in range(2)
        ]

        with self.assertNumQueries(2):
            res = self.client.get(self.list_url, {"property_bathroom_count": 2})

            self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()

        self.assertEqual(len(res_json), len(property_set) // 2)

    def test_filter_property_house_type(self):
        user = UserFactory()
        property_cities = [
            PropertyCityFactory(name=name) for name in ["Tokyo", "Paris", "Istanbul", "London"]
        ]
        property_districts = [
            PropertyDistrictFactory(name=name, city=city)
            for name in ["1d", "2d", "3d", "4d"]
            for city in property_cities
        ]
        property_set = [
            PropertyAdvertisementFactory(
                owner=user,
                price=100_000 + _ * 50_000,
                category=CategoryChoices.PROPERTY.value,
                coordinates="35,35",
                property_type_of_service=PropertyTypeOfService.SALE,
                property_city=city,
                property_district=district,
                property_building_max_floor=5,
                property_floor=4,
                property_bathroom_count=2,
                property_bathroom_type=PropertyBathroomType.SEPARATE,
                property_area=35,
                property_living_area=50,
                property_balcony=PropertyBalcony.YES,
                property_has_furniture=True,
                property_house_type=[PropertyHouseType.BLOCK, PropertyHouseType.BRICK][_ % 2],
                property_has_parking=True,
                property_rental_condition=PropertyRentalCondition.FAMILY,
                property_prepayment=PropertyPrepayment.TWO_MONTHS,
                property_sleeping_places=5,
                property_rooms_count=3,
            )
            for city in property_cities
            for district in property_districts
            for _ in range(2)
        ]

        with self.assertNumQueries(2):
            res = self.client.get(
                self.list_url,
                {"property_house_type": PropertyHouseType.BLOCK.value},
            )

            self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(len(res_json), len(property_set) // 2)

    def test_filter_property_sleeping_places(self):
        user = UserFactory()
        property_cities = [
            PropertyCityFactory(name=name) for name in ["Tokyo", "Paris", "Istanbul", "London"]
        ]
        property_districts = [
            PropertyDistrictFactory(name=name, city=city)
            for name in ["1d", "2d", "3d", "4d"]
            for city in property_cities
        ]
        property_set = [
            PropertyAdvertisementFactory(
                owner=user,
                price=100_000 + _ * 50_000,
                category=CategoryChoices.PROPERTY.value,
                coordinates="35,35",
                property_type_of_service=PropertyTypeOfService.SALE,
                property_city=city,
                property_district=district,
                property_building_max_floor=5,
                property_floor=4,
                property_bathroom_count=2,
                property_bathroom_type=PropertyBathroomType.SEPARATE,
                property_area=35,
                property_living_area=50,
                property_balcony=PropertyBalcony.YES,
                property_has_furniture=True,
                property_house_type=PropertyHouseType.BLOCK,
                property_has_parking=True,
                property_rental_condition=PropertyRentalCondition.FAMILY,
                property_prepayment=PropertyPrepayment.TWO_MONTHS,
                property_sleeping_places=1 + _ * 1,
                property_rooms_count=3,
            )
            for city in property_cities
            for district in property_districts
            for _ in range(2)
        ]

        with self.assertNumQueries(2):
            res = self.client.get(self.list_url, {"property_sleeping_places": 2})

            self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()

        self.assertEqual(len(res_json), len(property_set) // 2)

    def test_filter_property_rooms_count(self):
        user = UserFactory()
        property_cities = [
            PropertyCityFactory(name=name) for name in ["Tokyo", "Paris", "Istanbul", "London"]
        ]
        property_districts = [
            PropertyDistrictFactory(name=name, city=city)
            for name in ["1d", "2d", "3d", "4d"]
            for city in property_cities
        ]
        property_set = [
            PropertyAdvertisementFactory(
                owner=user,
                price=100_000 + _ * 50_000,
                category=CategoryChoices.PROPERTY.value,
                coordinates="35,35",
                property_type_of_service=PropertyTypeOfService.SALE,
                property_city=city,
                property_district=district,
                property_building_max_floor=5,
                property_floor=4,
                property_bathroom_count=2,
                property_bathroom_type=PropertyBathroomType.SEPARATE,
                property_area=35,
                property_living_area=50,
                property_balcony=PropertyBalcony.YES,
                property_has_furniture=True,
                property_house_type=PropertyHouseType.BLOCK,
                property_has_parking=True,
                property_rental_condition=PropertyRentalCondition.FAMILY,
                property_prepayment=PropertyPrepayment.TWO_MONTHS,
                property_sleeping_places=2,
                property_rooms_count=2 + _ * 1,
            )
            for city in property_cities
            for district in property_districts
            for _ in range(2)
        ]

        with self.assertNumQueries(2):
            res = self.client.get(self.list_url, {"property_rooms_count": 2})

            self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()

        self.assertEqual(len(res_json), len(property_set) // 2)

    def test_filter_property_rental_condition(self):
        user = UserFactory()
        property_cities = [
            PropertyCityFactory(name=name) for name in ["Tokyo", "Paris", "Istanbul", "London"]
        ]
        property_districts = [
            PropertyDistrictFactory(name=name, city=city)
            for name in ["1d", "2d", "3d", "4d"]
            for city in property_cities
        ]
        property_set = [
            PropertyAdvertisementFactory(
                owner=user,
                price=100_000 + _ * 50_000,
                category=CategoryChoices.PROPERTY.value,
                coordinates="35,35",
                property_type_of_service=PropertyTypeOfService.SALE,
                property_city=city,
                property_district=district,
                property_building_max_floor=5,
                property_floor=4,
                property_bathroom_count=2,
                property_bathroom_type=PropertyBathroomType.SEPARATE,
                property_area=35,
                property_living_area=50,
                property_balcony=PropertyBalcony.YES,
                property_has_furniture=True,
                property_house_type=PropertyHouseType.BLOCK,
                property_has_parking=True,
                property_rental_condition=[
                    PropertyRentalCondition.FAMILY,
                    PropertyRentalCondition.OFFICE,
                ][_ % 2],
                property_prepayment=PropertyPrepayment.TWO_MONTHS,
                property_sleeping_places=5,
                property_rooms_count=3,
            )
            for city in property_cities
            for district in property_districts
            for _ in range(2)
        ]

        with self.assertNumQueries(2):
            res = self.client.get(
                self.list_url,
                {"property_rental_condition": PropertyRentalCondition.FAMILY.value},
            )

            self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(len(res_json), len(property_set) // 2)

    def test_filter_property_area(self):
        user = UserFactory()
        property_cities = [
            PropertyCityFactory(name=name) for name in ["Tokyo", "Paris", "Istanbul", "London"]
        ]
        property_districts = [
            PropertyDistrictFactory(name=name, city=city)
            for name in ["1d", "2d", "3d", "4d"]
            for city in property_cities
        ]
        property_set = [
            PropertyAdvertisementFactory(
                owner=user,
                price=100_000 + _ * 50_000,
                category=CategoryChoices.PROPERTY.value,
                coordinates="35,35",
                property_type_of_service=PropertyTypeOfService.SALE,
                property_city=city,
                property_district=district,
                property_building_max_floor=5,
                property_floor=4,
                property_bathroom_count=2,
                property_bathroom_type=PropertyBathroomType.SEPARATE,
                property_area=_,
                property_living_area=50,
                property_balcony=PropertyBalcony.YES,
                property_has_furniture=True,
                property_house_type=PropertyHouseType.BLOCK,
                property_has_parking=True,
                property_rental_condition=[
                    PropertyRentalCondition.FAMILY,
                    PropertyRentalCondition.OFFICE,
                ][_ % 2],
                property_prepayment=PropertyPrepayment.TWO_MONTHS,
                property_sleeping_places=5,
                property_rooms_count=3,
            )
            for city in property_cities
            for district in property_districts
            for _ in range(58, 60)
        ]

        with self.assertNumQueries(2):
            res = self.client.get(
                self.list_url,
                {"property_area_min": 59, "property_area_max": 60},
            )

            self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(len(res_json), len(property_set) // 2)

    def test_property_has_furniture(self):
        user = UserFactory()
        property_cities = [
            PropertyCityFactory(name=name) for name in ["Tokyo", "Paris", "Istanbul", "London"]
        ]
        property_districts = [
            PropertyDistrictFactory(name=name, city=city)
            for name in ["1d", "2d", "3d", "4d"]
            for city in property_cities
        ]

        property_amenities = [
            PropertyAmenityFactory(name=name)
            for name in ["Heating", "Air Conditioning", "Kitchen", "TV"]
        ]
        property_set = [
            PropertyAdvertisementFactory(
                owner=user,
                price=100_000 + _ * 50_000,
                category=CategoryChoices.PROPERTY.value,
                coordinates="35,35",
                property_type_of_service=PropertyTypeOfService.SALE,
                property_city=city,
                property_district=district,
                property_building_max_floor=5,
                property_floor=4,
                property_bathroom_count=2,
                property_bathroom_type=PropertyBathroomType.SEPARATE,
                property_area=_,
                property_living_area=50,
                property_balcony=PropertyBalcony.YES,
                property_has_furniture=[True, False][_ % 2],
                property_house_type=PropertyHouseType.BLOCK,
                property_has_parking=True,
                property_rental_condition=PropertyRentalCondition.FAMILY,
                property_prepayment=PropertyPrepayment.TWO_MONTHS,
                property_sleeping_places=5,
                property_rooms_count=3,
            ).property_amenities.set(property_amenities)
            for city in property_cities
            for district in property_districts
            for _ in range(2)
        ]

        with self.assertNumQueries(2):
            res = self.client.get(self.list_url, {"property_has_furniture": True})

            self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(len(res_json), len(property_set) // 2)

    def test_property_property_amenities(self):
        user = UserFactory()
        property_cities = [
            PropertyCityFactory(name=name) for name in ["Tokyo", "Paris", "Istanbul", "London"]
        ]
        property_districts = [
            PropertyDistrictFactory(name=name, city=city)
            for name in ["1d", "2d", "3d", "4d"]
            for city in property_cities
        ]

        property_amenities = [
            PropertyAmenityFactory(name=name)
            for name in ["Heating", "Air Conditioning", "Kitchen", "TV"]
        ]
        property_set = [
            PropertyAdvertisementFactory(
                owner=user,
                price=100_000 + _ * 50_000,
                category=CategoryChoices.PROPERTY.value,
                coordinates="35,35",
                property_type_of_service=PropertyTypeOfService.SALE,
                property_city=district.city,
                property_district=district,
                property_building_max_floor=5,
                property_floor=4,
                property_bathroom_count=2,
                property_bathroom_type=PropertyBathroomType.SEPARATE,
                property_area=_,
                property_living_area=50,
                property_balcony=PropertyBalcony.YES,
                property_has_furniture=[True, False][_ % 2],
                property_house_type=PropertyHouseType.BLOCK,
                property_has_parking=True,
                property_rental_condition=PropertyRentalCondition.FAMILY,
                property_prepayment=PropertyPrepayment.TWO_MONTHS,
                property_sleeping_places=5,
                property_rooms_count=3,
            )
            for district in property_districts
            for _ in range(2)
        ]
        for property in property_set[:-1]:
            property.property_amenities.set(property_amenities[:-1])
        property_set[-1].property_amenities.set(property_amenities)

        with self.assertNumQueries(2):
            res = self.client.get(
                f"{self.list_url}?property_amenities={property_amenities[-2].slug},{property_amenities[-1].slug}"
            )

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(len(res_json), 1)
        self.assertEqual(res_json[0]["id"], property_set[-1].id)

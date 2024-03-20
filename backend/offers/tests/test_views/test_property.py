from functools import partial

from django.urls import reverse
from pytest import mark
from rest_framework import status
from rest_framework.test import APITestCase, APIClient

from common.utils import generate_image_file, encode_bytes_to_base64
from offers.constants import (
    CategoryChoices,
    PropertyTypeOfService,
    PropertyBathroomType,
    PropertyBalcony,
    PropertyHouseType,
    PropertyRentalCondition,
    PropertyPrepayment,
    PropertyType,
    PropertyRentDuration,
)
from offers.models import Advertisement
from users.tests.factories import UserFactory
from ..factories import (
    CountryFactory,
    RegionFactory,
    CityFactory,
    PropertyAmenityFactory,
    PropertyAdvertisementFactory,
    AdvertisementImageFactory,
)


class ApiClient(APIClient):
    pass


@mark.django_db
class PropertyTest(APITestCase):
    def setUp(self):
        self.list_url: str = reverse("advertisements-list")
        self.detail_url = partial(reverse, "advertisements-detail")

    def test_create_property(self):
        country = CountryFactory()
        region = RegionFactory(country=country)
        city = CityFactory(region=region)
        property_amenities = [PropertyAmenityFactory() for _ in range(10)]
        payload_images = [encode_bytes_to_base64(generate_image_file()) for _ in range(5)]
        payload = {
            "category": CategoryChoices.PROPERTY.value,
            "title": "test",
            "price": 10_000,
            "coordinates": "35, 35",
            "country": country.slug,
            "region": region.slug,
            "city": city.slug,
            "property_type": PropertyType.HOUSE,
            "property_type_of_service": PropertyTypeOfService.RENT,
            "property_building_max_floor": 15,
            "property_floor": 5,
            "property_bathroom_count": 1,
            "property_bathroom_type": PropertyBathroomType.COMBINED,
            "property_area": 45,
            "property_living_area": 30,
            "property_balcony": PropertyBalcony.YES,
            "property_has_furniture": True,
            "property_amenities": [amenity.slug for amenity in property_amenities[:5]],
            "property_house_type": PropertyHouseType.BLOCK,
            "property_has_parking": True,
            "property_rental_condition": PropertyRentalCondition.FAMILY,
            "property_prepayment": PropertyPrepayment.MONTH,
            "property_sleeping_places": 3,
            "property_rooms_count": 4,
            "property_commission": 500,
            "images": payload_images,
            "youtube": "https://youtu.be/jNQXAC9IVRw?si=7eaplvei50RcVeFR",
            "property_rent_duration": PropertyRentDuration.DAILY,
        }
        self.assertEqual(Advertisement.objects.count(), 0)
        user = UserFactory()
        self.client.force_login(
            user,
        )

        with self.assertNumQueries(12):
            res = self.client.post(self.list_url, data=payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Advertisement.objects.count(), 1)

        new_advertisement = Advertisement.objects.first()
        self.assertEqual(new_advertisement.owner, user)
        self.assertEqual(new_advertisement.country, country)
        self.assertEqual(new_advertisement.region, region)
        self.assertEqual(new_advertisement.city, city)
        self.assertEqual(new_advertisement.category, payload["category"])
        self.assertEqual(new_advertisement.title, payload["title"])
        self.assertEqual(new_advertisement.price, payload["price"])
        self.assertEqual(new_advertisement.coordinates, payload["coordinates"])
        self.assertEqual(new_advertisement.property_type, payload["property_type"])
        self.assertEqual(
            new_advertisement.property_type_of_service,
            payload["property_type_of_service"],
        )

        self.assertEqual(
            new_advertisement.property_building_max_floor,
            payload["property_building_max_floor"],
        )
        self.assertEqual(new_advertisement.property_floor, payload["property_floor"])
        self.assertEqual(
            new_advertisement.property_bathroom_count,
            payload["property_bathroom_count"],
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
            new_advertisement.property_rental_condition,
            payload["property_rental_condition"],
        )
        self.assertEqual(new_advertisement.property_prepayment, payload["property_prepayment"])
        self.assertEqual(
            new_advertisement.property_sleeping_places,
            payload["property_sleeping_places"],
        )
        self.assertEqual(new_advertisement.property_rooms_count, payload["property_rooms_count"])
        self.assertEqual(
            new_advertisement.property_amenities.count(),
            len(payload["property_amenities"]),
        )
        self.assertEqual(new_advertisement.property_commission, payload["property_commission"])
        self.assertEqual(new_advertisement.images.count(), len(payload_images))
        self.assertEqual(
            new_advertisement.youtube, "https://www.youtube.com/embed/jNQXAC9IVRw?controls=0"
        )
        self.assertEqual(
            new_advertisement.property_rent_duration, payload["property_rent_duration"]
        )

    def test_update_property(self):
        user = UserFactory()
        country = CountryFactory()
        region = RegionFactory(country=country)
        city = CityFactory(region=region)
        advertisement = PropertyAdvertisementFactory(
            owner=user,
            title="property",
            price=1500,
            coordinates="35,35",
            country=country,
            region=region,
            city=city,
            property_type=PropertyType.FLAT,
            property_type_of_service=PropertyTypeOfService.SALE,
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
            property_rent_duration=PropertyRentDuration.DAILY,
        )
        property_amenities = [PropertyAmenityFactory() for _ in range(10)]
        advertisement.property_amenities.set(property_amenities)
        advertisement_images = [
            AdvertisementImageFactory(advertisement=advertisement) for _ in range(5)
        ]

        new_country = CountryFactory(name="Vietnam")
        new_region = RegionFactory(country=country, name="V1")
        new_city = CityFactory(region=region, name="Hue")
        payload_images = [encode_bytes_to_base64(generate_image_file()) for _ in range(5)]
        payload = {
            "title": "test",
            "price": advertisement.price - 100,
            "coordinates": "38,35",
            "country": new_country.slug,
            "region": new_region.slug,
            "city": new_city.slug,
            "property_type": PropertyType.COMMERCIAL,
            "property_type_of_service": PropertyTypeOfService.RENT,
            "property_building_max_floor": 15,
            "property_floor": 5,
            "property_bathroom_count": 1,
            "property_bathroom_type": PropertyBathroomType.COMBINED,
            "property_area": 45,
            "property_living_area": 30,
            "property_balcony": PropertyBalcony.YES,
            "property_has_furniture": True,
            "property_amenities": [amenity.slug for amenity in property_amenities[:5]],
            "property_house_type": PropertyHouseType.BLOCK,
            "property_has_parking": True,
            "property_rental_condition": PropertyRentalCondition.FAMILY,
            "property_prepayment": PropertyPrepayment.MONTH,
            "property_commission": 1500,
            "property_sleeping_places": 3,
            "property_rooms_count": 4,
            "delete_images": [
                advertisement_image.id for advertisement_image in advertisement_images[3:]
            ],
            "upload_images": payload_images,
            "youtube": "https://youtu.be/VaLXzI92t9M?si=7eaplvei50RcVeFR",
            "property_rent_duration": PropertyRentDuration.PER_MONTHS,
        }

        self.assertEqual(Advertisement.objects.count(), 1)
        self.client.force_login(user)

        with self.assertNumQueries(15):
            res = self.client.put(
                self.detail_url(kwargs={"slug": advertisement.slug}), data=payload
            )

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Advertisement.objects.count(), 1)
        advertisement.refresh_from_db()

        self.assertEqual(advertisement.owner, user)
        self.assertEqual(advertisement.title, payload["title"])
        self.assertEqual(advertisement.price, payload["price"])
        self.assertEqual(advertisement.coordinates, payload["coordinates"])
        self.assertEqual(advertisement.country, new_country)
        self.assertEqual(advertisement.region, new_region)
        self.assertEqual(advertisement.city, new_city)
        self.assertEqual(advertisement.property_type, payload["property_type"])
        self.assertEqual(
            advertisement.property_type_of_service, payload["property_type_of_service"]
        )
        self.assertEqual(
            advertisement.property_building_max_floor,
            payload["property_building_max_floor"],
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
            advertisement.property_rental_condition,
            payload["property_rental_condition"],
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
        self.assertTrue(
            all(
                payload_am in [amenity.slug for amenity in advertisement.property_amenities.all()]
                for payload_am in payload["property_amenities"]
            )
        )
        self.assertEqual(advertisement.images.count(), len(payload_images) + 3)
        self.assertEqual(
            advertisement.youtube, "https://www.youtube.com/embed/VaLXzI92t9M?controls=0"
        )
        self.assertEqual(advertisement.property_rent_duration, payload["property_rent_duration"])
        new_images_ids = advertisement.images.values_list("id", flat=True)
        for image in advertisement_images[3:]:
            self.assertTrue(image.id not in new_images_ids)

    def test_delete_property(self):
        user = UserFactory()
        country = CountryFactory()
        region = RegionFactory(country=country)
        city = CityFactory(region=region)
        advertisement = PropertyAdvertisementFactory(
            owner=user, country=country, city=city, region=region
        )
        property_amenities = [PropertyAmenityFactory() for _ in range(10)]
        advertisement.property_amenities.set(property_amenities)
        [AdvertisementImageFactory(advertisement=advertisement) for _ in range(10)]

        self.assertEqual(Advertisement.objects.count(), 1)
        self.client.force_login(user)

        with self.assertNumQueries(7):
            res = self.client.delete(self.detail_url(kwargs={"slug": advertisement.slug}))

        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Advertisement.objects.count(), 0)

    def test_filter_property_type_of_service(self):
        user = UserFactory()
        country = CountryFactory()
        region = RegionFactory(country=country)
        city = CityFactory(region=region)
        property_set = [
            PropertyAdvertisementFactory(
                owner=user,
                country=country,
                region=region,
                city=city,
                price=100_000 + _ * 50_000,
                category=CategoryChoices.PROPERTY.value,
                coordinates="35,35",
                property_type_of_service=[
                    PropertyTypeOfService.SALE,
                    PropertyTypeOfService.RENT,
                ][_ % 2],
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
            for _ in range(2)
        ]

        with self.assertNumQueries(5):
            res = self.client.get(
                self.list_url,
                {"property_type_of_service": PropertyTypeOfService.SALE.value},
            )

            self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(res_json["count"], len(property_set) // 2)

    def test_filter_property_bathroom_type(self):
        user = UserFactory()
        country = CountryFactory()
        region = RegionFactory(country=country)
        city = CityFactory(region=region)

        property_set = [
            PropertyAdvertisementFactory(
                owner=user,
                country=country,
                region=region,
                city=city,
                price=100_000 + _ * 50_000,
                category=CategoryChoices.PROPERTY.value,
                coordinates="35,35",
                property_type_of_service=PropertyTypeOfService.SALE,
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
            for _ in range(2)
        ]

        with self.assertNumQueries(5):
            res = self.client.get(
                self.list_url,
                {"property_bathroom_type": PropertyBathroomType.COMBINED.value},
            )

            self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(res_json["count"], len(property_set) // 2)

        with self.assertNumQueries(5):
            res = self.client.get(
                self.list_url,
                {
                    "property_bathroom_type": f"{PropertyBathroomType.COMBINED.value},"
                    f"{PropertyBathroomType.SEPARATE.value}"
                },
            )

            self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(res_json["count"], len(property_set))

    def test_filter_property_bathroom_count(self):
        user = UserFactory()
        country = CountryFactory()
        region = RegionFactory(country=country)
        city = CityFactory(region=region)
        property_set = [
            PropertyAdvertisementFactory(
                owner=user,
                country=country,
                region=region,
                city=city,
                price=100_000 + _ * 50_000,
                category=CategoryChoices.PROPERTY.value,
                coordinates="35,35",
                property_type_of_service=PropertyTypeOfService.SALE,
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
            for _ in range(2)
        ]

        with self.assertNumQueries(5):
            res = self.client.get(self.list_url, {"property_bathroom_count": 2})

            self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()

        self.assertEqual(res_json["count"], len(property_set) // 2)

    def test_filter_property_house_type(self):
        user = UserFactory()
        country = CountryFactory()
        region = RegionFactory(country=country)
        city = CityFactory(region=region)

        property_set = [
            PropertyAdvertisementFactory(
                owner=user,
                country=country,
                region=region,
                city=city,
                price=100_000 + _ * 50_000,
                category=CategoryChoices.PROPERTY.value,
                coordinates="35,35",
                property_type_of_service=PropertyTypeOfService.SALE,
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
            for _ in range(2)
        ]

        with self.assertNumQueries(5):
            res = self.client.get(
                self.list_url,
                {"property_house_type": PropertyHouseType.BLOCK.value},
            )

            self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(res_json["count"], len(property_set) // 2)

        with self.assertNumQueries(5):
            res = self.client.get(
                self.list_url,
                {
                    "property_house_type": f"{PropertyHouseType.BLOCK.value},"
                    f"{PropertyHouseType.BRICK.value}"
                },
            )

            self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(res_json["count"], len(property_set))

    def test_filter_property_sleeping_places(self):
        user = UserFactory()
        country = CountryFactory()
        region = RegionFactory(country=country)
        city = CityFactory(region=region)
        property_set = [
            PropertyAdvertisementFactory(
                owner=user,
                country=country,
                region=region,
                city=city,
                price=100_000 + _ * 50_000,
                category=CategoryChoices.PROPERTY.value,
                coordinates="35,35",
                property_type_of_service=PropertyTypeOfService.SALE,
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
            for _ in range(2)
        ]

        with self.assertNumQueries(5):
            res = self.client.get(self.list_url, {"property_sleeping_places": 2})

            self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()

        self.assertEqual(res_json["count"], len(property_set) // 2)

    def test_filter_property_rooms_count(self):
        user = UserFactory()
        country = CountryFactory()
        region = RegionFactory(country=country)
        city = CityFactory(region=region)
        property_set = [
            PropertyAdvertisementFactory(
                owner=user,
                country=country,
                region=region,
                city=city,
                price=100_000 + _ * 50_000,
                category=CategoryChoices.PROPERTY.value,
                coordinates="35,35",
                property_type_of_service=PropertyTypeOfService.SALE,
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
            for _ in range(2)
        ]

        with self.assertNumQueries(5):
            res = self.client.get(self.list_url, {"property_rooms_count": 2})

            self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()

        self.assertEqual(res_json["count"], len(property_set) // 2)

    def test_filter_property_rental_condition(self):
        user = UserFactory()
        country = CountryFactory()
        region = RegionFactory(country=country)
        city = CityFactory(region=region)

        property_set = [
            PropertyAdvertisementFactory(
                owner=user,
                country=country,
                region=region,
                city=city,
                price=100_000 + _ * 50_000,
                category=CategoryChoices.PROPERTY.value,
                coordinates="35,35",
                property_type_of_service=PropertyTypeOfService.SALE,
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
            for _ in range(2)
        ]

        with self.assertNumQueries(5):
            res = self.client.get(
                self.list_url,
                {"property_rental_condition": PropertyRentalCondition.FAMILY.value},
            )

            self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(res_json["count"], len(property_set) // 2)

        with self.assertNumQueries(5):
            res = self.client.get(
                self.list_url,
                {
                    "property_rental_condition": f"{PropertyRentalCondition.FAMILY.value},"
                    f"{PropertyRentalCondition.OFFICE.value}"
                },
            )

            self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(res_json["count"], len(property_set))

    def test_filter_property_area(self):
        user = UserFactory()
        country = CountryFactory()
        region = RegionFactory(country=country)
        city = CityFactory(region=region)

        property_set = [
            PropertyAdvertisementFactory(
                owner=user,
                country=country,
                region=region,
                city=city,
                price=100_000 + _ * 50_000,
                category=CategoryChoices.PROPERTY.value,
                coordinates="35,35",
                property_type_of_service=PropertyTypeOfService.SALE,
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
            for _ in range(58, 60)
        ]

        with self.assertNumQueries(5):
            res = self.client.get(
                self.list_url,
                {"property_area_min": 59, "property_area_max": 60},
            )

            self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(res_json["count"], len(property_set) // 2)

    def test_property_has_furniture(self):
        user = UserFactory()
        country = CountryFactory()
        region = RegionFactory(country=country)
        city = CityFactory(region=region)

        property_amenities = [
            PropertyAmenityFactory(name=name)
            for name in ["Heating", "Air Conditioning", "Kitchen", "TV"]
        ]
        property_set = [
            PropertyAdvertisementFactory(
                owner=user,
                country=country,
                region=region,
                city=city,
                price=100_000 + _ * 50_000,
                category=CategoryChoices.PROPERTY.value,
                coordinates="35,35",
                property_type_of_service=PropertyTypeOfService.SALE,
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
            for _ in range(2)
        ]

        with self.assertNumQueries(5):
            res = self.client.get(self.list_url, {"property_has_furniture": True})

            self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(res_json["count"], len(property_set) // 2)

    def test_property_property_amenities(self):
        user = UserFactory()
        country = CountryFactory()
        region = RegionFactory(country=country)
        city = CityFactory(region=region)

        property_amenities = [
            PropertyAmenityFactory(name=name)
            for name in ["Heating", "Air Conditioning", "Kitchen", "TV"]
        ]
        property_set = [
            PropertyAdvertisementFactory(
                owner=user,
                country=country,
                region=region,
                city=city,
                price=100_000 + _ * 50_000,
                category=CategoryChoices.PROPERTY.value,
                coordinates="35,35",
                property_type_of_service=PropertyTypeOfService.SALE,
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
            for _ in range(2)
        ]
        for property in property_set[:-1]:
            property.property_amenities.set(property_amenities[:-1])
        property_set[-1].property_amenities.set(property_amenities)

        with self.assertNumQueries(5):
            res = self.client.get(
                f"{self.list_url}?property_amenities={property_amenities[-2].slug},{property_amenities[-1].slug}"
            )

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(res_json["count"], 1)
        self.assertEqual(res_json["results"][0]["id"], property_set[-1].id)

    def test_filter_property_type(self):
        user = UserFactory()
        country = CountryFactory()
        regions = [RegionFactory(country=country) for _ in range(2)]
        cities = [CityFactory(region=region) for region in regions]

        property_set = [
            PropertyAdvertisementFactory(
                owner=user,
                country=country,
                region=city.region,
                city=city,
                price=100_000 + _ * 50_000,
                category=CategoryChoices.PROPERTY.value,
                coordinates="35,35",
                property_type=[PropertyType.HOUSE, PropertyType.FLAT][_ % 2],
                property_type_of_service=PropertyTypeOfService.SALE,
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
            for city in cities
            for _ in range(2)
        ]

        with self.assertNumQueries(5):
            res = self.client.get(
                self.list_url,
                {"property_type": PropertyType.HOUSE.value},
            )

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(res_json["count"], len(property_set) // 2)

        with self.assertNumQueries(5):
            res = self.client.get(
                self.list_url,
                {"property_type": f"{PropertyType.HOUSE.value},{PropertyType.FLAT}"},
            )

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(res_json["count"], len(property_set))

    def test_filter_property_prepayment(self):
        user = UserFactory()
        country = CountryFactory()
        region = RegionFactory(country=country)
        city = CityFactory(region=region)

        property_set = [
            PropertyAdvertisementFactory(
                owner=user,
                country=country,
                region=region,
                city=city,
                price=100_000 + _ * 50_000,
                category=CategoryChoices.PROPERTY.value,
                coordinates="35,35",
                property_type_of_service=PropertyTypeOfService.SALE,
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
                property_prepayment=[PropertyPrepayment.TWO_MONTHS, PropertyPrepayment.WITHOUT][
                    _ % 2
                ],
                property_sleeping_places=5,
                property_rooms_count=3,
            )
            for _ in range(2)
        ]

        with self.assertNumQueries(5):
            res = self.client.get(
                self.list_url,
                {"property_prepayment": PropertyPrepayment.WITHOUT.value},
            )

            self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(res_json["count"], len(property_set) // 2)

        with self.assertNumQueries(5):
            res = self.client.get(
                self.list_url,
                {
                    "property_prepayment": f"{PropertyPrepayment.TWO_MONTHS.value},"
                    f"{PropertyPrepayment.WITHOUT.value}"
                },
            )

            self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(res_json["count"], len(property_set))

    def test_filter_property_balcony(self):
        user = UserFactory()
        country = CountryFactory()
        region = RegionFactory(country=country)
        city = CityFactory(region=region)

        property_set = [
            PropertyAdvertisementFactory(
                owner=user,
                country=country,
                region=region,
                city=city,
                price=100_000 + _ * 50_000,
                category=CategoryChoices.PROPERTY.value,
                coordinates="35,35",
                property_type_of_service=PropertyTypeOfService.SALE,
                property_building_max_floor=5,
                property_floor=4,
                property_bathroom_count=2,
                property_bathroom_type=PropertyBathroomType.SEPARATE,
                property_area=35,
                property_living_area=50,
                property_balcony=[PropertyBalcony.YES, PropertyBalcony.LOGGIA][_ % 2],
                property_has_furniture=True,
                property_house_type=PropertyHouseType.BLOCK,
                property_has_parking=True,
                property_rental_condition=PropertyRentalCondition.FAMILY,
                property_prepayment=PropertyPrepayment.TWO_MONTHS,
                property_sleeping_places=5,
                property_rooms_count=3,
            )
            for _ in range(2)
        ]

        with self.assertNumQueries(5):
            res = self.client.get(
                self.list_url,
                {"property_balcony": PropertyBalcony.YES.value},
            )

            self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(res_json["count"], len(property_set) // 2)

        with self.assertNumQueries(5):
            res = self.client.get(
                self.list_url,
                {
                    "property_balcony": f"{PropertyBalcony.YES.value},"
                    f"{PropertyBalcony.LOGGIA.value}"
                },
            )

            self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(res_json["count"], len(property_set))

    def test_filter_property_rent_duration(self):
        user = UserFactory()
        country = CountryFactory()
        region = RegionFactory(country=country)
        city = CityFactory(region=region)

        property_set = [
            PropertyAdvertisementFactory(
                owner=user,
                country=country,
                region=region,
                city=city,
                price=100_000,
                category=CategoryChoices.PROPERTY.value,
                coordinates="35,35",
                property_type_of_service=PropertyTypeOfService.SALE,
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
                property_rent_duration=[
                    PropertyRentDuration.DAILY,
                    PropertyRentDuration.PER_MONTHS,
                ][_ % 2],
            )
            for _ in range(2)
        ]

        with self.assertNumQueries(5):
            res = self.client.get(
                self.list_url,
                {"property_rent_duration": PropertyRentDuration.DAILY.value},
            )

            self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(res_json["count"], len(property_set) // 2)

        with self.assertNumQueries(5):
            res = self.client.get(
                self.list_url,
                {
                    "property_rent_duration": f"{PropertyRentDuration.PER_MONTHS.value},"
                    f"{PropertyRentDuration.DAILY.value}"
                },
            )

            self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(res_json["count"], len(property_set))

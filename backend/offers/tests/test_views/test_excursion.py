from functools import partial

from django.urls import reverse
from pytest import mark
from rest_framework import status
from rest_framework.test import APITestCase

from common.utils import generate_image_file
from offers.constants import CategoryChoices
from offers.models import Advertisement
from users.tests.factories import UserFactory
from ..factories import (
    ExcursionAdvertisementFactory,
    CountryFactory,
    RegionFactory,
    CityFactory,
    AdvertisementImageFactory,
)


@mark.django_db
class ExcursionTest(APITestCase):
    def setUp(self):
        self.list_url: str = reverse("advertisements-list")
        self.detail_url = partial(reverse, "advertisements-detail")

    def test_create_excursion(self):
        country = CountryFactory()
        region = RegionFactory(country=country)
        city = CityFactory(region=region)
        payload_images = [generate_image_file() for _ in range(5)]
        payload = {
            "category": CategoryChoices.EXCURSION.value,
            "country": country.slug,
            "region": region.slug,
            "city": city.slug,
            "title": "excursion",
            "price": 1_000,
            "excursion_food": True,
            "excursion_transfer": False,
            "images": payload_images,
        }

        self.assertEqual(Advertisement.objects.count(), 0)
        user = UserFactory()
        self.client.force_login(user)

        with self.assertNumQueries(8):
            res = self.client.post(self.list_url, data=payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Advertisement.objects.count(), 1)

        new_advertisement = Advertisement.objects.first()

        self.assertEqual(new_advertisement.owner, user)
        self.assertEqual(new_advertisement.category, payload["category"])
        self.assertEqual(new_advertisement.country.slug, payload["country"])
        self.assertEqual(new_advertisement.region.slug, payload["region"])
        self.assertEqual(new_advertisement.city.slug, payload["city"])
        self.assertEqual(new_advertisement.title, payload["title"])
        self.assertEqual(new_advertisement.price, payload["price"])
        self.assertEqual(new_advertisement.excursion_food, payload["excursion_food"])
        self.assertEqual(new_advertisement.excursion_transfer, payload["excursion_transfer"])
        self.assertEqual(new_advertisement.images.count(), len(payload_images))

    def test_update_excursion(self):
        user = UserFactory()
        country = CountryFactory()
        region = RegionFactory(country=country)
        city = CityFactory(region=region)
        advertisement = ExcursionAdvertisementFactory(
            owner=user, country=country, region=region, city=city
        )
        advertisement_images = [
            AdvertisementImageFactory(advertisement=advertisement) for _ in range(5)
        ]

        new_country = CountryFactory()
        new_region = RegionFactory(country=country)
        new_city = CityFactory(region=region)
        payload_images = [generate_image_file() for _ in range(5)]
        payload = {
            "title": "excursion_new",
            "country": new_country.slug,
            "region": new_region.slug,
            "city": new_city.slug,
            "price": 10_000,
            "excursion_food": True,
            "excursion_transfer": False,
            "delete_images": [
                advertisement_image.id for advertisement_image in advertisement_images[3:]
            ],
            "upload_images": payload_images,
        }

        self.assertEqual(Advertisement.objects.count(), 1)
        self.client.force_login(user)

        with self.assertNumQueries(13):
            res = self.client.put(
                self.detail_url(kwargs={"slug": advertisement.slug}), data=payload
            )

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Advertisement.objects.count(), 1)
        advertisement.refresh_from_db()

        self.assertEqual(advertisement.owner, user)
        self.assertEqual(advertisement.country.slug, payload["country"])
        self.assertEqual(advertisement.region.slug, payload["region"])
        self.assertEqual(advertisement.city.slug, payload["city"])
        self.assertEqual(advertisement.title, payload["title"])
        self.assertEqual(advertisement.price, payload["price"])
        self.assertEqual(advertisement.excursion_food, payload["excursion_food"])
        self.assertEqual(advertisement.excursion_transfer, payload["excursion_transfer"])
        self.assertEqual(advertisement.images.count(), len(payload_images) + 3)
        new_images_ids = advertisement.images.values_list("id", flat=True)
        for image in advertisement_images[3:]:
            self.assertTrue(image.id not in new_images_ids)

    def test_delete_excursion(self):
        user = UserFactory()

        advertisement = ExcursionAdvertisementFactory(owner=user)

        self.assertEqual(Advertisement.objects.count(), 1)
        self.client.force_login(user)

        with self.assertNumQueries(6):
            res = self.client.delete(self.detail_url(kwargs={"slug": advertisement.slug}))

        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Advertisement.objects.count(), 0)

    def test_excursion_food_filter(self):
        user = UserFactory()
        excursion_set = [
            ExcursionAdvertisementFactory(
                owner=user,
                category=CategoryChoices.EXCURSION.value,
                title="excursion",
                price=1_000,
                excursion_food=[True, False][_ % 2],
                excursion_transfer=False,
            )
            for _ in range(2)
        ]

        with self.assertNumQueries(4):
            res = self.client.get(self.list_url, {"excursion_food": True})

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(res_json["count"], len(excursion_set) // 2)

    def test_excursion_transfer_filter(self):
        user = UserFactory()
        excursion_set = [
            ExcursionAdvertisementFactory(
                owner=user,
                category=CategoryChoices.EXCURSION.value,
                title="excursion",
                price=1_000,
                excursion_food=False,
                excursion_transfer=[True, False][_ % 2],
            )
            for _ in range(2)
        ]

        with self.assertNumQueries(4):
            res = self.client.get(self.list_url, {"excursion_transfer": True})

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(res_json["count"], len(excursion_set) // 2)

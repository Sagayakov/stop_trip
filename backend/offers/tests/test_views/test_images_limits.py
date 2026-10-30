from functools import partial
from io import BytesIO

from django.urls import reverse
from PIL import Image
from pytest import mark
from rest_framework import status
from rest_framework.test import APITestCase

from common.utils import encode_bytes_to_base64, generate_image_file
from offers.constants import CategoryChoices, TaxiType, TaxiUnit
from offers.models import Advertisement, AdvertisementImage
from users.tests.factories import UserFactory
from ..factories import (
    AdvertisementImageFactory,
    CityFactory,
    CountryFactory,
    RegionFactory,
    TaxiAdvertisementFactory,
)


def big_image_base64(size_mb: float) -> str:
    """Фото с «шумом», которое плохо сжимается и весит больше size_mb."""

    import os

    side = int((size_mb * 1024 * 1024 / 3) ** 0.5) + 200
    image = Image.frombytes("RGB", (side, side), os.urandom(side * side * 3))
    file = BytesIO()
    image.save(file, "BMP")
    file.seek(0)
    return encode_bytes_to_base64(file)


@mark.django_db
class ImageLimitsTest(APITestCase):
    def setUp(self):
        self.list_url = reverse("advertisements-list")
        self.detail_url = partial(reverse, "advertisements-detail")

    def _taxi_payload(self, images):
        country = CountryFactory()
        region = RegionFactory(country=country)
        city = CityFactory(region=region)
        return {
            "category": CategoryChoices.TAXI.value,
            "country": country.slug,
            "region": region.slug,
            "city": city.slug,
            "title": "Такси в Нячанге",
            "price": 100_000,
            "taxi_unit": TaxiUnit.KM.value,
            "taxi_type": TaxiType.ECONOMY.value,
            "images": images,
        }

    def test_create_with_more_than_10_images_rejected(self):
        self.client.force_login(UserFactory())
        images = [encode_bytes_to_base64(generate_image_file()) for _ in range(11)]

        res = self.client.post(self.list_url, data=self._taxi_payload(images))

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("images", res.json())
        self.assertEqual(Advertisement.objects.count(), 0)

    def test_create_with_10_images_ok(self):
        self.client.force_login(UserFactory())
        images = [encode_bytes_to_base64(generate_image_file()) for _ in range(10)]

        res = self.client.post(self.list_url, data=self._taxi_payload(images))

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(AdvertisementImage.objects.count(), 10)

    def test_image_bigger_than_2mb_rejected(self):
        self.client.force_login(UserFactory())

        res = self.client.post(self.list_url, data=self._taxi_payload([big_image_base64(2.5)]))

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("images", res.json())
        self.assertEqual(Advertisement.objects.count(), 0)

    def test_update_cannot_exceed_10_images(self):
        user = UserFactory()
        advertisement = TaxiAdvertisementFactory(owner=user)
        for _ in range(8):
            AdvertisementImageFactory(advertisement=advertisement)
        self.client.force_login(user)

        payload = {"upload_images": [encode_bytes_to_base64(generate_image_file()) for _ in range(3)]}
        res = self.client.put(self.detail_url(kwargs={"slug": advertisement.slug}), data=payload)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(AdvertisementImage.objects.filter(advertisement=advertisement).count(), 8)

    def test_update_replacing_images_within_limit_ok(self):
        user = UserFactory()
        advertisement = TaxiAdvertisementFactory(owner=user)
        old_images = [AdvertisementImageFactory(advertisement=advertisement) for _ in range(9)]
        self.client.force_login(user)

        payload = {
            "upload_images": [encode_bytes_to_base64(generate_image_file()) for _ in range(3)],
            "delete_images": [image.id for image in old_images[:2]],
        }
        res = self.client.put(self.detail_url(kwargs={"slug": advertisement.slug}), data=payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(AdvertisementImage.objects.filter(advertisement=advertisement).count(), 10)

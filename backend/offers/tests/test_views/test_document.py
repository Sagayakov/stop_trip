from functools import partial

from django.urls import reverse
from pytest import mark
from rest_framework import status
from rest_framework.test import APITestCase

from common.utils import generate_image_file, encode_bytes_to_base64
from offers.constants import (
    CategoryChoices,
    DocumentType,
    DocumentDuration,
)
from offers.models import Advertisement
from users.tests.factories import UserFactory
from ..factories import (
    DocumentAdvertisementFactory,
    CountryFactory,
    RegionFactory,
    CityFactory,
    AdvertisementImageFactory,
)


@mark.django_db
class DocumentTest(APITestCase):
    def setUp(self):
        self.list_url: str = reverse("advertisements-list")
        self.detail_url = partial(reverse, "advertisements-detail")

    def test_create_document(self):
        country = CountryFactory()
        region = RegionFactory(country=country)
        city = CityFactory(region=region)
        payload_images = [encode_bytes_to_base64(generate_image_file()) for _ in range(5)]
        payload = {
            "category": CategoryChoices.DOCUMENT.value,
            "country": country.slug,
            "region": region.slug,
            "city": city.slug,
            "title": "document",
            "price": 1_000,
            "document_type": DocumentType.C_FORM,
            "document_duration": DocumentDuration.QUARTER,
            "images": payload_images,
            "youtube": "https://youtu.be/jNQXAC9IVRw?si=7eaplvei50RcVeFR",
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
        self.assertEqual(new_advertisement.country, country)
        self.assertEqual(new_advertisement.region, region)
        self.assertEqual(new_advertisement.city, city)
        self.assertEqual(new_advertisement.title, payload["title"])
        self.assertEqual(new_advertisement.price, payload["price"])
        self.assertEqual(new_advertisement.document_type, payload["document_type"])
        self.assertEqual(new_advertisement.document_duration, payload["document_duration"])
        self.assertEqual(new_advertisement.images.count(), len(payload_images))
        self.assertEqual(
            new_advertisement.youtube, "https://www.youtube.com/embed/jNQXAC9IVRw?controls=0"
        )

    def test_update_document(self):
        user = UserFactory()
        country = CountryFactory()
        region = RegionFactory(country=country)
        city = CityFactory(region=region)
        advertisement = DocumentAdvertisementFactory(
            owner=user, country=country, region=region, city=city
        )
        advertisement_images = [
            AdvertisementImageFactory(advertisement=advertisement) for _ in range(5)
        ]

        new_country = CountryFactory()
        new_region = RegionFactory(country=country)
        new_city = CityFactory(region=region)
        payload_images = [encode_bytes_to_base64(generate_image_file()) for _ in range(5)]
        payload = {
            "country": new_country.slug,
            "region": new_region.slug,
            "city": new_city.slug,
            "title": "document_new",
            "price": 10_000,
            "document_type": DocumentType.C_FORM,
            "document_duration": DocumentDuration.QUARTER,
            "delete_images": [
                advertisement_image.id for advertisement_image in advertisement_images[3:]
            ],
            "upload_images": payload_images,
            "youtube": "https://youtu.be/VaLXzI92t9M?si=7eaplvei50RcVeFR",
        }

        self.assertEqual(Advertisement.objects.count(), 1)
        self.client.force_login(user)

        with self.assertNumQueries(12):
            res = self.client.put(
                self.detail_url(kwargs={"slug": advertisement.slug}), data=payload
            )

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Advertisement.objects.count(), 1)
        advertisement.refresh_from_db()

        self.assertEqual(advertisement.owner, user)
        self.assertEqual(advertisement.country, new_country)
        self.assertEqual(advertisement.region, new_region)
        self.assertEqual(advertisement.city, new_city)
        self.assertEqual(advertisement.title, payload["title"])
        self.assertEqual(advertisement.price, payload["price"])
        self.assertEqual(advertisement.document_type, payload["document_type"])
        self.assertEqual(advertisement.document_duration, payload["document_duration"])
        self.assertEqual(advertisement.images.count(), len(payload_images) + 3)
        self.assertEqual(
            advertisement.youtube, "https://www.youtube.com/embed/VaLXzI92t9M?controls=0"
        )
        new_images_ids = advertisement.images.values_list("id", flat=True)
        for image in advertisement_images[3:]:
            self.assertTrue(image.id not in new_images_ids)

    def test_delete_document(self):
        user = UserFactory()

        advertisement = DocumentAdvertisementFactory(owner=user)

        self.assertEqual(Advertisement.objects.count(), 1)
        self.client.force_login(user)

        with self.assertNumQueries(8):
            res = self.client.delete(self.detail_url(kwargs={"slug": advertisement.slug}))

        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Advertisement.objects.count(), 0)

    def test_document_type_filter(self):
        user = UserFactory()
        document_set = [
            DocumentAdvertisementFactory(
                owner=user,
                category=CategoryChoices.TRANSPORT.value,
                price=100_000 + _ * 50_000,
                document_type=[DocumentType.C_FORM, DocumentType.OTHER_DOCUMENT][_ % 2],
                document_duration=DocumentDuration.QUARTER,
            )
            for _ in range(2)
        ]

        with self.assertNumQueries(5):
            res = self.client.get(
                self.list_url,
                {"document_type": DocumentType.C_FORM.value},
            )

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(res_json["count"], len(document_set) // 2)

        with self.assertNumQueries(5):
            res = self.client.get(
                self.list_url,
                {
                    "document_type": f"{DocumentType.C_FORM.value},{DocumentType.OTHER_DOCUMENT.value}"
                },
            )

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(res_json["count"], len(document_set))

    def test_document_duration_filter(self):
        user = UserFactory()
        document_set = [
            DocumentAdvertisementFactory(
                owner=user,
                category=CategoryChoices.TRANSPORT.value,
                price=100_000 + _ * 50_000,
                document_type=DocumentType.C_FORM,
                document_duration=[
                    DocumentDuration.QUARTER,
                    DocumentDuration.OTHER,
                ][_ % 2],
            )
            for _ in range(2)
        ]

        with self.assertNumQueries(5):
            res = self.client.get(
                self.list_url,
                {"document_duration": DocumentDuration.QUARTER.value},
            )

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(res_json["count"], len(document_set) // 2)

        with self.assertNumQueries(5):
            res = self.client.get(
                self.list_url,
                {
                    "document_duration": f"{DocumentDuration.QUARTER.value},{DocumentDuration.OTHER.value}"
                },
            )
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(res_json["count"], len(document_set))

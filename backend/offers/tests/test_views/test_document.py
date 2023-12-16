from functools import partial

from django.urls import reverse
from pytest import mark
from rest_framework import status
from rest_framework.test import APITestCase

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
        payload = {
            "category": CategoryChoices.DOCUMENT.value,
            "country": country.id,
            "region": region.id,
            "city": city.id,
            "title": "document",
            "price": 1_000,
            "document_type": DocumentType.C_FORM,
            "document_duration": DocumentDuration.QUARTER,
        }

        self.assertEqual(Advertisement.objects.count(), 0)
        user = UserFactory()
        self.client.force_login(user)

        with self.assertNumQueries(6):
            res = self.client.post(self.list_url, data=payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Advertisement.objects.count(), 1)

        new_advertisement = Advertisement.objects.first()

        self.assertEqual(new_advertisement.owner, user)
        self.assertEqual(new_advertisement.category, payload["category"])
        self.assertEqual(new_advertisement.title, payload["title"])
        self.assertEqual(new_advertisement.price, payload["price"])
        self.assertEqual(new_advertisement.document_type, payload["document_type"])
        self.assertEqual(
            new_advertisement.document_duration, payload["document_duration"]
        )

    def test_update_document(self):
        user = UserFactory()
        country = CountryFactory()
        region = RegionFactory(country=country)
        city = CityFactory(region=region)
        advertisement = DocumentAdvertisementFactory(
            owner=user, country=country, region=region, city=city
        )
        new_country = CountryFactory()
        new_region = RegionFactory(country=country)
        new_city = CityFactory(region=region)
        payload = {
            "category": CategoryChoices.DOCUMENT.value,
            "country": new_country.id,
            "region": new_region.id,
            "city": new_city.id,
            "title": "document_new",
            "price": 10_000,
            "document_type": DocumentType.C_FORM,
            "document_duration": DocumentDuration.QUARTER,
        }

        self.assertEqual(Advertisement.objects.count(), 1)
        self.client.force_login(user)

        with self.assertNumQueries(9):
            res = self.client.put(
                self.detail_url(kwargs={"pk": advertisement.id}), data=payload
            )

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Advertisement.objects.count(), 1)
        advertisement.refresh_from_db()

        self.assertEqual(advertisement.owner, user)
        self.assertEqual(advertisement.country, new_country)
        self.assertEqual(advertisement.region, new_region)
        self.assertEqual(advertisement.city, new_city)
        self.assertEqual(advertisement.category, payload["category"])
        self.assertEqual(advertisement.title, payload["title"])
        self.assertEqual(advertisement.price, payload["price"])
        self.assertEqual(advertisement.document_type, payload["document_type"])
        self.assertEqual(advertisement.document_duration, payload["document_duration"])

    def test_delete_document(self):
        user = UserFactory()

        advertisement = DocumentAdvertisementFactory(owner=user)

        self.assertEqual(Advertisement.objects.count(), 1)
        self.client.force_login(user)

        with self.assertNumQueries(5):
            res = self.client.delete(self.detail_url(kwargs={"pk": advertisement.id}))

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

        with self.assertNumQueries(2):
            res = self.client.get(
                self.list_url,
                {"document_type": DocumentType.C_FORM.value},
            )

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(len(res_json), len(document_set) // 2)

    def test_document_duration_filter(self):
        user = UserFactory()
        document_set = [
            DocumentAdvertisementFactory(
                owner=user,
                category=CategoryChoices.TRANSPORT.value,
                price=100_000 + _ * 50_000,
                document_type=DocumentType.C_FORM,
                document_duration=[DocumentDuration.QUARTER, DocumentDuration.OTHER][
                    _ % 2
                ],
            )
            for _ in range(2)
        ]

        with self.assertNumQueries(2):
            res = self.client.get(
                self.list_url,
                {"document_duration": DocumentDuration.QUARTER.value},
            )

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(len(res_json), len(document_set) // 2)

from functools import partial

from django.urls import reverse
from pytest import mark
from rest_framework import status
from rest_framework.test import APITestCase

from offers.constants import CategoryChoices
from offers.models import Advertisement
from users.tests.factories import UserFactory
from ..factories import ExcursionAdvertisementFactory


@mark.django_db
class ExcursionTest(APITestCase):
    def setUp(self):
        self.list_url: str = reverse("advertisements-list")
        self.detail_url = partial(reverse, "advertisements-detail")

    def test_create_excursion(self):
        payload = {
            "category": CategoryChoices.EXCURSION.value,
            "title": "excursion",
            "price": 1_000,
            "excursion_food": True,
            "excursion_transfer": False,
        }

        self.assertEqual(Advertisement.objects.count(), 0)
        user = UserFactory()
        self.client.force_login(user)

        with self.assertNumQueries(4):
            res = self.client.post(self.list_url, data=payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Advertisement.objects.count(), 1)

        new_advertisement = Advertisement.objects.first()

        self.assertEqual(new_advertisement.owner, user)
        self.assertEqual(new_advertisement.category, payload["category"])
        self.assertEqual(new_advertisement.title, payload["title"])
        self.assertEqual(new_advertisement.price, payload["price"])
        self.assertEqual(new_advertisement.excursion_food, payload["excursion_food"])
        self.assertEqual(new_advertisement.excursion_transfer, payload["excursion_transfer"])

    def test_update_excursion(self):
        user = UserFactory()
        advertisement = ExcursionAdvertisementFactory(owner=user)
        payload = {
            "category": CategoryChoices.DOCUMENT.value,
            "title": "excursion_new",
            "price": 10_000,
            "excursion_food": True,
            "excursion_transfer": False,
        }

        self.assertEqual(Advertisement.objects.count(), 1)
        self.client.force_login(user)

        with self.assertNumQueries(6):
            res = self.client.put(self.detail_url(kwargs={"pk": advertisement.id}), data=payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Advertisement.objects.count(), 1)
        advertisement.refresh_from_db()

        self.assertEqual(advertisement.owner, user)
        self.assertEqual(advertisement.category, payload["category"])
        self.assertEqual(advertisement.title, payload["title"])
        self.assertEqual(advertisement.price, payload["price"])
        self.assertEqual(advertisement.excursion_food, payload["excursion_food"])
        self.assertEqual(advertisement.excursion_transfer, payload["excursion_transfer"])

    def test_delete_excursion(self):
        user = UserFactory()

        advertisement = ExcursionAdvertisementFactory(owner=user)

        self.assertEqual(Advertisement.objects.count(), 1)
        self.client.force_login(user)

        with self.assertNumQueries(5):
            res = self.client.delete(self.detail_url(kwargs={"pk": advertisement.id}))

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

        with self.assertNumQueries(3):
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

        with self.assertNumQueries(3):
            res = self.client.get(self.list_url, {"excursion_transfer": True})

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(res_json["count"], len(excursion_set) // 2)

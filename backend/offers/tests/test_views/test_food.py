from functools import partial

from django.urls import reverse
from pytest import mark
from rest_framework import status
from rest_framework.test import APITestCase

from offers.constants import CategoryChoices, FoodType
from offers.models import Advertisement
from users.tests.factories import UserFactory
from ..factories import DocumentAdvertisementFactory, FoodAdvertisementFactory


@mark.django_db
class FoodTest(APITestCase):
    def setUp(self):
        self.list_url: str = reverse("advertisements-list")
        self.detail_url = partial(reverse, "advertisements-detail")

    def test_create_food(self):
        payload = {
            "category": CategoryChoices.FOOD.value,
            "title": "food",
            "price": 1_000,
            "food_delivery": True,
            "food_establishment": True,
            "food_type": FoodType.READY_FOOD,
        }

        self.assertEqual(Advertisement.objects.count(), 0)
        user = UserFactory()
        self.client.force_login(user)

        with self.assertNumQueries(3):
            res = self.client.post(self.list_url, data=payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Advertisement.objects.count(), 1)

        new_advertisement = Advertisement.objects.first()

        self.assertEqual(new_advertisement.owner, user)
        self.assertEqual(new_advertisement.category, payload["category"])
        self.assertEqual(new_advertisement.title, payload["title"])
        self.assertEqual(new_advertisement.price, payload["price"])
        self.assertEqual(new_advertisement.food_delivery, payload["food_delivery"])
        self.assertEqual(new_advertisement.food_establishment, payload["food_establishment"])
        self.assertEqual(new_advertisement.food_type, payload["food_type"])

    def test_update_food(self):
        user = UserFactory()
        advertisement = DocumentAdvertisementFactory(owner=user)
        payload = {
            "category": CategoryChoices.FOOD.value,
            "title": "food",
            "price": 1_000,
            "food_delivery": True,
            "food_establishment": True,
            "food_type": FoodType.READY_FOOD,
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
        self.assertEqual(advertisement.food_delivery, payload["food_delivery"])
        self.assertEqual(advertisement.food_establishment, payload["food_establishment"])
        self.assertEqual(advertisement.food_type, payload["food_type"])

    def test_delete_food(self):
        user = UserFactory()

        advertisement = FoodAdvertisementFactory(owner=user)

        self.assertEqual(Advertisement.objects.count(), 1)
        self.client.force_login(user)

        with self.assertNumQueries(5):
            res = self.client.delete(self.detail_url(kwargs={"pk": advertisement.id}))

        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Advertisement.objects.count(), 0)

    def test_filter_food_delivery(self):
        user = UserFactory()
        food_set = [
            FoodAdvertisementFactory(
                owner=user,
                category=CategoryChoices.TRANSPORT.value,
                price=100_000 + _ * 50_000,
                food_delivery=[True, False][_ % 2],
                food_establishment=False,
                food_type=FoodType.READY_FOOD,
            )
            for _ in range(2)
        ]
        with self.assertNumQueries(3):
            res = self.client.get(
                self.list_url,
                {"food_delivery": True},
            )

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(res_json["count"], len(food_set) // 2)

    def test_filter_food_establishment(self):
        user = UserFactory()
        food_set = [
            FoodAdvertisementFactory(
                owner=user,
                category=CategoryChoices.TRANSPORT.value,
                price=100_000 + _ * 50_000,
                food_delivery=True,
                food_establishment=[True, False][_ % 2],
                food_type=FoodType.READY_FOOD,
            )
            for _ in range(2)
        ]
        with self.assertNumQueries(3):
            res = self.client.get(
                self.list_url,
                {"food_establishment": True},
            )

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(res_json["count"], len(food_set) // 2)

    def test_filter_food_type(self):
        user = UserFactory()
        food_set = [
            FoodAdvertisementFactory(
                owner=user,
                category=CategoryChoices.TRANSPORT.value,
                price=100_000 + _ * 50_000,
                food_delivery=True,
                food_establishment=False,
                food_type=[FoodType.READY_FOOD, FoodType.NON_VEG_FOOD][_ % 2],
            )
            for _ in range(2)
        ]
        with self.assertNumQueries(3):
            res = self.client.get(
                self.list_url,
                {"food_type": FoodType.READY_FOOD.value},
            )

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(res_json["count"], len(food_set) // 2)

        with self.assertNumQueries(3):
            res = self.client.get(
                self.list_url,
                {"food_type": f"{FoodType.READY_FOOD.value},{FoodType.NON_VEG_FOOD.value}"},
            )

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(res_json["count"], len(food_set))

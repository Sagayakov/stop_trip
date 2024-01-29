from pytest import mark
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status

from favorites.favorites import Favorite
from offers.constants import (
    CategoryChoices,
)
from offers.tests.factories import BaseAdvertisementFactory
from users.tests.factories import UserFactory


@mark.django_db
class FavoriteAPIViewTest(APITestCase):
    def setUp(self):
        self.list_url = reverse("favorites-list")
        self.clear_url = reverse("favorites-clear-favorite")
        self.delete_url = reverse("favorites-delete-favorite")

    def test_create_favorites(self):
        user = UserFactory()
        advertisement = BaseAdvertisementFactory(
            owner=user,
            category=CategoryChoices.TAXI,
            title="TAXI",
            price=10_000,
        )

        self.client.force_login(user)
        with self.assertNumQueries(2):
            res = self.client.post(self.list_url, data={"id": advertisement.id})

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)

    def test_delete_favorite(self):
        user = UserFactory()
        advertisement = BaseAdvertisementFactory(
            owner=user,
            category=CategoryChoices.TAXI,
            title="TAXI",
            price=10_000,
        )

        # Добавление в избранное
        self.client.post(self.list_url, data={"id": advertisement.id})

        # Удаление из избранного
        with self.assertNumQueries(1):
            res = self.client.post(self.delete_url, data={"id": advertisement.id})

        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)

        # Проверка, что удалилось
        res = self.client.get(self.list_url)
        self.assertEqual(len(res.json()), 0)

    def test_clear_favorite(self):
        user = UserFactory()
        advertisements = [
            BaseAdvertisementFactory(
                owner=user,
                category=CategoryChoices.TAXI,
                title="TAXI",
                price=10_000,
            )
            for _ in range(3)
        ]
        favorites = Favorite(self.client.session)
        for advertisement in advertisements:
            self.client.post(self.list_url, data={"id": advertisement.id})

        with self.assertNumQueries(0):
            res = self.client.post(self.clear_url)

        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
        self.assertCountEqual(favorites.keys, [])

        # Проверка, что удалилось
        res = self.client.get(self.list_url)
        self.assertEqual(len(res.json()), 0)

    def test_list_favorites(self):
        user = UserFactory()
        advertisements = [
            BaseAdvertisementFactory(
                owner=user,
                category=CategoryChoices.TAXI,
                title="TAXI",
                price=10_000,
            )
            for _ in range(5)
        ]

        for _ in advertisements:
            self.client.post(self.list_url, data={"id": _.id})

        with self.assertNumQueries(0):
            res = self.client.get(self.list_url)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        for _ in advertisements:
            self.assertIn(_.id, res.json())

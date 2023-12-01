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

        favorites = Favorite(self.client.session)
        favorites.add(advertisement.id)

        self.client.force_login(user)
        with self.assertNumQueries(2):
            res = self.client.post(self.delete_url, data={"id": advertisement.id})

        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)

    def test_clear_favorite(self):
        user = UserFactory()
        advertisement = [
            BaseAdvertisementFactory(
                owner=user,
                category=CategoryChoices.TAXI,
                title="TAXI",
                price=10_000,
            )
            for _ in range(3)
        ]
        favorites = Favorite(self.client.session)
        for advert in advertisement:
            favorites.add(advert.id)

        self.client.force_login(user)
        with self.assertNumQueries(1):
            res = self.client.post(self.clear_url, favorites.clear())

        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
        self.assertCountEqual(favorites.keys, [])

    def test_list_favorites(self):
        user = UserFactory()
        advertisement = BaseAdvertisementFactory(
            owner=user,
            category=CategoryChoices.TAXI,
            title="TAXI",
            price=10_000,
        )
        self.client.force_login(user)
        favorites = Favorite(self.client.session)
        favorites.add(advertisement.id)

        with self.assertNumQueries(1):
            res = self.client.get(self.list_url)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertIn(advertisement.id, favorites.keys)

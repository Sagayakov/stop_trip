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
        self.url = reverse("favorites-list")

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
            res = self.client.post(self.url, data={"id": advertisement.id})

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
            res = self.client.post(
                reverse("favorites-delete-favorite"), data={"id": advertisement.id}
            )

        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)

    def test_clear_favorite(self):
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
        with self.assertNumQueries(1):
            res = self.client.post(reverse("favorites-clear-favorite"))

        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)

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
            res = self.client.get(self.url)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertIn(advertisement.id, favorites.keys)

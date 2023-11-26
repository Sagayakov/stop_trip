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
        favorite = Favorite(self.client.session)
        advertisement = BaseAdvertisementFactory(
            owner=user,
            category=CategoryChoices.TAXI,
            title="TAXI",
            price=10_000,
        )
        self.client.force_login(user)
        with self.assertNumQueries(1):
            res = self.client.post(self.url, data=favorite.add(advertisement.id))

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertIn(advertisement.id, favorite.keys())

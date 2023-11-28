from pytest import mark
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status

from favorites.favorites import Favorite
from favorites.serializers import FavoriteAdvertisementCreateSerializer
from offers.constants import (
    CategoryChoices,
)
from offers.tests.factories import BaseAdvertisementFactory
from users.tests.factories import UserFactory


@mark.django_db
class FavoriteAPIViewTest(APITestCase):
    def setUp(self):
        self.url = reverse("favorites-list")
        self.favorite = Favorite(self.client.session)

    def test_create_favorites(self):
        user = UserFactory()
        advertisement = BaseAdvertisementFactory(
            owner=user,
            category=CategoryChoices.TAXI,
            title="TAXI",
            price=10_000,
        )
        serializer = FavoriteAdvertisementCreateSerializer(advertisement)
        self.client.force_login(user)
        with self.assertNumQueries(2):
            res = self.client.post(self.url, data=serializer.data)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)

from pytest import mark
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status


from favorites.models import LikeModel
from offers.tests.factories import TaxiAdvertisementFactory
from users.tests.factories import UserFactory


@mark.django_db
class FavoriteAPIViewTest(APITestCase):
    def setUp(self):
        self.list_url: str = reverse("favorites-list")
        self.all_favorites_url: str = reverse("favorites-my-favorites")

    def test_create_like(self):
        user = UserFactory()
        me = UserFactory()
        advertisement = TaxiAdvertisementFactory(owner=user)
        self.client.force_login(me)
        self.assertEqual(LikeModel.objects.count(), 0)

        with self.assertNumQueries(5):
            res = self.client.post(self.list_url, data={"advertisement": advertisement.slug})

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(LikeModel.objects.count(), 1)

        like = LikeModel.objects.first()
        self.assertEqual(like.owner, me)
        self.assertEqual(like.advertisement, advertisement)

    def test_delete_like(self):
        user = UserFactory()
        me = UserFactory()
        advertisement = TaxiAdvertisementFactory(owner=user)
        self.client.force_login(me)
        self.assertEqual(LikeModel.objects.count(), 0)

        with self.assertNumQueries(5):
            res = self.client.post(self.list_url, data={"advertisement": advertisement.slug})

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(LikeModel.objects.count(), 1)

        with self.assertNumQueries(4):
            res = self.client.post(self.list_url, data={"advertisement": advertisement.slug})

        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(LikeModel.objects.count(), 0)

    def test_my_likes(self):
        user = UserFactory()
        me = UserFactory()
        advertisement = [TaxiAdvertisementFactory(owner=user) for _ in range(5)]
        self.client.force_login(me)
        self.assertEqual(LikeModel.objects.count(), 0)

        likes = [
            self.client.post(self.list_url, data={"advertisement": advertisement[i].slug})
            for i in range(5)
        ]

        self.assertEqual(LikeModel.objects.count(), 5)

        with self.assertNumQueries(5):
            res = self.client.get(self.all_favorites_url)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(len(res_json), len(advertisement))

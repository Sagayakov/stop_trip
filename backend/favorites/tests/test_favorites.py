from pytest import mark
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status

from favorites.models import FavoriteModel
from offers.tests.factories import TaxiAdvertisementFactory
from users.tests.factories import UserFactory


@mark.django_db
class FavoriteAPIViewTest(APITestCase):
    def setUp(self):
        self.list_url: str = reverse("favorites-list")
        self.my_favorites_url: str = reverse("favorites-my-favorites")
        self.my_likes_url: str = reverse("favorites-my-likes")

    def test_create_like(self):
        user = UserFactory()
        me = UserFactory()
        advertisement = TaxiAdvertisementFactory(owner=user)
        self.client.force_login(me)
        self.assertEqual(FavoriteModel.objects.count(), 0)

        with self.assertNumQueries(4):
            res = self.client.post(self.list_url, data={"advertisement": advertisement.slug})

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(FavoriteModel.objects.count(), 1)

        like = FavoriteModel.objects.first()
        self.assertEqual(like.owner, me)
        self.assertEqual(like.advertisement, advertisement)

        # проверка на повторную отправку лайка. Объект не создается
        with self.assertNumQueries(2):
            res = self.client.post(self.list_url, data={"advertisement": advertisement.slug})

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(FavoriteModel.objects.count(), 1)

    def test_delete_like(self):
        user = UserFactory()
        me = UserFactory()
        advertisement = TaxiAdvertisementFactory(owner=user)
        self.client.force_login(me)
        self.assertEqual(FavoriteModel.objects.count(), 0)

        # создание лайка
        with self.assertNumQueries(4):
            res = self.client.post(self.list_url, data={"advertisement": advertisement.slug})

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(FavoriteModel.objects.count(), 1)

        # удаление лайка
        with self.assertNumQueries(3):
            res = self.client.delete(self.list_url, data={"advertisement": advertisement.slug})

        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(FavoriteModel.objects.count(), 0)

        # повторное удаление
        with self.assertNumQueries(2):
            res = self.client.delete(self.list_url, data={"advertisement": advertisement.slug})

        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(FavoriteModel.objects.count(), 0)

    def test_my_favorites(self):
        user = UserFactory()
        me = UserFactory()
        advertisements = [TaxiAdvertisementFactory(owner=user) for _ in range(5)]
        self.client.force_login(me)
        self.assertEqual(FavoriteModel.objects.count(), 0)

        for advertisement in advertisements:
            self.client.post(self.list_url, data={"advertisement": advertisement.slug})

        self.assertEqual(FavoriteModel.objects.count(), 5)

        with self.assertNumQueries(5):
            res = self.client.get(self.my_favorites_url)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(len(res_json), len(advertisements))

    def test_my_likes(self):
        user = UserFactory()
        me = UserFactory()
        advertisements = [TaxiAdvertisementFactory(owner=user) for _ in range(5)]
        self.client.force_login(me)
        self.assertEqual(FavoriteModel.objects.count(), 0)

        for advertisement in advertisements:
            self.client.post(self.list_url, data={"advertisement": advertisement.slug})

        self.assertEqual(FavoriteModel.objects.count(), 5)

        with self.assertNumQueries(2):
            res = self.client.get(self.my_likes_url)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        self.assertEqual(len(res_json), len(advertisements))

from django.db.models import Avg
from pytest import mark
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from forbidden_words.tests.factories import ForbiddenWordsFactory
from users.tests.factories import UserFactory, RateFactory
from offers.tests.factories import BaseAdvertisementFactory
from users.models import Rate


@mark.django_db
class UserTest(APITestCase):
    def setUp(self):
        self.list_url: str = reverse("advertisements-list")

    def test_create_user_with_forbidden_word(self):
        forbidden_word = ForbiddenWordsFactory()
        user_data = {
            "email": "test@example.com",
            "password": "password",
            "full_name": forbidden_word.russian_words[0],
            "phone": "1234567890",
        }

        res = self.client.post("/api/auth/users/", user_data)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_users_rating(self):
        owner = UserFactory()
        rates = [
            RateFactory(to_user=owner, from_user=UserFactory(pk=_), rating=_)
            for _ in range(2, 6)
        ]

        advertisement = BaseAdvertisementFactory(owner=owner)
        with self.assertNumQueries(5):
            res = self.client.get(self.list_url)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        rating_num = res.json()["results"][0]["owner"]["rating_num"]
        avg_rating = res.json()["results"][0]["owner"]["avg_rating"]
        self.assertEqual(rating_num, Rate.objects.count())
        self.assertEqual(
            avg_rating, Rate.objects.aggregate(Avg("rating"))["rating__avg"]
        )

    def test_my_rate_on_user_as_authorized(self):
        owner = UserFactory(pk=9)
        me = UserFactory(pk=10)
        rate = RateFactory(to_user=owner, from_user=me, rating=5)
        advertisement = BaseAdvertisementFactory(owner=owner)
        self.client.force_login(me)

        with self.assertNumQueries(6):
            res = self.client.get(self.list_url)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        my_rate = res.json()["results"][0]["owner"]["my_rate"]
        self.assertEqual(my_rate, rate.rating)

    def test_my_rate_on_user_as_non_authorized(self):
        owner = UserFactory(pk=11)
        me = UserFactory(pk=12)
        rate = RateFactory(to_user=owner, from_user=me, rating=5)
        advertisement = BaseAdvertisementFactory(owner=owner)

        with self.assertNumQueries(5):
            res = self.client.get(self.list_url)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        my_rate = res.json()["results"][0]["owner"]["my_rate"]
        self.assertEqual(my_rate, None)

from django.db.models import Avg
from pytest import mark
from rest_framework import status
from rest_framework.test import APITestCase

from forbidden_words.tests.factories import ForbiddenWordsFactory
from offers.tests.factories import BaseAdvertisementFactory
from users.models import Rate
from .factories import UserFactory, RateFactory


@mark.django_db
class UserTest(APITestCase):
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
            RateFactory(to_user=owner, from_user=UserFactory(pk=_), rating=_) for _ in range(2, 6)
        ]

        advertisement = BaseAdvertisementFactory(owner=owner)
        with self.assertNumQueries(4):
            res = self.client.get("/api/advertisements/")

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()["results"]
        rating_num = res_json[0]["owner"]["rating_num"]
        avg_rating = res_json[0]["owner"]["avg_rating"]
        self.assertEqual(rating_num, Rate.objects.count())
        self.assertEqual(avg_rating, Rate.objects.aggregate(Avg("rating"))["rating__avg"])

    def test_my_rate_on_user(self):
        owner = UserFactory(pk=9)
        me = UserFactory(pk=10)
        rate = RateFactory(to_user=owner, from_user=me, rating=5)
        advertisement = BaseAdvertisementFactory(owner=owner)

        with self.assertNumQueries(4):
            res = self.client.get("/api/advertisements/")

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        my_rating = res.json()["results"][0]["owner"]["my_rating"]
        self.assertEqual(my_rating, 0)

        self.client.force_login(me)
        with self.assertNumQueries(5):
            res = self.client.get("/api/advertisements/")

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        my_rating = res.json()["results"][0]["owner"]["my_rating"]
        self.assertEqual(my_rating, rate.rating)

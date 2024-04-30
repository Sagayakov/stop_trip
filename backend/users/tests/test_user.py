from pytest import mark
from rest_framework import status
from rest_framework.test import APITestCase
from functools import partial
from django.urls import reverse

from forbidden_words.tests.factories import ForbiddenWordsFactory
from offers.tests.factories import BaseAdvertisementFactory
from users.tests.factories import UserFactory, RateFactory
from users.models import User


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
        with self.assertNumQueries(5):
            res = self.client.get(f"/api/advertisements/{advertisement.slug}/")

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = res.json()
        rating_num = res_json["owner"]["rating_num"]
        avg_rating = res_json["owner"]["avg_rating"]
        self.assertEqual(rating_num, len(rates))
        rating_sum = 0
        for rating in rates:
            rating_sum += rating.rating
        self.assertEqual(avg_rating, rating_sum / len(rates))

    def test_my_rate_on_user_unauthorised(self):
        owner = UserFactory()
        me = UserFactory()
        my_rate = RateFactory(to_user=owner, from_user=me, rating=5)
        users = [UserFactory() for _ in range(5)]
        my_other_rates = [
            RateFactory(to_user=to_user, from_user=me, rating=_)
            for _, to_user in enumerate(users, start=1)
        ]
        other_rates = [
            RateFactory(to_user=owner, from_user=from_user, rating=_)
            for _, from_user in enumerate(users, start=1)
        ]
        advertisement = BaseAdvertisementFactory(owner=owner)

        with self.assertNumQueries(5):
            res = self.client.get(f"/api/advertisements/{advertisement.slug}/")

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        my_rating = res.json()["owner"]["my_rating"]
        self.assertEqual(my_rating, None)

    def test_my_rate_on_user_authorised(self):
        owner = UserFactory()
        me = UserFactory()
        my_rate = RateFactory(to_user=owner, from_user=me, rating=5)
        users = [UserFactory() for _ in range(5)]
        my_other_rates = [
            RateFactory(to_user=to_user, from_user=me, rating=_)
            for _, to_user in enumerate(users, start=1)
        ]
        other_rates = [
            RateFactory(to_user=owner, from_user=from_user, rating=_)
            for _, from_user in enumerate(users, start=1)
        ]
        advertisement = BaseAdvertisementFactory(owner=owner)

        self.client.force_login(me)
        with self.assertNumQueries(6):
            res = self.client.get(f"/api/advertisements/{advertisement.slug}/")

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        my_rating = res.json()["owner"]["my_rating"]
        self.assertEqual(my_rating, my_rate.rating)


@mark.django_db
class UserApiTest(APITestCase):
    def setUp(self):
        self.detail_url = partial(reverse, "user_detail-detail")

    def test_detail_user(self):
        user = UserFactory()

        self.assertEqual(User.objects.count(), 1)

        with self.assertNumQueries(2):
            res = self.client.get(self.detail_url(kwargs={"pk": user.id}))

        res_json = res.json()

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res_json["id"], user.id)
        self.assertEqual(res_json["full_name"], user.full_name)
        self.assertEqual(res_json["phone"], user.phone)
        self.assertIsNotNone(res_json["avg_rating"])
        self.assertIn("rating_num", res_json)
        self.assertIn("my_rating", res_json)
        self.assertIn("user_messengers", res_json)

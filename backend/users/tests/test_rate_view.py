import datetime
from functools import partial
from django.utils.timezone import now
from django.urls import reverse
from pytest import mark
from rest_framework import status
from rest_framework.test import APITestCase
from .factories import UserFactory, RateFactory
from users.models import Rate
from django.contrib.auth import get_user_model
from rest_framework import status


@mark.django_db
class RateAPIViewTest(APITestCase):
    def setUp(self):
        self.url = reverse("user_rate-change-rate")

    def test_create_rate(self):
        to_user = UserFactory()
        from_user = UserFactory()
        payload = {
            "rating": 5,
            "comment": "Test Comment",

        }

        self.assertEqual(Rate.objects.count(), 0)
        self.client.force_login(from_user)

        with self.assertNumQueries(5):
            res = self.client.post(self.url + f"?to_user={to_user.pk}", data=payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Rate.objects.count(), 1)
        new_rate = Rate.objects.first()
        self.assertEqual(new_rate.from_user, from_user)
        self.assertEqual(new_rate.to_user, to_user)
        self.assertEqual(new_rate.rating, payload["rating"])
        self.assertEqual(new_rate.comment, payload["comment"])

    def test_change_rate(self):
        to_user = UserFactory()
        from_user = UserFactory()
        RateFactory(
            to_user=to_user,
            from_user=from_user
        )
        payload = {
            "rating": 5,
            "comment": "Test Comment",

        }
        self.assertEqual(Rate.objects.count(), 1)
        self.client.force_login(from_user)
        with self.assertNumQueries(7):
            res = self.client.post(self.url + f"?to_user={to_user.pk}", data=payload)

            self.assertEqual(res.status_code, status.HTTP_201_CREATED)
            self.assertEqual(Rate.objects.count(), 1)
            new_rate = Rate.objects.first()
            self.assertEqual(new_rate.from_user, from_user)
            self.assertEqual(new_rate.to_user, to_user)
            self.assertEqual(new_rate.rating, payload["rating"])
            self.assertEqual(new_rate.comment, payload["comment"])

    def test_rate_yourself(self):
        user = UserFactory()
        payload = {
            "rating": 5,
            "comment": "Test Comment",

        }

        self.client.force_login(user)

        with self.assertNumQueries(2):
            res = self.client.post(self.url + f"?to_user={user.pk}", data=payload)
            self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
            self.assertEqual(Rate.objects.count(), 0)

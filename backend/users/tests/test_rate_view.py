from django.urls import reverse
from pytest import mark
from rest_framework import status
from rest_framework.test import APITestCase

from users.tests.factories import UserFactory, RateFactory
from users.models import Rate


@mark.django_db
class RateAPIViewTest(APITestCase):
    def setUp(self):
        self.url = reverse("user_rate-change-rate")

    def test_create_rate(self):
        to_user = UserFactory()
        from_user = UserFactory()
        self.assertEqual(Rate.objects.count(), 0)

        payload = {
            "rating": 5,
            "comment": "Test Comment",
        }
        self.client.force_login(from_user)
        with self.assertNumQueries(5):
            res = self.client.post(f"{self.url}?to_user={to_user.pk}", data=payload)

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
            from_user=from_user,
            rating=3,
            comment="Bad comment",
        )
        self.assertEqual(Rate.objects.count(), 1)

        payload = {
            "rating": 5,
            "comment": "Test Comment",
        }
        self.client.force_login(from_user)
        with self.assertNumQueries(3):
            res = self.client.post(f"{self.url}?to_user={to_user.pk}", data=payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Rate.objects.count(), 1)
        updated_rate = Rate.objects.first()
        self.assertEqual(updated_rate.from_user, from_user)
        self.assertEqual(updated_rate.to_user, to_user)
        self.assertEqual(updated_rate.rating, payload["rating"])
        self.assertEqual(updated_rate.comment, payload["comment"])

    def test_rate_yourself(self):
        user = UserFactory()
        payload = {
            "rating": 5,
            "comment": "Test Comment",
        }

        self.client.force_login(user)
        with self.assertNumQueries(1):
            res = self.client.post(f"{self.url}?to_user={user.pk}", data=payload)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Rate.objects.count(), 0)

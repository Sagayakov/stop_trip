from django.urls import reverse
from pytest import mark
from rest_framework import status
from rest_framework.test import APITestCase

from users.tests.factories import UserFactory


@mark.django_db
class UserContactsTest(APITestCase):
    def test_returns_phone(self):
        user = UserFactory(phone="+84901234567")

        res = self.client.get(reverse("user-contacts", kwargs={"pk": user.pk}))

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.json()["phone"], "+84901234567")

    def test_unknown_user_404(self):
        res = self.client.get(reverse("user-contacts", kwargs={"pk": 999999}))

        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)

    def test_throttled(self):
        user = UserFactory()
        url = reverse("user-contacts", kwargs={"pk": user.pk})

        statuses = [self.client.get(url).status_code for _ in range(21)]

        self.assertEqual(statuses[20], status.HTTP_429_TOO_MANY_REQUESTS)

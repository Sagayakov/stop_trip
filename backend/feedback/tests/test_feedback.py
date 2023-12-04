import json
import pytest

from functools import partial
from django.urls import reverse
from pytest import mark
from rest_framework.test import APITestCase
from rest_framework import status

from ..models import FeedBackModel
from users.tests.factories import UserFactory


@pytest.fixture
def jwt_token(api_client, django_user_model):
    email = "user@gmail.com"
    password = "password"

    django_user_model.objects.create_user(email=email, password=password)

    response = api_client.post(
        path="/api/auth/jwt/create/",
        data=json.dumps({"email": email, "password": password}),
        content_type="application/json",
    )

    return response.data["access"]


@mark.django_db
class AdvertisementViewSetTest(APITestCase):
    def setUp(self):
        self.list_url: str = reverse("feedback-list")
        self.detail_url = partial(reverse, "feedback-detail")

    def test_create_feedback(self):
        self.assertEqual(FeedBackModel.objects.count(), 0)
        user = UserFactory()
        self.client.force_login(user)

        with self.assertNumQueries(13):
            res = self.client.post(self.list_url, data={"feedback": "hello it`s new feedback"})

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(FeedBackModel.objects.count(), 1)

        new_feedback = FeedBackModel.objects.first()
        self.assertEqual(new_feedback.owner, user)
        self.assertEqual(new_feedback.feedback, "hello it`s new feedback")

from functools import partial
from django.urls import reverse
from pytest import mark
from rest_framework.test import APITestCase
from rest_framework import status

from feedback.models import FeedBackModel
from users.tests.factories import UserFactory


@mark.django_db
class AdvertisementViewSetTest(APITestCase):
    def setUp(self):
        self.list_url: str = reverse("feedback-list")
        self.detail_url = partial(reverse, "feedback-detail")

    def test_create_feedback(self):
        self.assertEqual(FeedBackModel.objects.count(), 0)
        user = UserFactory()
        self.client.force_login(user)

        with self.assertNumQueries(2):
            res = self.client.post(self.list_url, data={"feedback": "hello, it`s new feedback"})

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(FeedBackModel.objects.count(), 1)

        new_feedback = FeedBackModel.objects.first()
        self.assertEqual(new_feedback.owner, user)
        self.assertEqual(new_feedback.feedback, "hello, it`s new feedback")

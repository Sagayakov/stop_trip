from django.urls import reverse
from pytest import mark
from rest_framework import status
from rest_framework.test import APITestCase


@mark.django_db
class RateTest(APITestCase):
    def setUp(self):
        self.list_url: str = reverse("advertisements-list")
        self.detail_url = partial(reverse, "advertisements-detail")

from pytest import mark
from rest_framework import status
from rest_framework.test import APITestCase
from django.urls import reverse
from functools import partial

from users.tests.factories import UserFactory, MessengerFactory, UserMessengerFactory
from users.models import UserMessenger


@mark.django_db
class MessengerTest(APITestCase):
    def setUp(self):
        self.list_url: str = reverse("messengers-list")
        self.detail_url = partial(reverse, "messengers-detail")

    def test_create_messenger(self):
        user = UserFactory()
        messenger = MessengerFactory()
        payload = {
            "messenger": messenger.id,
            "link_to_user": "login",
        }

        self.assertEqual(UserMessenger.objects.count(), 0)
        self.client.force_login(user)

        with self.assertNumQueries(3):
            res = self.client.post(self.list_url, data=payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(UserMessenger.objects.count(), 1)

        user_messenger = UserMessenger.objects.first()

        self.assertEqual(user_messenger.owner, user)
        self.assertEqual(user_messenger.messenger, messenger)
        self.assertEqual(user_messenger.link_to_user, payload["link_to_user"])

    def test_update_messenger(self):
        user = UserFactory()
        user_messenger = UserMessengerFactory(owner=user)
        new_messenger = MessengerFactory(name="Test messenger")
        payload = {
            "messenger": new_messenger.id,
            "link_to_user": "login",
        }

        self.assertEqual(UserMessenger.objects.count(), 1)
        self.client.force_login(user)

        with self.assertNumQueries(5):
            res = self.client.put(self.detail_url(kwargs={"pk": user_messenger.id}), data=payload)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(UserMessenger.objects.count(), 1)

        user_messenger.refresh_from_db()
        self.assertEqual(user_messenger.owner, user)
        self.assertEqual(user_messenger.messenger, new_messenger)
        self.assertEqual(user_messenger.link_to_user, payload["link_to_user"])

    def test_delete_messenger(self):
        user = UserFactory()
        user_messenger = UserMessengerFactory(owner=user)

        self.assertEqual(UserMessenger.objects.count(), 1)
        self.client.force_login(user)

        with self.assertNumQueries(4):
            res = self.client.delete(self.detail_url(kwargs={"pk": user_messenger.id}))

        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(UserMessenger.objects.count(), 0)

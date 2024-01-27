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
        user_1 = UserFactory()
        user_2 = UserFactory()
        messenger = MessengerFactory()
        payload = {
            "messenger": messenger.id,
            "link_to_user": "login",
        }

        self.assertEqual(UserMessenger.objects.count(), 0)
        self.client.force_login(user_1)

        with self.assertNumQueries(3):
            res = self.client.post(self.list_url, data=payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(UserMessenger.objects.count(), 1)

        user_messenger = UserMessenger.objects.first()

        self.assertEqual(user_messenger.owner, user_1)
        self.assertEqual(user_messenger.messenger, messenger)
        self.assertEqual(user_messenger.link_to_user, payload["link_to_user"])

        self.client.force_login(user_2)

        with self.assertNumQueries(3):
            res = self.client.post(self.list_url, data=payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(UserMessenger.objects.count(), 2)

        user_messenger = UserMessenger.objects.last()

        self.assertEqual(user_messenger.owner, user_2)
        self.assertEqual(user_messenger.messenger, messenger)
        self.assertEqual(user_messenger.link_to_user, payload["link_to_user"])

    def test_update_messenger(self):
        user = UserFactory()
        # messenger = MessengerFactory()
        user_messenger = UserMessengerFactory(owner=user)
        new_messenger = MessengerFactory()
        payload = {
            "messenger": new_messenger.id,
            "link_to_user": "login",
        }

        self.assertEqual(UserMessenger.objects.count(), 1)
        self.client.force_login(user)
        print(f"id {user_messenger.id}, messenger {user_messenger} ")

        with self.assertNumQueries(3):
            res = self.client.put(self.detail_url(kwargs={"id": user_messenger.id}), data=payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
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

        with self.assertNumQueries(3):
            res = self.client.delete(self.detail_url(kwargs={"id": user_messenger.id}))

        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(UserMessenger.objects.count(), 0)

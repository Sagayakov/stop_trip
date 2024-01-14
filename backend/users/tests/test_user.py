from pytest import mark
from rest_framework import status
from rest_framework.test import APITestCase

from forbidden_words.tests.factories import ForbiddenWordsFactory


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

import pytest
from rest_framework import status
from django.urls import reverse
from users.models import User


@pytest.mark.django_db
def test_registration_view(api_client):
    payload = {
        "full_name": "Test",
        "email": "test@gmail.com",
        "password": "test1234!",
        "re_password": "test1234!",
    }
    url = reverse('user-list')
    response = api_client.post(url, data=payload)
    assert User.objects.count() == 1
    assert response.data["email"] == payload["email"]
    assert response.status_code == status.HTTP_201_CREATED


@pytest.mark.django_db
def test_user_with_email_exists_error(api_client, user_factory):
    payload = {
        "full_name": "Test",
        "email": "test@gmail.com",
        "password": "test1234!"
    }
    user_factory.create(**payload)
    url = reverse('user-list')
    response = api_client.post(url, data=payload)
    assert response.status_code == status.HTTP_400_BAD_REQUEST




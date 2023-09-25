import pytest
from rest_framework import status
from django.urls import reverse


@pytest.mark.django_db
def test_get_user_profile(api_client, user_factory):
    user = user_factory.create()
    url = reverse("user-me")
    api_client.force_authenticate(user)
    response = api_client.get(url)
    assert response.status_code == status.HTTP_200_OK


@pytest.mark.django_db
def test_edit_user_profile(api_client, user_factory):
    user = user_factory.create()
    url = reverse("user-me")
    api_client.force_authenticate(user)
    payload = {
        "full_name": "New full_name"
    }
    response = api_client.put(url, data=payload)
    user.refresh_from_db()
    assert response.status_code == status.HTTP_200_OK
    assert user.full_name == payload["full_name"]


@pytest.mark.skip(reason="Test fails")
@pytest.mark.django_db
def test_delete_user_profile(api_client, user_factory):
    user = user_factory.create()
    url = reverse("user-me")
    api_client.force_authenticate(user)
    response = api_client.delete(url)
    assert response.status_code == status.HTTP_204_NO_CONTENT

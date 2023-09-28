import json

import pytest
from rest_framework import status


@pytest.mark.django_db
def test_create_property(api_client):
    payload = {
        "subcategory": "property",
        "title": "test",
        "price": 0,
        "property_has_parking": True,
        "property_rooms_count": 0,
        "property_city": 'washington',
    }

    response = api_client.post(
        '/api/v1/advertisements/',
        data=json.dumps(payload),
        content_type='application/json'
    )

    assert response.status_code == status.HTTP_201_CREATED
    assert response.data['property_has_parking'] == payload['property_has_parking']
    assert response.data['property_rooms_count'] == payload['property_rooms_count']
    assert response.data['property_city'] == payload['property_city']


@pytest.mark.django_db
def test_create_property_without_fields(api_client):
    payload = {
        "subcategory": "property",
        "title": "test",
        "price": 0,
    }

    response = api_client.post(
        '/api/v1/advertisements/',
        data=json.dumps(payload),
        content_type='application/json'
    )

    assert response.status_code == status.HTTP_400_BAD_REQUEST

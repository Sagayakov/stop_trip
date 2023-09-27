import json

import pytest
from rest_framework import status


@pytest.mark.django_db
def test_create_property(api_client):
    payload = json.dumps({
        "subcategory": "property",
        "title": "test",
        "price": 0,
        "transport_brand": "test",
        "transport_model": "test",
        "property_city": "test",
        "property_rooms_count": 0
    })

    response = api_client.post(
        'http://127.0.0.1:8000/api/v1/advertisements/',
        data=payload,
        content_type='application/json'
    )

    assert response.status_code == status.HTTP_201_CREATED

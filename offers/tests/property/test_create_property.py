import json

import pytest
from rest_framework import status


@pytest.mark.django_db
def test_create_property(api_client):
    payload = {
        "subcategory": "property",
        "title": "test",
        "price": 0,
        "property_city": "test",
        "property_rooms_count": 0
    }

    response = api_client.post(
        '/api/v1/advertisements/',
        data=json.dumps(payload),
        content_type='application/json'
    )

    assert response.status_code == status.HTTP_201_CREATED

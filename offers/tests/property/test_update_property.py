import json

import pytest
from rest_framework import status


@pytest.mark.django_db
def test_update_property(api_client, property_advertisement):
    assert property_advertisement.property_rooms_count == 3
    assert property_advertisement.property_city == 'test'

    payload = {
        "subcategory": "property",
        "title": "test",
        "price": 0,
        "property_city": "tokyo",
        "property_rooms_count": 5
    }

    response = api_client.put(
        f'/api/v1/advertisements/{property_advertisement.id}/',
        json.dumps(payload),
        content_type='application/json'
    )

    assert response.status_code == status.HTTP_200_OK
    assert response.data['property_city'] == payload['property_city']
    assert response.data['property_rooms_count'] == payload['property_rooms_count']

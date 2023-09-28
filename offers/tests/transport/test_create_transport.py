import json

import pytest
from rest_framework import status


@pytest.mark.django_db
def test_create_transport(api_client):
    payload = {
        "subcategory": "transport",
        "title": "test",
        "price": 0,
        "transport_brand": "test",
        "transport_model": "test",
        "transport_transmission_type": "automatic",
    }

    response = api_client.post(
        '/api/v1/advertisements/',
        data=json.dumps(payload),
        content_type='application/json'
    )

    assert response.status_code == status.HTTP_201_CREATED
    assert response.data['transport_brand'] == payload['transport_brand']
    assert response.data['transport_model'] == payload['transport_model']
    assert response.data['transport_transmission_type'] == payload['transport_transmission_type']

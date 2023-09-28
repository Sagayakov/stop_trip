import json

import pytest
from rest_framework import status


@pytest.mark.django_db
def test_update_transport(api_client, transport_advertisement):
    assert transport_advertisement.transport_model == 'test'

    payload = {
        "subcategory": "transport",
        "title": "test",
        "price": 0,
        "transport_brand": "test",
        "transport_model": "test100",
    }

    response = api_client.put(
        f'/api/v1/advertisements/{transport_advertisement.id}/',
        json.dumps(payload),
        content_type='application/json'
    )

    assert response.status_code == status.HTTP_200_OK
    assert response.data['transport_model'] == payload['transport_model']

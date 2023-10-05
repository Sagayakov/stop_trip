import json

import pytest
from rest_framework import status

from offers.models import Advertisement
from offers.serializers import TaxiCreateSerializer


@pytest.mark.django_db
def test_create_taxi(api_client, jwt_token):
    payload = {
        "category": "taxi",
        "title": "test",
        "price": 0,
        "taxi_unit": 'hour',
        "taxi_type": "comfort",
    }

    response = api_client.post(
        path='/api/advertisements/',
        data=json.dumps(payload),
        content_type='application/json',
        HTTP_AUTHORIZATION=f'JWT {jwt_token}'
    )

    transport = Advertisement.objects.get(id=response.data['id'])
    expected_data = TaxiCreateSerializer(transport).data

    assert response.status_code == status.HTTP_201_CREATED
    assert response.data == expected_data

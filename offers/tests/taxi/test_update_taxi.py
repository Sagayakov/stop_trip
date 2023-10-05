import json

import pytest
from rest_framework import status

from offers.models import Advertisement
from offers.serializers import AdvertisementUpdateSerializer


@pytest.mark.django_db
def test_update_taxi(api_client, taxi_advertisement, jwt_token):
    payload = {
        "category": "taxi",
        "title": "tost",
        "price": 10,
        "taxi_unit": 'hour',
        "taxi_type": "comfort",
    }

    response = api_client.put(
        path=f'/api/advertisements/{taxi_advertisement.id}/',
        data=json.dumps(payload),
        content_type='application/json',
        HTTP_AUTHORIZATION=f'JWT {jwt_token}'
    )

    transport = Advertisement.objects.get(id=response.data['id'])
    expected_data = AdvertisementUpdateSerializer(transport).data

    assert response.status_code == status.HTTP_201_CREATED
    assert response.data == expected_data

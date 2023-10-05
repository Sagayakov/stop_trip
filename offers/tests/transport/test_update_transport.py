import json

import pytest
from rest_framework import status

from offers.models import Advertisement
from offers.serializers import AdvertisementUpdateSerializer


@pytest.mark.django_db
def test_update_transport(api_client, transport_advertisement, jwt_token):
    payload = {
        "category": "transport",
        "title": "tost",
        "price": 0,
        "transport_type_of_service": "sale",
        "transport_type": 'ground',
        "transport_category": 'car',
        "transport_brand": None,
        "transport_model": None,
        "transport_engine_type": 'diesel',
        "transport_drive_type": 'rear_wheel',
        "transport_engine_volume": 3.2,
        "transport_year_of_production": 2022,
        "transport_transmission_type": 'automatic',
        "transport_body_type": 'sedan',
        "transport_condition": 'used',
        "transport_passengers_quality": 2,
    }

    response = api_client.put(
        path=f'/api/advertisements/{transport_advertisement.id}/',
        data=json.dumps(payload),
        content_type='application/json',
        HTTP_AUTHORIZATION=f'JWT {jwt_token}'
    )

    transport = Advertisement.objects.get(id=response.data['id'])
    expected_data = AdvertisementUpdateSerializer(transport).data

    assert response.status_code == status.HTTP_201_CREATED
    assert response.data == expected_data

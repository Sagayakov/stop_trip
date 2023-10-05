import json

import pytest
from rest_framework import status
from rest_framework.exceptions import ErrorDetail

from offers.models import Advertisement
from offers.serializers import TransportCreateSerializer


@pytest.mark.django_db
def test_create_transport(api_client, jwt_token):
    payload = {
        "category": "transport",
        "title": "test",
        "price": 0,
        "transport_type_of_service": "sale",
        "transport_type": 'ground',
        "transport_category": 'car',
        "transport_brand": None,
        "transport_model": None,
        "transport_engine_type": 'diesel',
        "transport_drive_type": 'rear_wheel',
        "transport_engine_volume": 5.2,
        "transport_year_of_production": 2023,
        "transport_transmission_type": 'mechanic',
        "transport_body_type": 'sedan',
        "transport_condition": 'used',
        "transport_passengers_quality": 4,
    }

    response = api_client.post(
        path='/api/advertisements/',
        data=json.dumps(payload),
        content_type='application/json',
        HTTP_AUTHORIZATION=f'JWT {jwt_token}'
    )

    transport = Advertisement.objects.get(id=response.data['id'])
    expected_data = TransportCreateSerializer(transport).data

    assert response.status_code == status.HTTP_201_CREATED
    assert response.data == expected_data


@pytest.mark.django_db
def test_create_transport_with_only_required_fields(api_client, jwt_token):
    payload = {
        "category": "transport",
        "title": "test",
        "price": 0,
        "transport_brand": None,
        "transport_model": None,
    }

    response = api_client.post(
        path='/api/advertisements/',
        data=json.dumps(payload),
        content_type='application/json',
        HTTP_AUTHORIZATION=f'JWT {jwt_token}'
    )

    transport = Advertisement.objects.get(id=response.data['id'])
    expected_data = TransportCreateSerializer(transport).data

    assert response.status_code == status.HTTP_201_CREATED
    assert response.data == expected_data


@pytest.mark.django_db
def test_create_transport_without_transport_fields(api_client, jwt_token):
    payload = {
        "category": "transport",
        "title": "test",
        "price": 0,
    }

    response = api_client.post(
        path='/api/advertisements/',
        data=json.dumps(payload),
        content_type='application/json',
        HTTP_AUTHORIZATION=f'JWT {jwt_token}'
    )

    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert response.data == {'transport_brand': [ErrorDetail(string='Обязательное поле.', code='required')],
                             'transport_model': [ErrorDetail(string='Обязательное поле.', code='required')]}

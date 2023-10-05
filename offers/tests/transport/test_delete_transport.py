import pytest
from rest_framework import status


@pytest.mark.django_db
def test_delete_transport(api_client, transport_advertisement, jwt_token):
    response = api_client.delete(
        path=f'/api/advertisements/{transport_advertisement.id}/',
        HTTP_AUTHORIZATION=f'JWT {jwt_token}',
    )

    assert response.status_code == status.HTTP_204_NO_CONTENT

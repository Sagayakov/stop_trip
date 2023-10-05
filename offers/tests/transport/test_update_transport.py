# import json
#
# import pytest
# from rest_framework import status
#
#
# @pytest.mark.django_db
# def test_update_transport(api_client, transport_advertisement):
#     assert transport_advertisement.transport_brand == 'test'
#     assert transport_advertisement.transport_model == 'test'
#     assert transport_advertisement.transport_category == 'Мотоцикл'
#
#     payload = {
#         "subcategory": "transport",
#         "title": "test",
#         "price": 0,
#         "transport_brand": "new_test",
#         "transport_model": "new_test",
#         "transport_category": "bus",
#     }
#
#     response = api_client.put(
#         f'/api/v1/advertisements/{transport_advertisement.id}/',
#         json.dumps(payload),
#         content_type='application/json'
#     )
#
#     assert response.status_code == status.HTTP_200_OK
#     assert response.data['transport_brand'] == payload['transport_brand']
#     assert response.data['transport_model'] == payload['transport_model']
#     assert response.data['transport_category'] == payload['transport_category']

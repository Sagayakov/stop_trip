import json

import pytest


@pytest.fixture
def jwt_token(api_client, django_user_model):
    email = "user@gmail.com"
    password = "password"

    django_user_model.objects.create_user(email=email, password=password)

    response = api_client.post(
        path="/api/auth/jwt/create/",
        data=json.dumps({"email": email, "password": password}),
        content_type="application/json",
    )

    return response.data["access"]

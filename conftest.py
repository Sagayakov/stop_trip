import pytest
from pytest_factoryboy import register
from users.tests.factories import UserFactory

register(UserFactory)

pytest_plugins = ['offers.tests.fixtures']


@pytest.fixture
def api_client():
    from rest_framework.test import APIClient
    return APIClient()

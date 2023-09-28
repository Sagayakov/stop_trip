import pytest

from offers.models import Advertisement


@pytest.fixture
def property_advertisement():
    property_advertisement = Advertisement.objects.create(
        subcategory="property", title="test", price=1, property_city="test", property_rooms_count=3
    )

    return property_advertisement


@pytest.fixture
def transport_advertisement():
    transport_advertisement = Advertisement.objects.create(
        subcategory="transport", title="test", price=1, property_city="test", property_rooms_count=3,
        transport_brand="test", transport_model="test",
    )

    return transport_advertisement

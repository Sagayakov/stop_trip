import pytest

from offers.models import Advertisement, PropertyAmenity


@pytest.fixture
def property_advertisement():
    property_amenities1 = PropertyAmenity.objects.create(name='test1')
    property_amenities2 = PropertyAmenity.objects.create(name='test2')

    property_advertisement = Advertisement.objects.create(
        subcategory="property", title="test", price=1, property_city="test", property_type_of_service='Продажа',
        property_district='test', property_coords='test', property_building_max_floor=8, property_floor=3,
        property_bathroom_count=1, property_bathroom_type='Совмещённый', property_area=20, property_living_area=10,
        property_balcony='Есть', property_has_furniture=True, property_rooms_count=3, property_house_type='Панельный',
        property_has_parking=False, property_rental_condition='Семье', property_prepayment='Месяц',
        property_sleeping_places=3,
    )
    property_advertisement.property_amenities.set([property_amenities1, property_amenities2])

    return property_advertisement


@pytest.fixture
def transport_advertisement():
    transport_advertisement = Advertisement.objects.create(
        subcategory="transport", title="test", price=1, transport_type_of_service='Продажа', transport_type='Наземный',
        transport_category='Мотоцикл', transport_brand="test", transport_model="test", transport_engine_type='Бензин',
        transport_drive_type='front_wheel', transport_engine_volume=10, transport_year_of_production=2023,
        transport_transmission_type='Механическая', transport_body_type='Лифтбэк', transport_condition='Новый',
        transport_passengers_quality=4,
    )

    return transport_advertisement

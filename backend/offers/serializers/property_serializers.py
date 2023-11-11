from rest_framework import serializers

from .advertisement_serializers import AdvertisementCreateSerializer
from ..models import Advertisement, PropertyAmenity, PropertyCity, PropertyDistrict


class PropertyAmenitySerializer(serializers.ModelSerializer):
    """Сериализатор удобств недвижимости."""

    class Meta:
        model = PropertyAmenity
        fields = (
            "id",
            "name",
        )


class PropertyCreateSerializer(AdvertisementCreateSerializer):
    property_type_of_service = serializers.CharField(required=True)
    property_city = serializers.PrimaryKeyRelatedField(
        queryset=PropertyCity.objects.all(),
        required=True,
    )
    property_district = serializers.PrimaryKeyRelatedField(
        queryset=PropertyDistrict.objects.all(),
        required=True,
    )

    property_building_max_floor = serializers.IntegerField(required=True)
    property_floor = serializers.IntegerField(required=True)
    property_bathroom_count = serializers.IntegerField(required=True)
    property_bathroom_type = serializers.CharField(required=True)
    property_area = serializers.IntegerField(required=True)
    property_living_area = serializers.IntegerField(required=True)
    property_balcony = serializers.CharField(required=True)
    property_has_furniture = serializers.BooleanField(required=True)
    property_house_type = serializers.CharField(required=True)
    property_has_parking = serializers.BooleanField(required=True)
    property_rental_condition = serializers.CharField(required=True)
    property_prepayment = serializers.CharField(required=True)
    property_sleeping_places = serializers.IntegerField(required=True)
    property_rooms_count = serializers.IntegerField(required=True)

    class Meta:
        model = Advertisement
        fields = AdvertisementCreateSerializer.Meta.fields + (
            "property_type_of_service",
            "property_city",
            "property_district",
            "property_building_max_floor",
            "property_floor",
            "property_bathroom_count",
            "property_bathroom_type",
            "property_area",
            "property_living_area",
            "property_balcony",
            "property_has_furniture",
            "property_amenities",
            "property_house_type",
            "property_has_parking",
            "property_rental_condition",
            "property_prepayment",
            "property_sleeping_places",
            "property_rooms_count",
        )



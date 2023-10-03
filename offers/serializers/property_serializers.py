from rest_framework import serializers

from .advertisement_serializers import AdvertisementCreateSerializer
from ..models import Advertisement


class PropertyCreateSerializer(AdvertisementCreateSerializer):
    property_city = serializers.CharField(allow_null=False)
    property_rooms_count = serializers.IntegerField(allow_null=False)

    class Meta:
        model = Advertisement
        fields = AdvertisementCreateSerializer.Meta.fields + (
            "property_type_of_service",
            "property_city",
            "property_district",
            "property_coords",
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

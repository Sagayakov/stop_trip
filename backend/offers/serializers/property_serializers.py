from rest_framework import serializers

from .advertisement_serializers import AdvertisementCreateSerializer
from ..models import Advertisement, PropertyAmenity
from ..constants import (
    PropertyTypeOfService,
    PropertyBathroomType,
    PropertyBalcony,
    PropertyRentDuration,
    PropertyPrepayment,
    PropertyType,
    PropertyHouseType,
    PropertyRentalCondition,
)


class PropertyAmenitySerializer(serializers.ModelSerializer):
    """Сериализатор удобств недвижимости."""

    class Meta:
        model = PropertyAmenity
        fields = (
            "name",
            "slug",
        )


class PropertyCreateSerializer(AdvertisementCreateSerializer):
    """Сериализатор создания объекта недвижимости."""

    property_type = serializers.ChoiceField(choices=PropertyType.choices, required=True)
    property_type_of_service = serializers.ChoiceField(
        choices=PropertyTypeOfService.choices, required=True
    )
    property_bathroom_type = serializers.ChoiceField(
        choices=PropertyBathroomType.choices, required=False
    )
    property_balcony = serializers.ChoiceField(choices=PropertyBalcony.choices, required=False)
    property_house_type = serializers.ChoiceField(choices=PropertyHouseType.choices, required=False)
    property_rental_condition = serializers.ChoiceField(
        choices=PropertyRentalCondition.choices, required=False
    )
    property_prepayment = serializers.ChoiceField(
        choices=PropertyPrepayment.choices, required=False
    )
    property_rent_duration = serializers.ChoiceField(
        choices=PropertyRentDuration.choices, required=False
    )
    property_amenities = serializers.SlugRelatedField(
        queryset=PropertyAmenity.objects.all(), slug_field="slug", required=False, many=True
    )

    class Meta:
        model = Advertisement
        fields = AdvertisementCreateSerializer.Meta.fields + (
            "property_type",
            "property_type_of_service",
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
            "property_commission",
            "property_rent_duration",
        )

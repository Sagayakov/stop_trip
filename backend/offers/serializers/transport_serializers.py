from rest_framework import serializers

from .advertisement_serializers import AdvertisementCreateSerializer
from ..constants import (
    TransportTypeOfService,
    TransportType,
    TransportCategory,
    TransportTransmissionType,
)
from ..models import TransportBrand, TransportModel, Advertisement


class TransportCreateSerializer(AdvertisementCreateSerializer):
    """Сериализатор создания транспорта."""

    transport_type_of_service = serializers.ChoiceField(
        choices=TransportTypeOfService.choices, required=True
    )
    transport_type = serializers.ChoiceField(choices=TransportType.choices, required=True)
    transport_category = serializers.ChoiceField(choices=TransportCategory.choices, required=True)
    transport_brand = serializers.SlugRelatedField(
        queryset=TransportBrand.objects.all(),
        slug_field="slug",
        required=True,
    )
    transport_model = serializers.SlugRelatedField(
        queryset=TransportModel.objects.all(),
        slug_field="slug",
        required=True,
    )
    transport_transmission_type = serializers.ChoiceField(
        required=True, choices=TransportTransmissionType.choices
    )

    class Meta:
        model = Advertisement
        fields = AdvertisementCreateSerializer.Meta.fields + (
            "transport_type_of_service",
            "transport_type",
            "transport_category",
            "transport_brand",
            "transport_model",
            "transport_engine_type",
            "transport_drive_type",
            "transport_engine_volume",
            "transport_year_of_production",
            "transport_transmission_type",
            "transport_body_type",
            "transport_condition",
            "transport_passengers_quality",
            "transport_vin",
            "transport_commission",
        )

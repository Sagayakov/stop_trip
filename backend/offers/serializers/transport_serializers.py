from rest_framework import serializers

from .advertisement_serializers import AdvertisementCreateSerializer
from ..constants import (
    TransportTypeOfService,
    TransportType,
    TransportCategory,
    TransportTransmissionType,
    TransportRentDuration,
    TransportEngineType,
    TransportDriveType,
    TransportBodyType,
    TransportCondition,
)
from ..models import TransportBrand, TransportModel, Advertisement


class TransportCreateSerializer(AdvertisementCreateSerializer):
    """Сериализатор создания транспорта."""

    transport_type_of_service = serializers.ChoiceField(
        choices=TransportTypeOfService.choices, required=True
    )
    transport_type = serializers.ChoiceField(choices=TransportType.choices, required=False)
    transport_category = serializers.ChoiceField(choices=TransportCategory.choices, required=True)
    transport_brand = serializers.SlugRelatedField(
        queryset=TransportBrand.objects.all(), slug_field="slug", required=False
    )
    transport_model = serializers.SlugRelatedField(
        queryset=TransportModel.objects.all(),
        slug_field="slug",
        required=False,
    )
    transport_engine_type = serializers.ChoiceField(
        choices=TransportEngineType.choices, required=False
    )
    transport_drive_type = serializers.ChoiceField(
        choices=TransportDriveType.choices, required=False
    )
    transport_transmission_type = serializers.ChoiceField(
        choices=TransportTransmissionType.choices, required=False
    )
    transport_body_type = serializers.ChoiceField(choices=TransportBodyType.choices, required=False)
    transport_condition = serializers.ChoiceField(
        choices=TransportCondition.choices, required=False
    )
    transport_rent_duration = serializers.ChoiceField(choices=TransportRentDuration, required=False)

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
            "transport_rent_duration",
        )


class TransportBrandSerializer(serializers.ModelSerializer):
    """Сериализатор брэндов транспорта."""

    class Meta:
        model = TransportBrand
        fields = (
            "name",
            "slug",
        )


class TransportModelSerializer(serializers.ModelSerializer):
    """Сериализатор модели транспорта."""

    class Meta:
        model = TransportModel
        fields = (
            "name",
            "slug",
        )

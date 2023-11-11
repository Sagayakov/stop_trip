from rest_framework import serializers

from .advertisement_serializers import AdvertisementCreateSerializer
from ..constants import (
    TransportTypeOfService,
    TransportType,
    TransportCategory,
    TransportEngineType,
    TransportDriveType,
    TransportTransmissionType,
    TransportBodyType,
    TransportCondition,
)
from ..models import TransportBrand, TransportModel, Advertisement


class TransportCreateSerializer(AdvertisementCreateSerializer):
    transport_type_of_service = serializers.ChoiceField(
        choices=TransportTypeOfService.choices, required=True
    )
    transport_type = serializers.ChoiceField(choices=TransportType.choices, required=True)
    transport_category = serializers.ChoiceField(choices=TransportCategory.choices, required=True)
    transport_brand = serializers.PrimaryKeyRelatedField(
        queryset=TransportBrand.objects.all(),
        required=True,
    )
    transport_model = serializers.PrimaryKeyRelatedField(
        queryset=TransportModel.objects.all(),
        required=True,
    )
    transport_engine_type = serializers.ChoiceField(
        choices=TransportEngineType.choices, required=True
    )
    transport_drive_type = serializers.ChoiceField(
        choices=TransportDriveType.choices, required=True
    )
    transport_engine_volume = serializers.IntegerField(required=True, allow_null=False)
    transport_year_of_production = serializers.IntegerField(required=True, allow_null=False)
    transport_transmission_type = serializers.ChoiceField(
        choices=TransportTransmissionType.choices,
        required=True,
    )
    transport_body_type = serializers.ChoiceField(choices=TransportBodyType.choices, required=True)
    transport_condition = serializers.ChoiceField(choices=TransportCondition.choices, required=True)
    transport_passengers_quality = serializers.IntegerField(required=True, allow_null=False)
    transport_commission = serializers.IntegerField(required=True, allow_null=False)

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


#

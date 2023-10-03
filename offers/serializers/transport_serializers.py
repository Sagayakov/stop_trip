from rest_framework import serializers

from .advertisement_serializers import AdvertisementCreateSerializer
from ..models import TransportBrand, TransportModel, Advertisement


class TransportCreateSerializer(AdvertisementCreateSerializer):
    transport_brand = serializers.PrimaryKeyRelatedField(
        queryset=TransportBrand.objects.all(), allow_null=True, allow_empty=True
    )
    transport_model = serializers.PrimaryKeyRelatedField(
        queryset=TransportModel.objects.all(), allow_null=True, allow_empty=True
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
        )

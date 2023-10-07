from rest_framework import serializers

from .advertisement_serializers import AdvertisementCreateSerializer
from ..models import Advertisement


class TaxiCreateSerializer(AdvertisementCreateSerializer):
    taxi_unit = serializers.CharField(required=True)
    taxi_type = serializers.CharField(required=True)

    class Meta:
        model = Advertisement
        fields = AdvertisementCreateSerializer.Meta.fields + (
            "taxi_unit",
            "taxi_type",
        )

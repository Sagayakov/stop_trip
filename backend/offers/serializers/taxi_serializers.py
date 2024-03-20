from rest_framework import serializers

from .advertisement_serializers import AdvertisementCreateSerializer
from ..constants import TaxiUnit, TaxiType
from ..models import Advertisement


class TaxiCreateSerializer(AdvertisementCreateSerializer):
    """Сериализатор создания объявления на такси."""

    taxi_unit = serializers.ChoiceField(choices=TaxiUnit.choices, required=False)
    taxi_type = serializers.ChoiceField(choices=TaxiType.choices, required=False)

    class Meta:
        model = Advertisement
        fields = AdvertisementCreateSerializer.Meta.fields + (
            "taxi_unit",
            "taxi_type",
        )

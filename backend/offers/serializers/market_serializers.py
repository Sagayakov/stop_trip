from rest_framework import serializers

from .advertisement_serializers import AdvertisementCreateSerializer
from ..models import Advertisement
from ..constants import MarketCondition


class MarketCreateSerializer(AdvertisementCreateSerializer):
    """Сериализатор создания купли-продажи."""

    market_condition = serializers.ChoiceField(choices=MarketCondition.choices, required=False)

    class Meta:
        model = Advertisement
        fields = AdvertisementCreateSerializer.Meta.fields + ("market_condition",)

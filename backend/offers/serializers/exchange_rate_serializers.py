from rest_framework import serializers

from .advertisement_serializers import AdvertisementCreateSerializer
from ..models import Advertisement, Currency


class ExchangeRateCreateSerializer(AdvertisementCreateSerializer):
    """Сериализатор создания объявления с валютной парой."""

    proposed_currency = serializers.PrimaryKeyRelatedField(
        queryset=Currency.objects.all(), required=True
    )
    exchange_for = serializers.PrimaryKeyRelatedField(
        queryset=Currency.objects.all(), required=True
    )
    exchange_rate = serializers.FloatField(required=True, allow_null=False)

    class Meta(AdvertisementCreateSerializer.Meta):
        model = Advertisement
        fields = AdvertisementCreateSerializer.Meta.fields + (
            "proposed_currency",
            "exchange_for",
            "exchange_rate",
        )

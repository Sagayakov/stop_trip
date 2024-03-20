from rest_framework import serializers

from .advertisement_serializers import AdvertisementCreateSerializer
from ..models import Advertisement, Currency


class ExchangeRateCreateSerializer(AdvertisementCreateSerializer):
    """Сериализатор создания объявления с валютной парой."""

    proposed_currency = serializers.SlugRelatedField(
        queryset=Currency.objects.all(), slug_field="short_name", required=True
    )
    exchange_for = serializers.SlugRelatedField(
        slug_field="short_name", queryset=Currency.objects.all(), required=True
    )

    class Meta(AdvertisementCreateSerializer.Meta):
        model = Advertisement
        fields = AdvertisementCreateSerializer.Meta.fields + (
            "proposed_currency",
            "exchange_for",
            "exchange_rate",
        )

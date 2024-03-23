from rest_framework import serializers

from .advertisement_serializers import AdvertisementCreateSerializer
from ..models import Advertisement


class ExcursionCreateSerializer(AdvertisementCreateSerializer):
    """Сериализатор создания экскурсий"""

    class Meta:
        model = Advertisement
        fields = AdvertisementCreateSerializer.Meta.fields + (
            "excursion_food",
            "excursion_transfer",
        )

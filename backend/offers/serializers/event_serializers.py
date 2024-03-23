from rest_framework import serializers

from .advertisement_serializers import AdvertisementCreateSerializer
from ..models import Advertisement


class EventCreateSerializer(AdvertisementCreateSerializer):
    """Сериализатор создания события."""

    start_date = serializers.DateTimeField(required=True)

    class Meta:
        model = Advertisement
        fields = AdvertisementCreateSerializer.Meta.fields + (
            "start_date",
            "end_date",
            "is_online",
        )

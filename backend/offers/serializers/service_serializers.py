from rest_framework import serializers

from .advertisement_serializers import AdvertisementCreateSerializer
from ..models import Advertisement


class ServiceCreateSerializer(AdvertisementCreateSerializer):
    """Сериализатор создания сервиса."""

    service_home_visit = serializers.BooleanField(required=True)

    class Meta:
        model = Advertisement
        fields = AdvertisementCreateSerializer.Meta.fields + ("service_home_visit",)

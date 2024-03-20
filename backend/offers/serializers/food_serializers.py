from rest_framework import serializers

from .advertisement_serializers import AdvertisementCreateSerializer
from ..models import Advertisement


class FoodCreateSerializer(AdvertisementCreateSerializer):
    """Сериализатор создания еды"""

    class Meta:
        model = Advertisement
        fields = AdvertisementCreateSerializer.Meta.fields + (
            "food_delivery",
            "food_establishment",
            "food_type",
        )

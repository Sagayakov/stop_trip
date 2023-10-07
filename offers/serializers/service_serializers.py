from rest_framework import serializers

from .advertisement_serializers import AdvertisementCreateSerializer
from ..models import Advertisement


class ServiceCreateSerializer(AdvertisementCreateSerializer):
    home_visit = serializers.BooleanField(required=True)

    class Meta:
        model = Advertisement
        fields = AdvertisementCreateSerializer.Meta.fields + (
            "home_visit",
        )

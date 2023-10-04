from rest_framework import serializers

from .advertisement_serializers import AdvertisementCreateSerializer
from ..models import Advertisement


class JobCreateSerializer(AdvertisementCreateSerializer):
    class Meta:
        model = Advertisement
        fields = AdvertisementCreateSerializer.Meta.fields + (
            "job_type",
            "job_duration",
            "job_payment_type",
            "job_experience",
        )

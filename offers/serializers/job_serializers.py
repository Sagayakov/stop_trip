from rest_framework import serializers

from .advertisement_serializers import AdvertisementCreateSerializer
from ..models import Advertisement


class JobCreateSerializer(AdvertisementCreateSerializer):
    job_type = serializers.CharField(required=True)
    job_duration = serializers.CharField(required=True)
    job_payment_type = serializers.CharField(required=True)
    job_experience = serializers.BooleanField(required=True)

    class Meta:
        model = Advertisement
        fields = AdvertisementCreateSerializer.Meta.fields + (
            "job_type",
            "job_duration",
            "job_payment_type",
            "job_experience",
        )

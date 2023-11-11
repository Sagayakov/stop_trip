from rest_framework import serializers

from .advertisement_serializers import AdvertisementCreateSerializer
from ..models import Advertisement
from ..constants import JobType, JobDurationType, JobPaymentType


class JobCreateSerializer(AdvertisementCreateSerializer):
    """Сериализатор создания работы."""

    job_type = serializers.ChoiceField(choices=JobType.choices, required=True)
    job_duration = serializers.ChoiceField(choices=JobDurationType.choices, required=True)
    job_payment_type = serializers.ChoiceField(choices=JobPaymentType.choices, required=True)
    job_experience = serializers.BooleanField(required=True)

    class Meta:
        model = Advertisement
        fields = AdvertisementCreateSerializer.Meta.fields + (
            "job_type",
            "job_duration",
            "job_payment_type",
            "job_experience",
        )

from rest_framework import serializers

from .advertisement_serializers import AdvertisementCreateSerializer
from ..models import Advertisement
from ..constants import DocumentType, DocumentDuration


class DocumentCreateSerializers(AdvertisementCreateSerializer):
    """Сериализатор создания документов."""

    document_type = serializers.ChoiceField(choices=DocumentType.choices, required=False)
    document_duration = serializers.ChoiceField(choices=DocumentDuration.choices, required=False)

    class Meta:
        model = Advertisement
        fields = AdvertisementCreateSerializer.Meta.fields + (
            "document_type",
            "document_duration",
        )

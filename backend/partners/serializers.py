from rest_framework import serializers

from .models import PartnerModel, PartnerImageModel


class PartnerImageSerializer(serializers.ModelSerializer):
    """Сериализатор картинок объявления."""

    class Meta:
        model = PartnerImageModel
        fields = (
            "id",
            "image",
        )


class PartnerListSerializer(serializers.ModelSerializer):
    """Список партнеров"""

    images = PartnerImageSerializer(many=True)

    class Meta:
        model = PartnerModel
        fields = "__all__"

from rest_framework import serializers

from ..models import Advertisement, AdvertisementImage


class AdvertisementCreateSerializer(serializers.ModelSerializer):
    """Сериализатор создания объявления."""

    class Meta:
        model = Advertisement
        fields = (
            "category",
            "title",
            "price",
            "description",
        )


class AdvertisementImageSerializer(serializers.ModelSerializer):
    """Сериализатор картинок объявления."""

    class Meta:
        model = AdvertisementImage
        fields = ("image",)


class AdvertisementListSerializer(serializers.ModelSerializer):
    """Список объявлений."""

    images = AdvertisementImageSerializer(many=True)

    class Meta:
        model = Advertisement
        fields = (
            "category",
            "title",
            "price",
            "description",
            "images",
        )


class AdvertisementRetrieveSerializer(serializers.ModelSerializer):
    """Деталка объявления."""

    images = AdvertisementImageSerializer(many=True)

    class Meta:
        model = Advertisement
        fields = "__all__"

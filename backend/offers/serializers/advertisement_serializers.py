from rest_framework import serializers

from users.models import User
from ..constants import CategoryChoices
from ..models import Advertisement, AdvertisementImage


class AdvertisementCreateSerializer(serializers.ModelSerializer):
    """Сериализатор создания объявления."""

    owner = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=False)
    category = serializers.ChoiceField(choices=CategoryChoices.choices, required=True)
    title = serializers.CharField(required=True, max_length=100)

    # price = serializers.IntegerField(required=True, allow_null=True)

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
            "id",
            "category",
            "title",
            "price",
            "description",
            "images",
        )


class AdvertisementRetrieveSerializer(serializers.ModelSerializer):
    """Сериализатор деталки объявления."""

    images = AdvertisementImageSerializer(many=True)
    # reviews = ReviewSerializer(many=True, read_only=True)

    class Meta:
        model = Advertisement
        fields = "__all__"


class AdvertisementUpdateSerializer(serializers.ModelSerializer):
    """Сериализатор обновления объявления."""

    owner = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=False)
    category = serializers.CharField(required=False)
    title = serializers.CharField(required=False)

    # price = serializers.IntegerField(required=False)

    class Meta:
        model = Advertisement
        exclude = (
            "is_published",
            "date_create",
            "date_update",
            "slug",
        )

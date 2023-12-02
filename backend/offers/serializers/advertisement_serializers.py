from rest_framework import serializers

from users.models import User
from ..constants import CategoryChoices
from ..models import Advertisement, AdvertisementImage, Country, City, Region


class AdvertisementCreateSerializer(serializers.ModelSerializer):
    """Сериализатор создания объявления."""

    country = serializers.PrimaryKeyRelatedField(
        queryset=Country.objects.all(),
        required=True,
    )

    region = serializers.PrimaryKeyRelatedField(
        queryset=Region.objects.all(),
        required=True,
    )

    city = serializers.PrimaryKeyRelatedField(
        queryset=City.objects.all(),
        required=True,
    )

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
            "coordinates",
            "country",
            "region",
            "city",
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
            "date_create",
        )


class AdvertisementRetrieveSerializer(serializers.ModelSerializer):
    """Сериализатор деталки объявления."""

    images = AdvertisementImageSerializer(many=True)

    class Meta:
        model = Advertisement
        fields = "__all__"


class AdvertisementUpdateSerializer(serializers.ModelSerializer):
    """Сериализатор обновления объявления."""

    country = serializers.PrimaryKeyRelatedField(
        queryset=Country.objects.all(),
        required=False,
    )

    region = serializers.PrimaryKeyRelatedField(
        queryset=Region.objects.all(),
        required=False,
    )

    city = serializers.PrimaryKeyRelatedField(
        queryset=City.objects.all(),
        required=False,
    )

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

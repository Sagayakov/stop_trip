from rest_framework import serializers
from users.models import User
from ..constants import CategoryChoices
from ..models import Advertisement, AdvertisementImage, PropertyAmenity
from countries.models import Country, Region, City
from countries.serializers import CountrySerializer, RegionSerializer, CitySerializer


class AdvertisementCreateSerializer(serializers.ModelSerializer):
    """Сериализатор создания объявления."""

    owner = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), required=False
    )
    country = serializers.PrimaryKeyRelatedField(
        queryset=Country.objects.all(), required=True
    )
    region = serializers.PrimaryKeyRelatedField(
        queryset=Region.objects.all(), required=True
    )
    city = serializers.PrimaryKeyRelatedField(
        queryset=City.objects.all(), required=True
    )
    category = serializers.ChoiceField(choices=CategoryChoices.choices, required=True)
    title = serializers.CharField(required=True, max_length=100)

    # price = serializers.IntegerField(required=True, allow_null=True)

    class Meta:
        model = Advertisement
        fields = (
            "category",
            "country",
            "region",
            "city",
            "title",
            "price",
            "description",
            "coordinates",
        )


class AdvertisementImageSerializer(serializers.ModelSerializer):
    """Сериализатор картинок объявления."""

    class Meta:
        model = AdvertisementImage
        fields = ("image",)


class AdvertisementPropertyAmenitySerializer(serializers.ModelSerializer):
    """Сериализатор удобств объявления."""

    class Meta:
        model = PropertyAmenity
        fields = ("name",)


class UserSerializer(serializers.ModelSerializer):
    """Сериализатор вывода юзера в объявлении."""

    class Meta:
        model = User
        fields = ("id", "full_name", "phone", "email", "date_joined")


class AdvertisementListSerializer(serializers.ModelSerializer):
    """Список объявлений."""

    images = AdvertisementImageSerializer(many=True)
    owner = UserSerializer(read_only=True)
    country = CountrySerializer(read_only=True)
    region = RegionSerializer(read_only=True)
    city = CitySerializer(read_only=True)

    class Meta:
        model = Advertisement
        fields = (
            "id",
            "category",
            "country",
            "region",
            "city",
            "title",
            "price",
            "description",
            "images",
            "date_create",
            "owner",
        )


class AdvertisementRetrieveSerializer(serializers.ModelSerializer):
    """Сериализатор деталки объявления."""

    images = AdvertisementImageSerializer(many=True)
    country = CountrySerializer(read_only=True)
    region = RegionSerializer(read_only=True)
    city = CitySerializer(read_only=True)
    property_amenities = AdvertisementPropertyAmenitySerializer(
        many=True, required=False
    )
    owner = UserSerializer(read_only=True)

    class Meta:
        model = Advertisement
        fields = "__all__"


class AdvertisementUpdateSerializer(serializers.ModelSerializer):
    """Сериализатор обновления объявления."""

    owner = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), required=False
    )
    country = serializers.PrimaryKeyRelatedField(
        queryset=Country.objects.all(), required=False
    )
    region = serializers.PrimaryKeyRelatedField(
        queryset=Region.objects.all(), required=False
    )
    city = serializers.PrimaryKeyRelatedField(
        queryset=City.objects.all(), required=False
    )
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

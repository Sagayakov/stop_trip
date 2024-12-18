from drf_spectacular.utils import extend_schema_field
from rest_framework import serializers

from countries.models import Country, Region, City
from countries.serializers import CountrySerializer, RegionSerializer, CitySerializer
from forbidden_words.models import ForbiddenWords
from users.serializers import (
    UserForListAdvertisementSerializer,
    UserForRetrieveAdvertisementSerializer,
)
from ..constants import CategoryChoices
from ..models import (
    Advertisement,
    AdvertisementImage,
    PropertyAmenity,
    TransportBrand,
    TransportModel,
    Currency,
)
from ..utils import compression_photo, change_link


class AdvertisementCreateSerializer(serializers.ModelSerializer):
    """Сериализатор создания объявления."""

    owner = serializers.HiddenField(default=serializers.CurrentUserDefault())
    country = serializers.SlugRelatedField(
        queryset=Country.objects.all(), slug_field="slug", required=True
    )
    region = serializers.SlugRelatedField(
        queryset=Region.objects.all(), slug_field="slug", required=True
    )
    city = serializers.SlugRelatedField(
        queryset=City.objects.all(), slug_field="slug", required=True
    )
    category = serializers.ChoiceField(choices=CategoryChoices.choices, required=True)
    title = serializers.CharField(required=True, max_length=100)

    class Meta:
        model = Advertisement
        fields = (
            "owner",
            "category",
            "country",
            "region",
            "city",
            "title",
            "price",
            "description",
            "coordinates",
            "youtube",
        )

    def create(self, validated_data):
        images = validated_data.pop("images", [])
        if youtube_link := validated_data.get("youtube"):
            validated_data["youtube"] = change_link(youtube_link)
        advertisement = super().create(validated_data)
        if images:
            AdvertisementImage.objects.bulk_create(
                compression_photo(advertisement=advertisement, images=images)
            )
        return advertisement

    def validate(self, attrs):
        errors = {}

        title = attrs.get("title")
        forbidden_words = ForbiddenWords.objects.first()
        if forbidden_words and title:
            all_words = forbidden_words.russian_words + forbidden_words.english_words

            for word in all_words:
                if word.lower() in title.lower():
                    errors["title"] = "Название объявления содержит запрещенное слово."

        if "proposed_currency" in attrs.keys() and "exchange_for" in attrs.keys():
            if attrs["proposed_currency"] == attrs["exchange_for"]:
                errors["exchange_for"] = "Валюты не могут быть одинаковы"

        if errors:
            raise serializers.ValidationError(errors)

        return attrs


class AdvertisementImageSerializer(serializers.ModelSerializer):
    """Сериализатор картинок объявления."""

    image = serializers.SerializerMethodField()

    class Meta:
        model = AdvertisementImage
        fields = (
            "id",
            "image",
            "size",
        )

    @extend_schema_field(serializers.FloatField)
    def get_size(self, obj: AdvertisementImage) -> float:
        return float(obj.image.size)

    @extend_schema_field(serializers.CharField)
    def get_image(self, obj: AdvertisementImage) -> str | None:
        return obj.image.url if obj.image else None


class AdvertisementPropertyAmenitySerializer(serializers.ModelSerializer):
    """Сериализатор удобств объявления."""

    class Meta:
        model = PropertyAmenity
        fields = ("name", "slug")


class MyAdvertisementSerializer(serializers.ModelSerializer):
    """Сериализатор объявлений пользователя."""

    images = AdvertisementImageSerializer(many=True)
    country = CountrySerializer(read_only=True)
    region = RegionSerializer(read_only=True)
    city = CitySerializer(read_only=True)
    proposed_currency = serializers.ReadOnlyField(source="proposed_currency.short_name")
    exchange_for = serializers.ReadOnlyField(source="exchange_for.short_name")

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
            "slug",
            "proposed_currency",
            "exchange_for",
            "exchange_rate",
            "is_published",
        )


class AdvertisementListSerializer(serializers.ModelSerializer):
    """Список объявлений."""

    images = AdvertisementImageSerializer(many=True)
    owner = UserForListAdvertisementSerializer(read_only=True)
    country = CountrySerializer(read_only=True)
    region = RegionSerializer(read_only=True)
    city = CitySerializer(read_only=True)
    proposed_currency = serializers.ReadOnlyField(source="proposed_currency.short_name")
    exchange_for = serializers.ReadOnlyField(source="exchange_for.short_name")

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
            "slug",
            "owner",
            "proposed_currency",
            "exchange_for",
            "exchange_rate",
            "is_published",
        )


class AdvertisementRetrieveSerializer(serializers.ModelSerializer):
    """Сериализатор деталки объявления."""

    images = AdvertisementImageSerializer(many=True)
    country = CountrySerializer(read_only=True)
    region = RegionSerializer(read_only=True)
    city = CitySerializer(read_only=True)
    property_amenities = AdvertisementPropertyAmenitySerializer(many=True, required=False)
    owner = UserForRetrieveAdvertisementSerializer(read_only=True)
    proposed_currency = serializers.ReadOnlyField(source="proposed_currency.short_name")
    exchange_for = serializers.ReadOnlyField(source="exchange_for.short_name")
    transport_brand = serializers.ReadOnlyField(source="transport_brand.slug")
    transport_model = serializers.ReadOnlyField(source="transport_model.slug")

    class Meta:
        model = Advertisement
        fields = "__all__"


class AdvertisementUpdateSerializer(serializers.ModelSerializer):
    """Сериализатор обновления объявления."""

    owner = serializers.HiddenField(default=serializers.CurrentUserDefault())
    country = serializers.SlugRelatedField(
        queryset=Country.objects.all(), slug_field="slug", required=False
    )
    region = serializers.SlugRelatedField(
        queryset=Region.objects.all(), slug_field="slug", required=False
    )
    city = serializers.SlugRelatedField(
        queryset=City.objects.all(), slug_field="slug", required=False
    )
    category = serializers.CharField(required=False)
    title = serializers.CharField(required=False)

    # для транспорта
    transport_brand = serializers.SlugRelatedField(
        queryset=TransportBrand.objects.all(),
        slug_field="slug",
        required=False,
    )
    transport_model = serializers.SlugRelatedField(
        queryset=TransportModel.objects.all(),
        slug_field="slug",
        required=False,
    )

    # для валют
    proposed_currency = serializers.SlugRelatedField(
        queryset=Currency.objects.all(), slug_field="short_name", required=False
    )
    exchange_for = serializers.SlugRelatedField(
        slug_field="short_name", queryset=Currency.objects.all(), required=False
    )

    # для удобств недвижимости
    property_amenities = serializers.SlugRelatedField(
        queryset=PropertyAmenity.objects.all(), slug_field="slug", required=False, many=True
    )

    class Meta:
        model = Advertisement
        exclude = (
            "date_create",
            "date_update",
            "slug",
        )

    def update(self, instance, validated_data):
        upload_images = validated_data.pop("upload_images", [])
        delete_images = validated_data.pop("delete_images", [])
        if youtube_link := validated_data.get("youtube"):
            validated_data["youtube"] = change_link(youtube_link)
        advertisement = super().update(instance, validated_data)

        if delete_images:
            AdvertisementImage.objects.filter(advertisement=instance, id__in=delete_images).delete()
        if upload_images:
            AdvertisementImage.objects.bulk_create(
                compression_photo(advertisement=advertisement, images=upload_images)
            )
        return advertisement

    def validate(self, attrs):
        errors = {}

        title = attrs.get("title")
        forbidden_words = ForbiddenWords.objects.first()
        if forbidden_words and title:
            all_words = forbidden_words.russian_words + forbidden_words.english_words

            for word in all_words:
                if word.lower() in title.lower():
                    errors["title"] = "Название объявления содержит запрещенное слово."

        if "proposed_currency" in attrs.keys() and "exchange_for" in attrs.keys():
            if attrs["proposed_currency"] == attrs["exchange_for"]:
                errors["exchange_for"] = "Валюты не могут быть одинаковы"

        if errors:
            raise serializers.ValidationError(errors)

        return attrs

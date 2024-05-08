from rest_framework import serializers

from offers.models import Advertisement
from offers.serializers import AdvertisementListSerializer
from .models import FavoriteModel


class FavoriteSerializer(serializers.ModelSerializer):
    """Сериализатор одного лайка"""

    owner = serializers.HiddenField(default=serializers.CurrentUserDefault())
    advertisement = serializers.SlugRelatedField(
        queryset=Advertisement.objects.all(),
        slug_field="slug",
        required=True,
    )

    class Meta:
        model = FavoriteModel
        fields = ("owner", "advertisement")


class FavoriteListSerializer(serializers.ModelSerializer):
    """Сериализатор вывода лайков."""

    advertisement = AdvertisementListSerializer(read_only=True)

    class Meta:
        model = FavoriteModel
        fields = ("id", "advertisement")

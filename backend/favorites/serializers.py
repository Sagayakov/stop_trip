from rest_framework import serializers

from offers.models import Advertisement
from offers.serializers import AdvertisementListSerializer
from .models import LikeModel


class LikeSerializer(serializers.ModelSerializer):
    """Сериализатор одного лайка"""

    owner = serializers.HiddenField(default=serializers.CurrentUserDefault())
    advertisement = serializers.SlugRelatedField(
        queryset=Advertisement.objects.all(),
        slug_field="slug",
        required=True,
    )

    class Meta:
        model = LikeModel
        fields = "__all__"


class LikeListSerializer(serializers.ModelSerializer):
    """Сериализатор вывода лайков."""

    advertisement = AdvertisementListSerializer(read_only=True)

    class Meta:
        model = LikeModel
        fields = (
            "id",
            "advertisement",
        )

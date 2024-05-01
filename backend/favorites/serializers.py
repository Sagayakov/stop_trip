from rest_framework import serializers

from offers.models import Advertisement
from .models import LikeModel


class LikeSerializer(serializers.ModelSerializer):
    owner = serializers.HiddenField(default=serializers.CurrentUserDefault())
    advertisement = serializers.SlugRelatedField(
        queryset=Advertisement.objects.all(),
        slug_field="slug",
        required=True,
    )

    class Meta:
        model = LikeModel
        fields = "__all__"

from rest_framework import serializers
from ..models import Rate


class RateSerializer(serializers.ModelSerializer):
    """ Сериализатор рейтинга объявлений """

    class Meta:
        model = Rate
        fields = (
            "rating",
            "comment"
        )


class RateDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rate
        exclude = ("is_active",)

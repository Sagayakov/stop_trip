from rest_framework import serializers
from ..models import Rate


class RateSerializer(serializers.ModelSerializer):
    """Сериализатор рейтинга объявлений."""

    class Meta:
        model = Rate
        fields = (
            "from_user",
            "rating",
            "comment",
            "date_created",
        )


class RateChangeSerializer(serializers.ModelSerializer):
    """Сериализатор изменения рейтинга."""

    class Meta:
        model = Rate
        fields = (
            "rating",
            "comment", )



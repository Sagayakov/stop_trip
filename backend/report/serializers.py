from rest_framework import serializers

from users.models import User
from .models import ReportModel
from offers.models import Advertisement


class ReportSerializer(serializers.ModelSerializer):
    """Сериализатор создания обратной связи"""

    from_user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=False)
    advertisement = serializers.SlugRelatedField(
        queryset=Advertisement.objects.all(), slug_field="slug", required=False
    )

    class Meta:
        model = ReportModel
        fields = ("from_user", "advertisement", "reason", "description")

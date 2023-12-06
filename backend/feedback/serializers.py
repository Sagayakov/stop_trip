from rest_framework import serializers

from users.models import User
from .models import FeedBackModel


class FeedBackCreateSerializer(serializers.ModelSerializer):
    """Сериализатор создания обратной связи"""

    owner = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=False)
    feedback = serializers.CharField(required=True, max_length=900)

    class Meta:
        model = FeedBackModel
        fields = ("owner", "feedback")

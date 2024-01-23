from rest_framework import serializers

from ..models import UserMessenger


class UserMessengerSerializer(serializers.ModelSerializer):
    """Сериализатор мессенджеров пользователя."""

    messanger_name = serializers.CharField(source="messanger.name")

    class Meta:
        model = UserMessenger
        fields = (
            "messanger_name",
            "link_to_user",
        )

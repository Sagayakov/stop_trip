from rest_framework import serializers

from ..models import UserMessenger, Messenger


class MessengerSerializer(serializers.ModelSerializer):
    """Сериализатор вывода информации об одном мессенджере"""

    class Meta:
        model = Messenger
        fields = "__all__"


class MessengerCreateSerializer(serializers.ModelSerializer):
    """Сериализатор создания/редактирования мессенджеров пользователя."""

    owner = serializers.HiddenField(default=serializers.CurrentUserDefault())
    messenger = serializers.PrimaryKeyRelatedField(queryset=Messenger.objects.all())

    class Meta:
        model = UserMessenger
        fields = (
            "owner",
            "messenger",
            "link_to_user",
        )


class MessengerListSerializer(serializers.ModelSerializer):
    """Сериализатор вывода мессенджеров юзера"""

    messenger = MessengerSerializer(read_only=True)

    class Meta:
        model = UserMessenger
        fields = (
            "messenger",
            "link_to_user",
        )

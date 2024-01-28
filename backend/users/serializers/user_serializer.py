from djoser.serializers import UserCreateSerializer
from phonenumber_field.serializerfields import PhoneNumberField
from rest_framework import serializers

from .messenger_serializer import MessengerListSerializer
from ..models import User


class UserDjoserSerializer(UserCreateSerializer):
    """Сериализатор пользователя для авторизации через Djoser."""

    phone = PhoneNumberField()

    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = (
            "id",
            "phone",
            "email",
            "password",
            "full_name",
        )


class UserSerializer(serializers.ModelSerializer):
    """Сериализатор пользователя."""

    class Meta:
        model = User
        fields = (
            "id",
            "full_name",
            "phone",
            "email",
            "date_joined",
        )


class UserForListAdvertisementSerializer(serializers.ModelSerializer):
    """Сериализатор пользоваля для листинга объявлений."""

    avg_rating = serializers.FloatField()
    rating_num = serializers.IntegerField()
    my_rating = serializers.IntegerField()

    class Meta:
        model = User
        fields = (
            "id",
            "full_name",
            "avg_rating",
            "rating_num",
            "my_rating",
        )


class UserForRetrieveAdvertisementSerializer(serializers.ModelSerializer):
    """Сериализатор пользоваля для деталки объявлений."""

    user_messengers = MessengerListSerializer(many=True)
    avg_rating = serializers.FloatField()
    rating_num = serializers.IntegerField()
    my_rating = serializers.IntegerField()

    class Meta:
        model = User
        fields = (
            "id",
            "full_name",
            "phone",
            "email",
            "date_joined",
            "avg_rating",
            "rating_num",
            "my_rating",
            "user_messengers",
        )

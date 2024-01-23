from djoser.serializers import UserCreateSerializer
from phonenumber_field.serializerfields import PhoneNumberField
from rest_framework import serializers

from ..models import User


class UserDjoserSerializer(UserCreateSerializer):
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
    """Сериализатор вывода юзера в объявлении."""

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
        )

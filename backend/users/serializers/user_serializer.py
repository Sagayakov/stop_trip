from djoser.serializers import UserCreateSerializer
from phonenumber_field.serializerfields import PhoneNumberField
from rest_framework import serializers
from forbidden_words.models import ForbiddenWords
from ..models import User, Rate


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
    rating_num = serializers.FloatField()
    my_rate = serializers.SerializerMethodField()

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
            "my_rate",
        )

    def get_my_rate(self, user):
        try:
            from_user = self.context["request"].user
            my_rating = Rate.objects.get(from_user=from_user.pk, to_user=user.pk).rating
        except Rate.DoesNotExist:
            my_rating = None
        return my_rating

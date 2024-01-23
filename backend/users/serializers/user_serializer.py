from djoser.serializers import UserCreateSerializer
from phonenumber_field.serializerfields import PhoneNumberField
from ..models import User


class UserSerializer(UserCreateSerializer):
    phone = PhoneNumberField()

    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = (
            "id",
            "phone",
            "email",
            "password",
            "full_name",
            "messenger",
        )

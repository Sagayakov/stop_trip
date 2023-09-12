from django.utils.translation import gettext as _
from rest_framework import serializers, status
from django.contrib.auth import get_user_model


from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model

User = get_user_model()


class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ("id", "email", "password")

from djoser.serializers import UserCreateSerializer
from phonenumber_field.serializerfields import PhoneNumberField
from rest_framework import serializers
from forbidden_words.models import ForbiddenWords
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
        )

    # @staticmethod
    # def validate_full_name(value):
    #     """Проверяет, содержит ли поле full_name запрещенные слова."""
    #     forbidden_words = ForbiddenWords.objects.first()
    #
    #     if forbidden_words:
    #         all_words = forbidden_words.russian_words + forbidden_words.english_words
    #
    #         for word in all_words:
    #             if word.lower() in value.lower():
    #                 raise serializers.ValidationError("Имя содержит запрещенное слово.")
    #
    #     return value

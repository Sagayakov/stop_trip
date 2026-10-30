from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.core.exceptions import ValidationError
from django.db import models
from django.utils import timezone
from phonenumber_field.modelfields import PhoneNumberField

from forbidden_words.utils import find_forbidden_word
from ..managers import CustomUserManager


class User(AbstractBaseUser, PermissionsMixin):
    full_name = models.CharField(max_length=50, verbose_name="Имя пользователя")
    phone = PhoneNumberField("Телефон", blank=True, null=True)
    email = models.EmailField("Почта", unique=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["full_name", "phone"]

    objects = CustomUserManager()

    def __str__(self):
        return self.email

    def clean(self):
        """Проверяет, содержит ли поле full_name запрещенные слова."""
        if find_forbidden_word(self.full_name):
            raise ValidationError("Имя пользователя содержит запрещенное слово.")

    class Meta:
        verbose_name: str = "Пользователь"
        verbose_name_plural: str = "Пользователи"

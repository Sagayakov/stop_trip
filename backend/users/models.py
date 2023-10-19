from uuid import uuid4
from phonenumber_field.modelfields import PhoneNumberField

#
# class User(AbstractUser):
#     """Пользователи."""
#
#
#
#     def __str__(self) -> str:
#         return self.username
#
#     class Meta:
#         verbose_name: str = "Пользователь"
#         verbose_name_plural: str = "Пользователи"

from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils import timezone
from django.db import models
from django.utils.translation import gettext_lazy as _
from .managers import CustomUserManager


class User(AbstractBaseUser, PermissionsMixin):
    full_name = models.CharField(max_length=50, verbose_name="Имя пользователя")
    phone = PhoneNumberField("Телефон", blank=True, null=True)
    email = models.EmailField(_("email address"), unique=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["full_name", "phone"]

    objects = CustomUserManager()

    def __str__(self):
        return self.email

    class Meta:
        verbose_name: str = "Пользователь"
        verbose_name_plural: str = "Пользователи"

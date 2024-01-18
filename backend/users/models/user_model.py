from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils import timezone
from phonenumber_field.modelfields import PhoneNumberField
from django.core.exceptions import ValidationError

from forbidden_words.models import ForbiddenWords
from ..managers import CustomUserManager


class User(AbstractBaseUser, PermissionsMixin):
    full_name = models.CharField(max_length=50, verbose_name="Имя пользователя")
    phone = PhoneNumberField("Телефон", blank=True, null=True)
    email = models.EmailField("Почта", unique=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)
    # messenger = models.ManyToManyField(
    #     "users.UsersMessengers",
    #     verbose_name="Мессенджер",
    #     related_name="messengers",
    #     blank=True,
    # )

    # только одно поле
    messenger = models.ForeignKey(
        "users.Messengers",
        on_delete=models.CASCADE,
        related_name="messenger",
        verbose_name="Мессенджер",
        null=True,
        blank=True,
    )
    link_to_user = models.CharField("Ссылка на юзера")

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["full_name", "phone"]

    objects = CustomUserManager()

    def __str__(self):
        return self.email

    def clean(self):
        """Проверяет, содержит ли поле full_name запрещенные слова."""
        forbidden_words = ForbiddenWords.objects.first()

        if forbidden_words:
            all_words = forbidden_words.russian_words + forbidden_words.english_words

            for word in all_words:
                if word.lower() in self.full_name.lower():
                    raise ValidationError("Имя пользователя содержит запрещенное слово.")

    class Meta:
        verbose_name: str = "Пользователь"
        verbose_name_plural: str = "Пользователи"

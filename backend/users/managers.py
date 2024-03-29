from django.contrib.auth.base_user import BaseUserManager
from django.utils.translation import gettext_lazy as _

from forbidden_words.models import ForbiddenWords
from .queryset import UserQuerySet


class CustomUserManager(BaseUserManager):
    """Менеджер пользователей."""

    def get_queryset(self):
        return UserQuerySet(model=self.model, using=self._db, hints=self._hints)

    def create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError(_("The Email must be set"))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        forbidden_words = ForbiddenWords.objects.first()

        if forbidden_words:
            all_words = forbidden_words.russian_words + forbidden_words.english_words

            for word in all_words:
                if word.lower() in user.full_name.lower():
                    raise ValueError("Имя пользователя содержит запрещенное слово.")

        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError(_("Superuser must have is_staff=True."))

        if extra_fields.get("is_superuser") is not True:
            raise ValueError(_("Superuser must have is_superuser=True."))

        return self.create_user(email, password, **extra_fields)

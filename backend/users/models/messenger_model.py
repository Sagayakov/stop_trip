from django.db import models


class Messenger(models.Model):
    """Мессенджер"""

    name = models.CharField("Название", max_length=50)
    link_to_messenger = models.CharField("Ссылка на мессенджер", max_length=100)

    class Meta:
        verbose_name = "Мессенджер"
        verbose_name_plural = "Мессенджеры"
        ordering = ("name",)

    def __str__(self):
        return self.name


class UserMessenger(models.Model):
    """Адрес пользователя в мессенджере"""

    owner = models.ForeignKey(
        "users.User",
        on_delete=models.CASCADE,
        related_name="user_messengers",
        verbose_name="Пользователь",
    )
    messenger = models.ForeignKey(
        "users.Messenger",
        on_delete=models.CASCADE,
        related_name="user_messengers",
        verbose_name="Мессенджер",
    )

    link_to_user = models.CharField("Ссылка на пользователя", max_length=150)

    class Meta:
        verbose_name = "Мессенджер пользователя"
        verbose_name_plural = "Мессенджеры пользователей"
        ordering = ("owner",)

    def __str__(self):
        return f"{self.owner.full_name}: {self.messenger.link_to_messenger}{self.link_to_user}"

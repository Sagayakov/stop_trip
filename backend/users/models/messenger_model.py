from django.db import models


class Messengers(models.Model):
    """Мессенджер"""

    messenger = models.CharField("Название")
    link_to_messenger = models.CharField("Ссылка на мессенджер")

    class Meta:
        verbose_name = "Мессенджер"
        verbose_name_plural = "Мессенджеры"
        ordering = ("messenger",)

    def __str__(self):
        return self.messenger


class UsersMessengers(models.Model):
    """Адрес юзера в мессенджере"""

    owner = models.ForeignKey(
        "users.User",
        on_delete=models.CASCADE,
        related_name="user_messenger",
        verbose_name="Создатель",
    )
    messenger = models.ForeignKey(
        "users.Messengers",
        on_delete=models.CASCADE,
        related_name="user_messenger",
        verbose_name="Мессенджер",
        null=True,
        blank=True,
    )
    link_to_user = models.CharField("Ссылка на юзера")

    class Meta:
        verbose_name = "Мессенджер"
        verbose_name_plural = "Мессенджеры"
        ordering = ("messenger",)

    def __str__(self):
        return f"{self.owner.full_name}: {self.messenger.link_to_messenger}{self.link_to_user}"

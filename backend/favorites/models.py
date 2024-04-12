from django.db import models

from offers.models import Advertisement


class LikeModel(models.Model):
    """Лайки пользователя"""

    owner = models.ForeignKey(
        "users.User",
        related_name="likes",
        on_delete=models.CASCADE,
        verbose_name="Создатель",
        null=True,
    )
    advertisement = models.ForeignKey(
        Advertisement,
        related_name="likes",
        on_delete=models.CASCADE,
        verbose_name="Объявление",
    )

    class Meta:
        verbose_name = "Лайк"
        verbose_name_plural = "Лайки"

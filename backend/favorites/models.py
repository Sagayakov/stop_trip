from django.db import models


class FavoriteModel(models.Model):
    """Лайки пользователя"""

    owner = models.ForeignKey(
        "users.User",
        related_name="likes",
        on_delete=models.CASCADE,
        verbose_name="Создатель",
    )
    advertisement = models.ForeignKey(
        "offers.Advertisement",
        related_name="likes",
        on_delete=models.CASCADE,
        verbose_name="Объявление",
    )

    class Meta:
        verbose_name = "Лайк"
        verbose_name_plural = "Лайки"
        constraints = [
            models.UniqueConstraint(fields=["owner", "advertisement"], name="unique_favorites")
        ]

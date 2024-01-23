from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models


class Rate(models.Model):
    """Отзыв на пользователя."""

    from_user = models.ForeignKey(
        "users.User",
        on_delete=models.CASCADE,
        verbose_name="От пользователя",
        related_name="rating_from_users",
    )
    to_user = models.ForeignKey(
        "users.User",
        on_delete=models.CASCADE,
        verbose_name="Пользователю",
        related_name="rating_to_users",
    )

    rating = models.PositiveIntegerField(
        "Оценка", validators=[MinValueValidator(1), MaxValueValidator(5)]
    )
    is_active = models.BooleanField("Активен", default=True)
    comment = models.CharField("Отзыв", max_length=200, null=True, blank=True)
    date_created = models.DateTimeField("Дата создания", auto_now_add=True)
    date_updated = models.DateTimeField("Дата обновления", auto_now=True)

    def __str__(self):
        return f"Рейтинг {self.rating}"

    class Meta:
        verbose_name = "Отзыв"
        verbose_name_plural = "отзывы"
        unique_together = ("from_user", "to_user")
        ordering = ("-date_updated",)

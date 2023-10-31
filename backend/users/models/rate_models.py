from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator


class Rate(models.Model):
    """Отзыв на объявлнеие"""

    from_user = models.ForeignKey("users.User",
                             on_delete=models.CASCADE,
                             verbose_name="Оценивающий пользователь",
                             related_name="from_user_rates")
    to_user = models.ForeignKey("users.User",
                                            on_delete=models.CASCADE,
                                            verbose_name="Оцененный",
                                            related_name="to_user_rates")

    rating = models.PositiveIntegerField("Оценка", validators=[MinValueValidator(1), MaxValueValidator(5)])
    is_active = models.BooleanField("Активен", default=True)
    comment = models.CharField("Отзыв", max_length=200, null=True)
    date_created = models.DateTimeField("Дата создания", auto_now_add=True)
    date_updated = models.DateTimeField("Дата обновления", auto_now=True)

    def __str__(self):
        return f"Рейтинг {str(self.rating)}."

    class Meta:
        ordering = ["-date_created"]
        verbose_name = "Отзыв"
        verbose_name_plural = "отзывы"

from django.db import models
from django.core.validators import MinLengthValidator, MaxLengthValidator


class FeedBackModel(models.Model):
    """Отвызы."""

    owner = models.ForeignKey(
        "users.User",
        on_delete=models.SET_NULL,
        null=True,
        related_name="feedback",
        verbose_name="Создатель",
    )
    text = models.TextField("Текст", validators=[MinLengthValidator(10), MaxLengthValidator(900)])
    date_create = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Отзыв"
        verbose_name_plural = "Отзывы"

    def __str__(self):
        return f"{self.owner} - {self.text[:30]}"

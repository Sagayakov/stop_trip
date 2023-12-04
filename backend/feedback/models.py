from django.db import models
from django.core.validators import MinLengthValidator, MaxLengthValidator


class FeedBackModel(models.Model):
    """Модель обратной связи"""

    owner = models.ForeignKey(
        "users.User",
        on_delete=models.SET_NULL,
        null=True,
        related_name="feedback",
        verbose_name="Создатель",
    )
    feedback = models.CharField(
        "Обратная связь", validators=[MinLengthValidator(10), MaxLengthValidator(300)]
    )
    date_create = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Обратная связь"
        verbose_name_plural = "Обратная связь"

    def __str__(self):
        return f"{self.owner} - {self.feedback[:30]}"

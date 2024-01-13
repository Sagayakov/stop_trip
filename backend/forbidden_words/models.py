from django.contrib.postgres.fields import ArrayField
from django.db import models
from solo.models import SingletonModel


class ForbiddenWords(SingletonModel):
    """Модель Запрещенных слов"""

    russian_words = ArrayField(
        models.CharField(max_length=50, verbose_name="Русские слова"), null=True, blank=True
    )
    english_words = ArrayField(
        models.CharField(max_length=50, verbose_name="Английские слова"), null=True, blank=True
    )

    class Meta:
        verbose_name = "Запрещенны слова"

    def __str__(self):
        return f"Русские слова: {self.russian_words}. Английские слова: {self.english_words}"

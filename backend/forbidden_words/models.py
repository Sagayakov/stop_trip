from django.db import models
from solo.models import SingletonModel


class ForbiddenWords(SingletonModel):
    """Модель Запрещенных слов"""

    russian_words = models.TextField("Русские слова")
    english_words = models.TextField("Английские слова")

    def __str__(self):
        return f"Русские слова: {self.russian_words}. Английские слова: {self.english_words}"

from django.db import models


class Country(models.Model):
    """Страна"""

    name = models.CharField("Название", db_index=True)
    slug = models.SlugField("Слаг", unique=True, db_index=True)

    class Meta:
        verbose_name = "Страна"
        verbose_name_plural = "Страны"
        ordering = ("name",)

    def __str__(self):
        return self.name

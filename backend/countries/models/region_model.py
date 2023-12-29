from django.db import models


class Region(models.Model):
    """Регион"""

    country = models.ForeignKey(
        "countries.Country",
        on_delete=models.CASCADE,
        verbose_name="Страна",
        related_name="regions",
    )

    name = models.CharField("Название", db_index=True)
    slug = models.SlugField("Слаг", unique=True, db_index=True)

    class Meta:
        verbose_name = "Регион"
        verbose_name_plural = "Регионы"
        ordering = ("name",)

    def __str__(self):
        return self.name

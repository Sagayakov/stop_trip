from django.db import models


class City(models.Model):
    """Город"""

    region = models.ForeignKey(
        "countries.Region",
        on_delete=models.CASCADE,
        verbose_name="Регион",
        related_name="cities",
    )
    name = models.CharField("Название", db_index=True)
    slug = models.SlugField("Слаг", unique=True, db_index=True)

    class Meta:
        verbose_name = "Город"
        verbose_name_plural = "Города"
        ordering = ("name",)

    def __str__(self):
        return self.name

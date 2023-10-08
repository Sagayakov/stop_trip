from django.db import models


class AbsService(models.Model):
    """Абстрактная модель услуги."""

    home_visit = models.BooleanField(verbose_name="Выезд на дом", default=False)

    class Meta:
        abstract = True

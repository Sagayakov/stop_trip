from django.db import models


class AbsExcursion(models.Model):
    excursion_food = models.BooleanField(verbose_name="Включена еда", default=False)
    excursion_transfer = models.BooleanField(verbose_name="Трансфер", default=False)

    class Meta:
        abstract = True

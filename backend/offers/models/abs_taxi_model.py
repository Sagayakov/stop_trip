from django.db import models

from ..constants import TaxiUnit, TaxiType


class AbsTaxi(models.Model):
    """Абстрактная модель такси."""

    taxi_unit = models.CharField(
        "Единица измерения", max_length=20, choices=TaxiUnit.choices, blank=True, null=True
    )
    taxi_type = models.CharField(
        "Вид такси", max_length=25, choices=TaxiType.choices, blank=True, null=True
    )

    class Meta:
        abstract = True

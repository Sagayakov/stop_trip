from django.db import models

from ..constants import MarketCondition


class AbsMarket(models.Model):
    """Абстрактная модель купли-продажи."""

    market_condition = models.CharField(
        "Состояние", max_length=25, choices=MarketCondition.choices, blank=True, null=True
    )

    class Meta:
        abstract = True

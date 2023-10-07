from django.db import models


class AbsExchangeRate(models.Model):
    """Абстрактная модель обмена валюты."""

    proposed_currency = models.ForeignKey(
        "offers.Currency",
        on_delete=models.CASCADE,
        verbose_name="Предлагаемая валюта",
        related_name="proposed_currency_pairs",
        null=True,
        blank=True,
    )
    exchange_for = models.ForeignKey(
        "offers.Currency",
        on_delete=models.CASCADE,
        verbose_name="Обмен на",
        related_name="exchange_for_currency_pairs",
        null=True,
        blank=True,
    )

    exchange_rate = models.FloatField(
        "Курс",
        null=True,
        blank=True,
    )

    class Meta:
        abstract = True


class Currency(models.Model):
    """Валюта."""

    name = models.CharField("Название", max_length=100, unique=True)
    short_name = models.CharField("Короткое название", max_length=3, unique=True)

    class Meta:
        verbose_name = "Валюта"
        verbose_name_plural = "Валюты"

    def __str__(self):
        return self.name

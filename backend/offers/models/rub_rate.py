from django.db import models
from solo.models import SingletonModel


class RubExchangeRate(SingletonModel):
    """
    Курс рубля к донгу для примерной цены в рублях рядом с ценой объявления.

    Задаётся вручную в админке: «Объявления → Курс рубля».
    Если курс не задан (0), примерная цена в рублях на сайте не показывается.
    """

    vnd_per_rub = models.DecimalField(
        "Донгов за 1 рубль",
        max_digits=10,
        decimal_places=2,
        default=0,
        help_text="Сколько вьетнамских донгов стоит 1 российский рубль, например 290. "
        "0 — не показывать цены в рублях.",
    )
    updated_at = models.DateTimeField("Обновлён", auto_now=True)

    class Meta:
        verbose_name = verbose_name_plural = "Курс рубля"

    def __str__(self):
        return f"1 ₽ = {self.vnd_per_rub} ₫"

from django.db import models
from offers.constants.buy_sell_constants import BuySellUnit, BuySellItemCondition


class AbsBuySell(models.Model):
    """Абстрактная модель купли-продажи"""
    buy_sell_unit = models.CharField("Единица измерения", max_length=10, choices=BuySellUnit.choices, blank=True,
                                     null=True)
    buy_sell_delivery = models.BooleanField("Доставка", default=False)
    buy_sell_product = models.ForeignKey(
        "offers.Item", verbose_name="Товар", on_delete=models.CASCADE,
        related_name="items"
    )
    used_item = models.BooleanField(default=False, verbose_name="Б/У")
    item_condition = models.CharField(choices=BuySellItemCondition.choices, verbose_name="Состояние")

    class Meta:
        abstract = True


class Item(models.Model):
    "Товар для продажи или купли"
    name = models.CharField(max_length=255, verbose_name="Товар")

    class Meta:
        verbose_name = "Товар"
        verbose_name_plural = "Товары"





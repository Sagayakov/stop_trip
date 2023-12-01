from django.db import models

from ..constants import FoodType


class AbsFood(models.Model):
    """Абстрактная модель еды."""

    food_delivery = models.BooleanField(verbose_name="Доставка на дом", default=False)
    food_establishment = models.BooleanField(verbose_name="Ресторан/кафе", default=False)
    food_type = models.CharField("Тип еды", max_length=50, choices=FoodType.choices, blank=True)

    class Meta:
        abstract = True

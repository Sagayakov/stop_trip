from django_filters.rest_framework import filters, FilterSet

from common.filters import ChoiceInFilter
from offers.constants import FoodType


class FoodFilter(FilterSet):
    """Фильтры еды."""

    food_delivery = filters.BooleanFilter(label="Доставка на дом")
    food_establishment = filters.BooleanFilter(label="Ресторан/кафе")
    food_type = ChoiceInFilter(label="Тип еды", choices=FoodType.choices)

    @classmethod
    def _food_filter_specs(cls, queryset) -> list[dict]:
        specs: list[dict] = []

        # Доставка на дом
        food_delivery_specs = {
            "name": "food_delivery",
            "choices": [True, False],
        }
        specs.append(food_delivery_specs)

        # Ресторан/кафе
        food_establishment_specs = {
            "name": "food_establishment",
            "choices": [True, False],
        }
        specs.append(food_establishment_specs)

        # Тип еды
        food_type_specs = {
            "name": "food_type",
            "choices": [{"value": value, "label": label} for value, label in FoodType.choices],
        }
        specs.append(food_type_specs)
        return specs

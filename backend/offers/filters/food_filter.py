from typing import Union

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

    @classmethod
    def _food_filtered_facets(cls, queryset) -> dict[str, list]:
        facets: dict[str, Union[list, dict]] = {}

        # Доставка на дом
        facets["food_delivery"] = (
            queryset.exclude(food_delivery__isnull=True)
            .values_list("food_delivery", flat=True)
            .order_by("food_delivery")
            .distinct("food_delivery")
        )

        # Ресторан/кафе
        facets["food_establishment"] = (
            queryset.exclude(food_establishment__isnull=True)
            .values_list("food_establishment", flat=True)
            .order_by("food_establishment")
            .distinct("food_establishment")
        )

        # Тип еды
        facets["food_type"] = (
            queryset.exclude(food_type__isnull=True)
            .values_list("food_type", flat=True)
            .order_by("food_type")
            .distinct("food_type")
        )

        return facets

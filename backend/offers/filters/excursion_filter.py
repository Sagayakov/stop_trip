from django_filters.rest_framework import filters, FilterSet

from offers.constants import FoodType


class ExcursionFilter(FilterSet):
    """Фильтры экскурсий."""

    excursion_food = filters.BooleanFilter(label="Включена еда")
    excursion_transfer = filters.BooleanFilter(label="Трансфер")

    @classmethod
    def _food_filter_specs(cls, queryset) -> list[dict]:
        specs: list[dict] = []

        # Включена еда
        excursion_food_specs = {
            "name": " excursion_food",
            "choices": [True, False],
        }
        specs.append(excursion_food_specs)

        # Трансфер
        excursion_transfer_specs = {
            "name": "excursion_transfer",
            "choices": [True, False],
        }
        specs.append(excursion_transfer_specs)
        return specs

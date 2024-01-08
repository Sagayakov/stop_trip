from typing import Union

from django_filters.rest_framework import filters, FilterSet


class ExcursionFilter(FilterSet):
    """Фильтры экскурсий."""

    excursion_food = filters.BooleanFilter(label="Включена еда")
    excursion_transfer = filters.BooleanFilter(label="Трансфер")

    @classmethod
    def _excursion_filter_specs(cls, queryset) -> list[dict]:
        specs: list[dict] = []

        # Включена еда
        excursion_food_specs = {
            "name": "excursion_food",
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

    @classmethod
    def _excursion_filtered_facets(cls, queryset) -> dict[str, list]:
        facets: dict[str, Union[list, dict]] = {}

        # Включена еда
        facets["excursion_food"] = (
            queryset.exclude(excursion_food__isnull=True)
            .values_list("excursion_food", flat=True)
            .distinct()
        )

        # Трансфер
        facets["excursion_transfer"] = (
            queryset.exclude(excursion_transfer__isnull=True)
            .values_list("excursion_transfer", flat=True)
            .distinct()
        )

        return facets

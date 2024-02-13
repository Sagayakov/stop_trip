from typing import Union

from django_filters.rest_framework import filters, FilterSet


class ExcursionFilter(FilterSet):
    """Фильтры экскурсий."""

    excursion_food = filters.BooleanFilter(label="Включена еда")
    excursion_transfer = filters.BooleanFilter(label="Трансфер")

    @classmethod
    def _excursion_filter_specs(cls, queryset) -> dict[str, list[dict]]:
        specs: dict[str, Union[list, dict]] = {}

        # Включена еда
        excursion_food_specs = {
            "excursion_food": [{"value": True, "label": "Да"}, {"value": False, "label": "Нет"}],
        }
        specs |= excursion_food_specs

        # Трансфер
        excursion_transfer_specs = {
            "excursion_transfer": [
                {"value": True, "label": "Да"},
                {"value": False, "label": "Нет"},
            ],
        }
        specs |= excursion_transfer_specs

        return specs

    @classmethod
    def _excursion_filtered_facets(cls, queryset) -> dict[str, list]:
        facets: dict[str, Union[list, dict]] = {}

        # Включена еда
        facets["excursion_food"] = (
            queryset.exclude(excursion_food__isnull=True)
            .values_list("excursion_food", flat=True)
            .order_by("excursion_food")
            .distinct("excursion_food")
        )

        # Трансфер
        facets["excursion_transfer"] = (
            queryset.exclude(excursion_transfer__isnull=True)
            .values_list("excursion_transfer", flat=True)
            .order_by("excursion_transfer")
            .distinct("excursion_transfer")
        )

        return facets

from typing import Union

from django_filters.rest_framework import FilterSet

from common.filters import ChoiceInFilter
from ..constants import TaxiType, TaxiUnit


class TaxiFilter(FilterSet):
    """Фильтры такси."""

    taxi_unit = ChoiceInFilter(label="Единица измерения", choices=TaxiUnit.choices)
    taxi_type = ChoiceInFilter(label="Вид такси", choices=TaxiType.choices)

    @classmethod
    def _taxi_filter_specs(cls, queryset) -> dict[str, list[dict]]:
        specs: dict[str, Union[list, dict]] = {}

        # Единица измерения
        taxi_unit_specs = {
            "taxi_unit": [{"value": value, "label": label} for value, label in TaxiUnit.choices],
        }
        specs |= taxi_unit_specs

        # Вид такси
        taxi_type_specs = {
            "taxi_type": [{"value": value, "label": label} for value, label in TaxiType.choices],
        }
        specs |= taxi_type_specs

        return specs

    @classmethod
    def _taxi_filtered_facets(cls, queryset) -> dict[str, list]:
        facets: dict[str, Union[list, dict]] = {}

        # Единица измерения
        facets["taxi_unit"] = (
            queryset.exclude(taxi_unit__isnull=True)
            .values_list("taxi_unit", flat=True)
            .order_by("taxi_unit")
            .distinct("taxi_unit")
        )

        # Вид такси
        facets["taxi_type"] = (
            queryset.exclude(taxi_type__isnull=True)
            .values_list("taxi_type", flat=True)
            .order_by("taxi_type")
            .distinct("taxi_type")
        )

        return facets

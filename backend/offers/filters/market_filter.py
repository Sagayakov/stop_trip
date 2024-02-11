from typing import Union

from django_filters.rest_framework import filters, FilterSet

from offers.constants import MarketCondition


class MarketFilter(FilterSet):
    """Фильтр покупка/продажа"""

    market_condition = filters.ChoiceFilter(label="Состояние", choices=MarketCondition.choices)

    @classmethod
    def _market_filter_specs(cls, queryset) -> dict[str, list[dict]]:
        specs: dict[str, Union[list, dict]] = {}

        # Состояние
        market_condition_specs = {
            "market_condition": [
                {"value": value, "label": label} for value, label in MarketCondition.choices
            ],
        }
        specs |= market_condition_specs

        return specs

    @classmethod
    def _market_filtered_facets(cls, queryset) -> dict[str, list]:
        facets: dict[str, Union[list, dict]] = {}

        # Состояние
        facets["market_condition"] = (
            queryset.exclude(market_condition__isnull=True)
            .values_list("market_condition", flat=True)
            .order_by("market_condition")
            .distinct("market_condition")
        )

        return facets

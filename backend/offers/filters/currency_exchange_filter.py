from typing import Union

from django_filters.rest_framework import filters, FilterSet


class CurrencyExchange(FilterSet):
    """Фильтр обмена валют"""

    proposed_currency = filters.CharFilter(
        label="Предлагаемая валюта", field_name="proposed_currency__short_name"
    )
    exchange_for = filters.CharFilter(label="Обмен на", field_name="exchange_for__short_name")

    @classmethod
    def _currency_exchange_filter_specs(cls, queryset) -> dict[str, list[dict]]:
        specs: dict[str, Union[list, dict]] = {}

        # Предлагаемая валюта
        proposed_currency_specs = {
            "proposed_currency": [
                {"value": value, "label": label}
                for value, label in queryset.exclude(proposed_currency__isnull=True)
                .values_list("proposed_currency__short_name", "proposed_currency__name")
                .order_by("proposed_currency__short_name")
                .distinct("proposed_currency__short_name")
            ],
        }
        specs |= proposed_currency_specs

        # Обмен на
        exchange_for_specs = {
            "exchange_for": [
                {"value": value, "label": label}
                for value, label in queryset.exclude(exchange_for__isnull=True)
                .values_list("exchange_for__short_name", "exchange_for__name")
                .order_by("exchange_for__short_name")
                .distinct("exchange_for__short_name")
            ],
        }
        specs |= exchange_for_specs

        return specs

    @classmethod
    def _currency_exchange_filtered_facets(cls, queryset) -> dict[str, list]:
        facets: dict[str, Union[list, dict]] = {}

        # Предлагаемая валюта
        facets["proposed_currency"] = (
            queryset.exclude(proposed_currency__isnull=True)
            .values_list("proposed_currency__short_name", flat=True)
            .order_by("proposed_currency__short_name")
            .distinct("proposed_currency__short_name")
        )

        # Обмен на
        facets["exchange_for"] = (
            queryset.exclude(exchange_for__isnull=True)
            .values_list("exchange_for__short_name", flat=True)
            .order_by("exchange_for__short_name")
            .distinct("exchange_for__short_name")
        )

        return facets

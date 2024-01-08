from typing import Union

from django_filters.rest_framework import filters, FilterSet


class CurrencyExchange(FilterSet):
    """Фильтр обмена валют"""

    proposed_currency = filters.CharFilter(
        label="Предлагаемая валюта", field_name="proposed_currency__short_name"
    )
    exchange_for = filters.CharFilter(label="Обмен на", field_name="exchange_for__short_name")

    @classmethod
    def _currency_exchange_filter_specs(cls, queryset) -> list[dict]:
        specs: list[dict] = []

        # Предлагаемая валюта
        proposed_currency_specs = {
            "name": "proposed_currency",
            "choices": (
                {"value": value, "label": label}
                for value, label in queryset.exclude(proposed_currency__isnull=True)
                .values_list("proposed_currency__short_name", "proposed_currency__name")
                .order_by("proposed_currency__short_name")
                .distinct("proposed_currency__short_name")
            ),
        }
        specs.append(proposed_currency_specs)

        # Обмен на
        exchange_for_specs = {
            "name": "exchange_for",
            "choices": [
                {"value": value, "label": label}
                for value, label in queryset.exclude(exchange_for__isnull=True)
                .values_list("exchange_for__short_name", "exchange_for__name")
                .order_by("exchange_for__short_name")
                .distinct("exchange_for__short_name")
            ],
        }
        specs.append(exchange_for_specs)

        return specs

    @classmethod
    def _currency_exchange_filtered_facets(cls, queryset) -> dict[str, list]:
        facets: dict[str, Union[list, dict]] = {}

        # Предлагаемая валюта
        facets["proposed_currency"] = (
            queryset.exclude(proposed_currency__isnull=True)
            .values_list("proposed_currency", flat=True)
            .order_by("proposed_currency")
            .distinct("proposed_currency")
        )

        # Обмен на
        facets["exchange_for"] = (
            queryset.exclude(exchange_for__isnull=True)
            .values_list("exchange_for", flat=True)
            .order_by("exchange_for")
            .distinct("exchange_for")
        )

        return facets

from django_filters.rest_framework import filters, FilterSet

from offers.constants import MarketCondition


class MarketFilter(FilterSet):
    """Фильтр покупка/продажа"""

    market_condition = filters.ChoiceFilter(label="Состояние", choices=MarketCondition.choices)

    @classmethod
    def _market_filter_specs(cls, queryset) -> list[dict]:
        specs: list[dict] = []
        # Состояние
        market_condition_specs = {
            "name": "food_type",
            "choices": [
                {"value": value, "label": label} for value, label in MarketCondition.choices
            ],
        }
        specs.append(market_condition_specs)
        return specs

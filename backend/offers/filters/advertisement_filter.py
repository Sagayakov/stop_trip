from typing import Union

from django.db.models import Min, Max
from django_filters.rest_framework import filters, OrderingFilter

from common.filters import CharInFilter
from .currency_exchange_filter import CurrencyExchange
from .document_filter import DocumentFilter
from .event_filter import EventFilter
from .excursion_filter import ExcursionFilter
from .food_filter import FoodFilter
from .job_filter import JobFilter
from .market_filter import MarketFilter
from .property_filter import PropertyFilter
from .service_filter import ServiceFilter
from .taxi_filter import TaxiFilter
from .transport_filter import TransportFilter
from ..constants import CategoryChoices


class AdvertisementFilter(
    TransportFilter,
    PropertyFilter,
    EventFilter,
    JobFilter,
    ServiceFilter,
    TaxiFilter,
    FoodFilter,
    DocumentFilter,
    CurrencyExchange,
    ExcursionFilter,
    MarketFilter,
):
    """Фильтры для объявлений."""

    category = filters.ChoiceFilter(label="Категория", choices=CategoryChoices.choices)
    price = filters.RangeFilter(label="Цена")
    region = filters.CharFilter(label="Регион", field_name="region.slug")
    city = CharInFilter(label="Город", field_name="city.slug")

    order = OrderingFilter(fields=("date_create",), field_labels={"date_create": "Дата создания"})

    @classmethod
    def _advertisement_filter_specs(cls, queryset) -> list[dict]:
        specs: list[dict] = []

        # Категория
        category_specs = {
            "name": "category",
            "choices": [
                {"value": value, "label": label} for value, label in CategoryChoices.choices
            ],
        }
        specs.append(category_specs)

        # Регион
        region_specs = {
            "name": "region",
            "choices": [
                {"value": value, "label": label}
                for value, label in queryset.values("region__slug", "region__name").distinct()
            ],
        }
        specs.append(region_specs)

        # Город
        city_specs = {
            "name": "city",
            "choices": [
                {"value": value, "label": label}
                for value, label in queryset.values("city__slug", "city__name").distinct()
            ],
        }
        specs.append(city_specs)

        # Цена
        price_range = queryset.aggregate(min=Min("price"), max=Max("price"))
        price_specs = {
            "name": "price",
            "range": {"min": price_range["min"], "max": price_range["max"]},
        }
        specs.append(price_specs)

        return specs

    @classmethod
    def get_filter_params(cls, queryset) -> dict[str, Union[int, list]]:
        params: list[dict] = []

        for method in dir(cls):
            if method.endswith("_filter_specs"):
                params += [*getattr(cls, method)(queryset)]

        filter_params = {"count": queryset.count(), "params": params}
        return filter_params

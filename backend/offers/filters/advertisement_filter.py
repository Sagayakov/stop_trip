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
from ..models import Advertisement


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
    region = filters.CharFilter(label="Регион", field_name="region__slug")
    city = CharInFilter(label="Город", field_name="city__slug")

    order = OrderingFilter(
        fields=("date_create", "price"),
        field_labels={"date_create": "Дата создания", "price": "Цена"},
    )

    class Meta:
        model = Advertisement
        fields = ()

    @classmethod
    def _advertisement_filter_specs(cls, queryset) -> dict[str, list[dict]]:
        specs: dict[str, Union[list, dict]] = {}

        # Категория
        category_specs = {
            "category": [
                {"value": value, "label": label} for value, label in CategoryChoices.choices
            ],
        }
        specs |= category_specs

        # Регион
        region_specs = {
            "region": [
                {"value": value, "label": label}
                for value, label in queryset.exclude(region__isnull=True)
                .values_list("region__slug", "region__name")
                .order_by("region__slug", "region__name")
                .distinct("region__slug", "region__name")
            ],
        }
        specs |= region_specs

        # Город
        city_specs = {
            "city": [
                {"value": value, "label": label}
                for value, label in queryset.exclude(city__isnull=True)
                .values_list("city__slug", "city__name")
                .order_by("city__slug", "city__name")
                .distinct("city__slug", "city__name")
            ],
        }
        specs |= city_specs

        # Цена
        price_range = queryset.aggregate(min=Min("price"), max=Max("price"))
        price_specs = {
            "price": {"min": price_range["min"], "max": price_range["max"]},
        }
        specs |= price_specs

        return specs

    @classmethod
    def _advertisement_filtered_facets(cls, queryset) -> dict[str, list]:
        facets: dict[str, Union[list, dict]] = {}

        # Категория
        facets["category"] = (
            queryset.values_list("category", flat=True).order_by("category").distinct("category")
        )

        # Регион
        facets["region"] = (
            queryset.exclude(region__isnull=True)
            .values_list("region__slug", flat=True)
            .order_by("region__slug")
            .distinct("region__slug")
        )

        # Город
        facets["city"] = (
            queryset.exclude(city__isnull=True)
            .values_list("city__slug", flat=True)
            .order_by("city__slug")
            .distinct("city__slug")
        )

        # Цена
        price_range = queryset.aggregate(min=Min("price"), max=Max("price"))
        facets["price"] = {"min": price_range["min"], "max": price_range["max"]}

        return facets

    @classmethod
    def get_filter_params(cls, queryset) -> dict[str, Union[int, list]]:
        params: dict = {}

        for method in dir(cls):
            if method.endswith("_filter_specs"):
                params |= getattr(cls, method)(queryset)

        return params

    @classmethod
    def get_available_filtered_params(cls, queryset) -> dict[str, Union[int, list]]:
        params: dict = {}

        for method in dir(cls):
            if method.endswith("_filtered_facets"):
                params |= getattr(cls, method)(queryset)

        filter_params = {"count": queryset.count(), "available_params": params}
        return filter_params

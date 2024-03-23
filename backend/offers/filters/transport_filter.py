from typing import Union

from django.db.models import Min, Max
from django_filters.rest_framework import filters, FilterSet
from common.filters import CharInFilter, ChoiceInFilter

from ..constants import (
    TransportTypeOfService,
    TransportType,
    TransportCategory,
    TransportEngineType,
    TransportDriveType,
    TransportTransmissionType,
    TransportBodyType,
    TransportCondition,
    TransportRentDuration,
)


class TransportFilter(FilterSet):
    """Фильтры транспорта."""

    transport_type_of_service = filters.ChoiceFilter(
        label="Тип услуги", choices=TransportTypeOfService.choices
    )
    transport_type = filters.ChoiceFilter(label="Тип транспорта", choices=TransportType.choices)
    transport_category = ChoiceInFilter(
        label="Категория транспорта", choices=TransportCategory.choices
    )
    transport_brand = filters.CharFilter(
        label="Марка транспорта", field_name="transport_brand__slug"
    )
    transport_model = CharInFilter(label="Модель транспорта", field_name="transport_model__slug")
    transport_engine_type = ChoiceInFilter(
        label="Тип двигателя", choices=TransportEngineType.choices
    )
    transport_drive_type = ChoiceInFilter(label="Вид привода", choices=TransportDriveType.choices)
    transport_engine_volume = filters.RangeFilter(label="Объём двигателя")
    transport_year_of_production = filters.RangeFilter(label="Год производства")
    transport_transmission_type = ChoiceInFilter(
        label="Тип коробки передач", choices=TransportTransmissionType.choices
    )
    transport_body_type = ChoiceInFilter(label="Тип кузова", choices=TransportBodyType.choices)
    transport_condition = ChoiceInFilter(
        label="Состояние транспорта", choices=TransportCondition.choices
    )
    transport_commission = filters.RangeFilter(label="Комиссия")
    transport_rent_duration = ChoiceInFilter(
        label="Срок аренды", choices=TransportRentDuration.choices
    )

    @classmethod
    def _transport_filter_specs(cls, queryset) -> dict[str, list[dict]]:
        specs: dict[str, Union[list, dict]] = {}

        # Тип услуги
        transport_type_of_service_specs = {
            "transport_type_of_service": [
                {"value": value, "label": label} for value, label in TransportTypeOfService.choices
            ],
        }
        specs |= transport_type_of_service_specs

        # Тип транспорта
        transport_type_specs = {
            "transport_type": [
                {"value": value, "label": label} for value, label in TransportType.choices
            ],
        }
        specs |= transport_type_specs

        # Категория транспорта
        transport_category_specs = {
            "transport_category": [
                {"value": value, "label": label} for value, label in TransportCategory.choices
            ],
        }
        specs |= transport_category_specs

        # Марка транспорта
        transport_brand_specs = {
            "transport_brand": [
                {"value": value, "label": label}
                for value, label in queryset.exclude(transport_brand__isnull=True)
                .values_list("transport_brand__slug", "transport_brand__name")
                .order_by("transport_brand__slug")
                .distinct("transport_brand__slug")
            ],
        }
        specs |= transport_brand_specs

        # Модель транспорта
        transport_model_specs = {
            "transport_model": [
                {"value": value, "label": label}
                for value, label in queryset.exclude(transport_model__isnull=True)
                .values_list("transport_model__slug", "transport_model__name")
                .order_by("transport_model__slug")
                .distinct("transport_model__slug")
            ],
        }
        specs |= transport_model_specs

        # Тип двигателя
        transport_engine_type_specs = {
            "transport_engine_type": [
                {"value": value, "label": label} for value, label in TransportEngineType.choices
            ],
        }
        specs |= transport_engine_type_specs

        # Вид привода
        transport_drive_type_specs = {
            "transport_drive_type": [
                {"value": value, "label": label} for value, label in TransportDriveType.choices
            ],
        }
        specs |= transport_drive_type_specs

        # Объём двигателя
        transport_engine_volume_range = queryset.aggregate(
            min=Min("transport_engine_volume"), max=Max("transport_engine_volume")
        )
        transport_engine_volume_specs = {
            "transport_engine_volume": {
                "min": transport_engine_volume_range["min"],
                "max": transport_engine_volume_range["max"],
            },
        }
        specs |= transport_engine_volume_specs

        # Год производства
        transport_year_of_production_range = queryset.aggregate(
            min=Min("transport_year_of_production"), max=Max("transport_year_of_production")
        )
        transport_year_of_production_specs = {
            "transport_year_of_production": {
                "min": transport_year_of_production_range["min"],
                "max": transport_year_of_production_range["max"],
            },
        }
        specs |= transport_year_of_production_specs

        # Тип коробки передач
        transport_transmission_type_specs = {
            "transport_transmission_type": [
                {"value": value, "label": label}
                for value, label in TransportTransmissionType.choices
            ],
        }
        specs |= transport_transmission_type_specs

        # Тип кузова
        transport_body_type_specs = {
            "transport_body_type": [
                {"value": value, "label": label} for value, label in TransportBodyType.choices
            ],
        }
        specs |= transport_body_type_specs

        # Состояние транспорта
        transport_condition_specs = {
            "transport_condition": [
                {"value": value, "label": label} for value, label in TransportCondition.choices
            ],
        }
        specs |= transport_condition_specs

        # Комиссия
        transport_commission_range = queryset.aggregate(
            min=Min("transport_commission"), max=Max("transport_commission")
        )
        transport_commission_specs = {
            "transport_commission": {
                "min": transport_commission_range["min"],
                "max": transport_commission_range["max"],
            },
        }
        specs |= transport_commission_specs

        # Срок аренды
        transport_rent_duration = {
            "transport_rent_duration": [
                {"value": value, "label": label} for value, label in TransportRentDuration.choices
            ]
        }
        specs |= transport_rent_duration

        return specs

    @classmethod
    def _transport_filtered_facets(cls, queryset) -> dict[str, list]:
        facets: dict[str, Union[list, dict]] = {}

        # Тип услуги
        facets["transport_type_of_service"] = (
            queryset.exclude(transport_type_of_service__isnull=True)
            .values_list("transport_type_of_service", flat=True)
            .order_by("transport_type_of_service")
            .distinct("transport_type_of_service")
        )

        # Тип транспорта
        facets["transport_type"] = (
            queryset.exclude(transport_type__isnull=True)
            .values_list("transport_type_of_service", flat=True)
            .order_by("transport_type_of_service")
            .distinct("transport_type_of_service")
        )

        # Категория транспорта
        facets["transport_category"] = (
            queryset.exclude(transport_category__isnull=True)
            .values_list("transport_category", flat=True)
            .order_by("transport_category")
            .distinct("transport_category")
        )

        # Марка транспорта
        facets["transport_brand"] = (
            queryset.exclude(transport_brand__isnull=True)
            .values_list("transport_brand__slug", flat=True)
            .order_by("transport_brand__slug")
            .distinct("transport_brand__slug")
        )

        # Модель транспорта
        facets["transport_model"] = (
            queryset.exclude(transport_model__isnull=True)
            .values_list("transport_model__slug", flat=True)
            .order_by("transport_model__slug")
            .distinct("transport_model__slug")
        )

        # Тип двигателя
        facets["transport_engine_type"] = (
            queryset.exclude(transport_engine_type__isnull=True)
            .values_list("transport_engine_type", flat=True)
            .order_by("transport_engine_type")
            .distinct("transport_engine_type")
        )

        # Вид привода
        facets["transport_drive_type"] = (
            queryset.exclude(transport_drive_type__isnull=True)
            .values_list("transport_drive_type", flat=True)
            .order_by("transport_drive_type")
            .distinct("transport_drive_type")
        )

        # Объём двигателя
        transport_engine_volume_range = queryset.aggregate(
            min=Min("transport_engine_volume"), max=Max("transport_engine_volume")
        )
        facets["transport_engine_volume"] = {
            "min": transport_engine_volume_range["min"],
            "max": transport_engine_volume_range["max"],
        }

        # Год производства
        transport_year_of_production_range = queryset.aggregate(
            min=Min("transport_year_of_production"), max=Max("transport_year_of_production")
        )
        facets["transport_year_of_production"] = {
            "min": transport_year_of_production_range["min"],
            "max": transport_year_of_production_range["max"],
        }

        # Тип коробки передач
        facets["transport_transmission_type"] = (
            queryset.exclude(transport_transmission_type__isnull=True)
            .values_list("transport_transmission_type", flat=True)
            .order_by("transport_transmission_type")
            .distinct("transport_transmission_type")
        )

        # Тип кузова
        facets["transport_body_type"] = (
            queryset.exclude(transport_body_type__isnull=True)
            .values_list("transport_body_type", flat=True)
            .order_by("transport_body_type")
            .distinct("transport_body_type")
        )

        # Состояние транспорта
        facets["transport_condition"] = (
            queryset.exclude(transport_condition__isnull=True)
            .values_list("transport_condition", flat=True)
            .order_by("transport_condition")
            .distinct("transport_condition")
        )

        # Комиссия
        transport_commission_range = queryset.aggregate(
            min=Min("transport_commission"), max=Max("transport_commission")
        )
        facets["transport_commission"] = {
            "min": transport_commission_range["min"],
            "max": transport_commission_range["max"],
        }

        # Срок аренды
        facets["transport_rent_duration"] = (
            queryset.exclude(transport_rent_duration__isnull=True)
            .values_list("transport_rent_duration", flat=True)
            .order_by("transport_rent_duration")
            .distinct("transport_rent_duration")
        )

        return facets

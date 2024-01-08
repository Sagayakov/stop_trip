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

    @classmethod
    def _transport_filter_specs(cls, queryset) -> list[dict]:
        specs: list[dict] = []

        # Тип услуги
        transport_type_of_service_specs = {
            "name": "transport_type_of_service",
            "choices": [
                {"value": value, "label": label} for value, label in TransportTypeOfService.choices
            ],
        }
        specs.append(transport_type_of_service_specs)

        # Тип транспорта
        transport_type_specs = {
            "name": "transport_type",
            "choices": [{"value": value, "label": label} for value, label in TransportType.choices],
        }
        specs.append(transport_type_specs)

        # Категория транспорта
        transport_category_specs = {
            "name": "transport_category",
            "choices": [
                {"value": value, "label": label} for value, label in TransportCategory.choices
            ],
        }
        specs.append(transport_category_specs)

        # Марка транспорта
        transport_brand_specs = {
            "name": "transport_brand",
            "choices": [
                {"value": value, "label": label}
                for value, label in queryset.exclude(transport_brand__isnull=True)
                .values_list("transport_brand__slug", "transport_brand__name")
                .order_by("transport_brand__slug")
                .distinct("transport_brand__slug")
            ],
        }
        specs.append(transport_brand_specs)

        # Модель транспорта
        transport_model_specs = {
            "name": "transport_model",
            "choices": [
                {"value": value, "label": label}
                for value, label in queryset.exclude(transport_model__isnull=True)
                .values_list("transport_model__slug", "transport_model__name")
                .order_by("transport_model__slug")
                .distinct("transport_model__slug")
            ],
        }
        specs.append(transport_model_specs)

        # Тип двигателя
        transport_engine_type_specs = {
            "name": "transport_engine_type",
            "choices": [
                {"value": value, "label": label} for value, label in TransportEngineType.choices
            ],
        }
        specs.append(transport_engine_type_specs)

        # Вид привода
        transport_drive_type_specs = {
            "name": "transport_drive_type",
            "choices": [
                {"value": value, "label": label} for value, label in TransportDriveType.choices
            ],
        }
        specs.append(transport_drive_type_specs)

        # Объём двигателя
        transport_engine_volume_range = queryset.aggregate(
            min=Min("transport_engine_volume"), max=Max("transport_engine_volume")
        )
        transport_engine_volume_specs = {
            "name": "transport_engine_volume",
            "range": {
                "min": transport_engine_volume_range["min"],
                "max": transport_engine_volume_range["max"],
            },
        }
        specs.append(transport_engine_volume_specs)

        # Год производства
        transport_year_of_production_range = queryset.aggregate(
            min=Min("transport_year_of_production"), max=Max("transport_year_of_production")
        )
        transport_year_of_production_specs = {
            "name": "transport_year_of_production",
            "range": {
                "min": transport_year_of_production_range["min"],
                "max": transport_year_of_production_range["max"],
            },
        }
        specs.append(transport_year_of_production_specs)

        # Тип коробки передач
        transport_transmission_type_specs = {
            "name": "transport_transmission_type",
            "choices": [
                {"value": value, "label": label}
                for value, label in TransportTransmissionType.choices
            ],
        }
        specs.append(transport_transmission_type_specs)

        # Тип кузова
        transport_body_type_specs = {
            "name": "transport_body_type",
            "choices": [
                {"value": value, "label": label} for value, label in TransportBodyType.choices
            ],
        }
        specs.append(transport_body_type_specs)

        # Состояние транспорта
        transport_condition_specs = {
            "name": "transport_condition",
            "choices": [
                {"value": value, "label": label} for value, label in TransportCondition.choices
            ],
        }
        specs.append(transport_condition_specs)

        # Комиссия
        transport_commission_range = queryset.aggregate(
            min=Min("transport_commission"), max=Max("transport_commission")
        )
        transport_commission_specs = {
            "name": "transport_commission",
            "range": {
                "min": transport_commission_range["min"],
                "max": transport_commission_range["max"],
            },
        }
        specs.append(transport_commission_specs)

        return specs

    @classmethod
    def _transport_filtered_facets(cls, queryset) -> dict[str, list]:
        facets: dict[str, Union[list, dict]] = {}

        # Тип услуги
        facets["transport_type_of_service"] = (
            queryset.exclude(transport_type_of_service__isnull=True)
            .values_list("transport_type_of_service", flat=True)
            .distinct()
        )

        # Тип транспорта
        facets["transport_type"] = (
            queryset.exclude(transport_type__isnull=True)
            .values_list("transport_type_of_service", flat=True)
            .distinct()
        )

        # Категория транспорта
        facets["transport_category"] = (
            queryset.exclude(transport_category__isnull=True)
            .values_list("transport_category", flat=True)
            .distinct()
        )

        # Марка транспорта
        facets["transport_brand"] = (
            queryset.exclude(transport_brand__isnull=True)
            .values_list("transport_brand", flat=True)
            .distinct()
        )

        # Модель транспорта
        facets["transport_model"] = (
            queryset.exclude(transport_model__isnull=True)
            .values_list("transport_model", flat=True)
            .distinct()
        )

        # Тип двигателя
        facets["transport_engine_type"] = (
            queryset.exclude(transport_engine_type__isnull=True)
            .values_list("transport_engine_type", flat=True)
            .distinct()
        )

        # Вид привода
        facets["transport_drive_type"] = (
            queryset.exclude(transport_drive_type__isnull=True)
            .values_list("transport_drive_type", flat=True)
            .distinct()
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
            .distinct()
        )

        # Тип кузова
        facets["transport_body_type"] = (
            queryset.exclude(transport_body_type__isnull=True)
            .values_list("transport_body_type", flat=True)
            .distinct()
        )

        # Состояние транспорта
        facets["transport_condition"] = (
            queryset.exclude(transport_condition__isnull=True)
            .values_list("transport_condition", flat=True)
            .distinct()
        )

        # Комиссия
        transport_commission_range = queryset.aggregate(
            min=Min("transport_commission"), max=Max("transport_commission")
        )
        facets["transport_commission"] = {
            "min": transport_commission_range["min"],
            "max": transport_commission_range["max"],
        }

        return facets

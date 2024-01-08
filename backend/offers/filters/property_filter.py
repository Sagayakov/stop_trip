from typing import Union

from django.db.models import Min, Max
from django_filters.rest_framework import filters, FilterSet

from common.filters import CharInFilter, ChoiceInFilter
from ..constants import (
    PropertyTypeOfService,
    PropertyBathroomType,
    PropertyHouseType,
    PropertyRentalCondition,
    PropertyType,
)


class PropertyFilter(FilterSet):
    property_type = ChoiceInFilter(label="Тип собственности", choices=PropertyType.choices)
    property_type_of_service = filters.ChoiceFilter(
        label="Тип услуги", choices=PropertyTypeOfService.choices
    )
    property_bathroom_count = filters.NumberFilter(label="Количество санузлов")
    property_bathroom_type = ChoiceInFilter(
        label="Тип санузла", choices=PropertyBathroomType.choices
    )
    property_house_type = ChoiceInFilter(label="Тип дома", choices=PropertyHouseType.choices)
    property_sleeping_places = filters.NumberFilter(label="Количество спальных мест")
    property_rooms_count = filters.NumberFilter(label="Количество комнат")
    property_rental_condition = ChoiceInFilter(
        label="Условия аренды", choices=PropertyRentalCondition.choices
    )
    property_area = filters.RangeFilter(label="Общая площадь")
    property_has_furniture = filters.BooleanFilter(label="Мебель")
    property_amenities = CharInFilter(label="Удобства", method="filter_property_amenities")

    @staticmethod
    def filter_property_amenities(queryset, name, value):
        if value:
            for v in value:
                queryset = queryset.filter(property_amenities__slug=v)
        return queryset

    @classmethod
    def _property_filter_specs(cls, queryset) -> list[dict]:
        specs: list[dict] = []

        # Тип собственности
        property_type_specs = {
            "name": "property_type",
            "choices": [{"value": value, "label": label} for value, label in PropertyType.choices],
        }
        specs.append(property_type_specs)

        # Тип услуги
        property_type_of_service_specs = {
            "name": "property_type_of_service",
            "choices": [
                {"value": value, "label": label} for value, label in PropertyTypeOfService.choices
            ],
        }
        specs.append(property_type_of_service_specs)

        # Количество санузлов
        property_bathroom_count_specs = {
            "name": "property_bathroom_count",
            "choices": [
                {"value": value, "label": label}
                for value, label in queryset.exclude(property_bathroom_count__isnull=True)
                .values_list("property_bathroom_count", "property_bathroom_count")
                .order_by("property_bathroom_count")
                .distinct("property_bathroom_count")
            ],
        }
        specs.append(property_bathroom_count_specs)

        # Тип санузла
        property_bathroom_type_specs = {
            "name": "property_bathroom_type",
            "choices": [
                {"value": value, "label": label} for value, label in PropertyBathroomType.choices
            ],
        }
        specs.append(property_bathroom_type_specs)

        # Тип дома
        property_house_type_specs = {
            "name": "property_house_type",
            "choices": [
                {"value": value, "label": label} for value, label in PropertyHouseType.choices
            ],
        }
        specs.append(property_house_type_specs)

        # Количество спальных мест
        property_sleeping_places_range = queryset.aggregate(
            min=Min("property_sleeping_places"), max=Max("property_sleeping_places")
        )
        property_sleeping_places_specs = {
            "name": "property_sleeping_places",
            "range": {
                "min": property_sleeping_places_range["min"],
                "max": property_sleeping_places_range["max"],
            },
        }
        specs.append(property_sleeping_places_specs)

        # Количество комнат
        property_rooms_count_range = queryset.aggregate(
            min=Min("property_rooms_count"), max=Max("property_rooms_count")
        )
        property_rooms_count_specs = {
            "name": "property_rooms_count",
            "range": {
                "min": property_rooms_count_range["min"],
                "max": property_rooms_count_range["max"],
            },
        }
        specs.append(property_rooms_count_specs)

        # Условия аренды
        property_rental_condition_specs = {
            "name": "property_rental_condition",
            "choices": [
                {"value": value, "label": label} for value, label in PropertyRentalCondition.choices
            ],
        }
        specs.append(property_rental_condition_specs)

        # Общая площадь
        property_area_range = queryset.aggregate(min=Min("property_area"), max=Max("property_area"))
        property_area_specs = {
            "name": "property_area",
            "range": {
                "min": property_area_range["min"],
                "max": property_area_range["max"],
            },
        }
        specs.append(property_area_specs)

        # Мебель
        property_has_furniture_specs = {
            "name": "property_has_furniture",
            "choices": [True, False],
        }
        specs.append(property_has_furniture_specs)

        # Удобства
        property_amenities_specs = {
            "name": "property_amenities",
            "choices": [
                {"value": value, "label": label}
                for value, label in queryset.exclude(property_amenities__isnull=True)
                .values_list("property_amenities__slug", "property_amenities__name")
                .order_by("property_amenities__slug")
                .distinct("property_amenities__slug")
            ],
        }
        specs.append(property_amenities_specs)

        return specs

    @classmethod
    def _property_filtered_facets(cls, queryset) -> dict[str, list]:
        facets: dict[str, Union[list, dict]] = {}

        # Тип собственности
        facets["property_type"] = (
            queryset.exclude(property_type__isnull=True)
            .values_list("property_type", flat=True)
            .distinct()
        )

        # Тип услуги
        facets["property_type_of_service"] = (
            queryset.exclude(property_type_of_service__isnull=True)
            .values_list("property_type_of_service", flat=True)
            .distinct()
        )

        # Количество санузлов
        facets["property_bathroom_count"] = (
            queryset.exclude(property_bathroom_count__isnull=True)
            .values_list("property_bathroom_count", flat=True)
            .distinct()
        )

        # Тип санузла
        facets["property_bathroom_type"] = (
            queryset.exclude(property_bathroom_type__isnull=True)
            .values_list("property_bathroom_type", flat=True)
            .distinct()
        )

        # Тип дома
        facets["property_house_type"] = (
            queryset.exclude(property_house_type__isnull=True)
            .values_list("property_house_type", flat=True)
            .distinct()
        )

        # Количество спальных мест
        property_sleeping_places_range = queryset.aggregate(
            min=Min("property_sleeping_places"), max=Max("property_sleeping_places")
        )
        facets["property_sleeping_places"] = {
            "min": property_sleeping_places_range["min"],
            "max": property_sleeping_places_range["max"],
        }

        # Количество комнат
        property_rooms_count_range = queryset.aggregate(
            min=Min("property_rooms_count"), max=Max("property_rooms_count")
        )
        facets["property_rooms_count"] = {
            "min": property_rooms_count_range["min"],
            "max": property_rooms_count_range["max"],
        }

        # Условия аренды
        facets["property_rental_condition"] = (
            queryset.exclude(property_rental_condition__isnull=True)
            .values_list("property_rental_condition", flat=True)
            .distinct()
        )

        # Общая площадь
        property_area_range = queryset.aggregate(min=Min("property_area"), max=Max("property_area"))
        facets["property_area"] = {
            "min": property_area_range["min"],
            "max": property_area_range["max"],
        }

        # Мебель
        facets["property_has_furniture"] = (
            queryset.exclude(property_has_furniture__isnull=True)
            .values_list("property_has_furniture", flat=True)
            .distinct()
        )

        # Удобства
        facets["property_amenities"] = queryset.values_list(
            "property_amenities__slug", flat=True
        ).distinct()

        return facets

from django_filters.rest_framework import filters, FilterSet

from common.filters import CharInFilter
from ..constants import (
    PropertyTypeOfService,
    PropertyBathroomType,
    PropertyHouseType,
    PropertyRentalCondition,
)


class PropertyFilter(FilterSet):
    property_type_of_service = filters.ChoiceFilter(
        label="Тип услуги", choices=PropertyTypeOfService.choices
    )
    property_city = filters.CharFilter(label="Город", field_name="property_city__slug")
    property_district = filters.CharFilter(label="Район", field_name="property_district__slug")
    property_bathroom_count = filters.NumberFilter(label="Количество санузлов")
    property_bathroom_type = filters.ChoiceFilter(
        label="Тип санузла", choices=PropertyBathroomType.choices
    )
    property_house_type = filters.ChoiceFilter(label="Тип дома", choices=PropertyHouseType.choices)
    property_sleeping_places = filters.NumberFilter(label="Количество спальных мест")
    property_rooms_count = filters.NumberFilter(label="Количество комнат")
    property_rental_condition = filters.ChoiceFilter(
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

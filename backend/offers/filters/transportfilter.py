from django_filters.rest_framework import filters, FilterSet

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
    transport_type_of_service = filters.ChoiceFilter(
        label="Тип услуги", choices=TransportTypeOfService.choices
    )
    transport_type = filters.ChoiceFilter(label="Тип транспорта", choices=TransportType.choices)
    transport_category = filters.ChoiceFilter(
        label="Категория транспорта", choices=TransportCategory.choices
    )
    transport_brand = filters.CharFilter(
        label="Марка транспорта", field_name="transport_brand__slug"
    )
    transport_model = filters.CharFilter(
        label="Модель транспорта", field_name="transport_model__slug"
    )
    transport_engine_type = filters.ChoiceFilter(
        label="Тип двигателя", choices=TransportEngineType.choices
    )
    transport_drive_type = filters.ChoiceFilter(
        label="Вид привода", choices=TransportDriveType.choices
    )
    transport_engine_volume = filters.RangeFilter(label="Объём двигателя")
    transport_year_of_production = filters.RangeFilter(label="Год производства")
    transport_transmission_type = filters.ChoiceFilter(
        label="Тип коробки передач", choices=TransportTransmissionType.choices
    )
    transport_body_type = filters.ChoiceFilter(
        label="Тип кузова", choices=TransportBodyType.choices
    )
    transport_condition = filters.ChoiceFilter(
        label="Состояние транспорта", choices=TransportCondition.choices
    )

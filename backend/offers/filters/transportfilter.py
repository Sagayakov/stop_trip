from django_filters.rest_framework import filters, FilterSet


class TransportFilter(FilterSet):
    transport_type_of_service = filters.CharFilter(
        label="Тип услуги"
    )
    transport_type = filters.CharFilter(
        label="Тип транспорта"
    )
    transport_category = filters.CharFilter(
        label="Категория транспорта"
    )
    transport_brand = filters.CharFilter(
        label="Марка транспорта"
    )
    transport_model = filters.CharFilter(
        label="Модель транспорта"
    )
    transport_engine_type = filters.CharFilter(
        label="Тип двигателя"
    )
    transport_drive_type = filters.CharFilter(
        label="Вид привода"
    )
    transport_engine_volume = filters.RangeFilter(
        label="Объём двигателя"
    )
    transport_year_of_production = filters.RangeFilter(
        label="Год производства"
    )
    transport_transmission_type = filters.CharFilter(
        label="Тип коробки передач"
    )
    transport_body_type = filters.CharFilter(
         label="Тип кузова"
    )
    transport_condition = filters.CharFilter(
         label="Состояние транспорта"
    )

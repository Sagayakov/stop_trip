from django_filters.rest_framework import filters, FilterSet


class TransportFilter(FilterSet):
    transport_type_of_service = filters.CharFilter(method='filter_by_transport_type_of_service', label='Тип услуги')
    transport_type = filters.CharFilter(method='filter_by_transport_types', label='Тип транспорта')
    transport_category = filters.CharFilter(method='filter_by_transport_category', label='Категория транспорта')
    transport_brand = filters.CharFilter(method='filter_by_transport_brand', label='Марка транспорта')
    transport_model = filters.CharFilter(method='filter_by_transport_model', label='Модель транспорта')
    transport_engine_type = filters.CharFilter(method='filter_by_transport_engine_type', label='Тип двигателя')
    transport_drive_type = filters.CharFilter(method='filter_by_transport_drive_type', label='Вид привода')
    transport_engine_volume = filters.RangeFilter(label='Объём двигателя')
    transport_year_of_production = filters.RangeFilter(label='Год производства')
    transport_transmission_type = filters.CharFilter(method='filter_by_transport_transmission_type',
                                                     label='Тип коробки передач')
    transport_body_type = filters.CharFilter(method='filter_by_transport_body_type', label='Тип кузова')
    transport_condition = filters.CharFilter(method='filter_by_transport_condition', label='Состояние транспорта')

    def filter_by_transport_type_of_service(self, qs, field_name, value):
        return qs.filter(transport_type_of_service__exact=value)

    def filter_by_transport_types(self, qs, field_name, value):
        return qs.filter(transport_type__exact=value)

    def filter_by_transport_category(self, qs, filed_name, value):
        return qs.filter(transport_category__exact=value)

    def filter_by_transport_brand(self, qs, filed_name, value):
        return qs.filter(transport_brand__slug=value)

    def filter_by_transport_model(self, qs, filed_name, value):
        return qs.filter(transport_model__slug=value)

    def filter_by_transport_engine_type(self, qs, filed_name, value):
        return qs.filter(transport_engine_type__exect=value)

    def filter_by_transport_drive_type(self, qs, filed_name, value):
        return qs.filter(transport_drive_type__exect=value)

    def filter_by_transport_transmission_type(self, qs, filed_name, value):
        return qs.filter(transport_transmission_type__exect=value)

    def filter_by_transport_body_type(self, qs, file_name, value):
        return qs.filter(transport_body_type_exect=value)

    def filter_by_transport_condition(self, qs, file_name, value):
        return qs.filter(transport_condition_exect=value)
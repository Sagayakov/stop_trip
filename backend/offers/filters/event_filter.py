from django_filters.rest_framework import filters, FilterSet


class EventFilter(FilterSet):

    """Фильтры событий."""

    start_date = filters.DateTimeFilter(label="Дата начала")
    end_date = filters.DateTimeFilter(label="Дата окончания")
    is_online = filters.BooleanFilter(label="Онлайн")

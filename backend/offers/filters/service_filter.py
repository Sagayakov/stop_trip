from django_filters.rest_framework import filters, FilterSet


class ServiceFilter(FilterSet):
    """Фильтры услуг."""

    home_visit = filters.BooleanFilter(label="Выезд на дом")

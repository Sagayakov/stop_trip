from django_filters.rest_framework import filters, FilterSet


class ServiceFilter(FilterSet):
    home_visit = filters.BooleanFilter(
        label="Выезд на дом"
    )
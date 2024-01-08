from typing import Union

from django_filters.rest_framework import filters, FilterSet


class ServiceFilter(FilterSet):
    """Фильтры услуг."""

    service_home_visit = filters.BooleanFilter(label="Выезд на дом")

    @classmethod
    def _service_filter_specs(cls, queryset) -> list[dict]:
        specs: list[dict] = []

        # Выезд на дом
        service_home_visit_specs = {
            "name": "service_home_visit",
            "choices": [True, False],
        }
        specs.append(service_home_visit_specs)

        return specs

    @classmethod
    def _service_filtered_facets(cls, queryset) -> dict[str, list]:
        facets: dict[str, Union[list, dict]] = {}

        # Выезд на дом
        facets["service_home_visit"] = (
            queryset.exclude(service_home_visit__isnull=True)
            .values_list("service_home_visit", flat=True)
            .distinct()
        )

        return facets

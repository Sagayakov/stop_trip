from typing import Union

from django_filters.rest_framework import filters, FilterSet


class EventFilter(FilterSet):
    """Фильтры событий."""

    start_date = filters.DateTimeFilter(label="Дата начала")
    end_date = filters.DateTimeFilter(label="Дата окончания")
    is_online = filters.BooleanFilter(label="Онлайн")

    @classmethod
    def _event_filter_specs(cls, queryset) -> dict[str, list[dict]]:
        specs: dict[str, Union[list, dict]] = {}

        # Онлайн
        is_online_specs = {
            "is_online": [{"value": True, "label": "Да"}, {"value": False, "label": "Нет"}],
        }
        specs |= is_online_specs

        return specs

    @classmethod
    def _event_filtered_facets(cls, queryset) -> dict[str, list]:
        facets: dict[str, Union[list, dict]] = {}

        # Онлайн
        facets["is_online"] = (
            queryset.exclude(is_online__isnull=True)
            .values_list("is_online", flat=True)
            .order_by("is_online")
            .distinct("is_online")
        )

        return facets

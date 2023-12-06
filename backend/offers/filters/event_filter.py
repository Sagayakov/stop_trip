from django_filters.rest_framework import filters, FilterSet


class EventFilter(FilterSet):

    """Фильтры событий."""

    start_date = filters.DateTimeFilter(label="Дата начала")
    end_date = filters.DateTimeFilter(label="Дата окончания")
    is_online = filters.BooleanFilter(label="Онлайн")

    @classmethod
    def _event_filter_specs(cls, queryset) -> list[dict]:
        specs: list[dict] = []

        # Онлайн
        is_online_specs = {
            "name": "is_online",
            "choices": [True, False],
        }
        specs.append(is_online_specs)

        return specs

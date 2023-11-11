from django_filters.rest_framework import filters, OrderingFilter

from .event_filter import EventFilter
from .job_filter import JobFilter
from .service_filter import ServiceFilter
from .taxi_filter import TaxiFilter
from .transport_filter import TransportFilter
from ..constants import CategoryChoices


class AdvertisementFilter(TransportFilter, EventFilter, JobFilter, ServiceFilter, TaxiFilter):
    """Фильтры для объявлений."""

    category = filters.ChoiceFilter(label="Категория", choices=CategoryChoices.choices)
    price = filters.RangeFilter(label="Цена")

    order = OrderingFilter(fields=("date_create",), field_labels={"date_create": "Дата создания"})

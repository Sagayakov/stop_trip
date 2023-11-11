from .event_filter import EventFilter
from .job_filter import JobFilter
from .service_filter import ServiceFilter
from .taxi_filter import TaxiFilter
from .transport_filter import TransportFilter


class AdvertisementFilter(TransportFilter, EventFilter, JobFilter, ServiceFilter, TaxiFilter):
    """Фильтры для объявлений."""

    pass

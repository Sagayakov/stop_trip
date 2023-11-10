from offers.filters.event_filter import EventFilter
from offers.filters.transport_filter import TransportFilter
from offers.filters.job_filter import JobFilter
from offers.filters.service_filter import ServiceFilter
from offers.filters.taxi_filter import TaxiFilter


class AdvertisementFilter(TransportFilter, EventFilter, JobFilter, ServiceFilter, TaxiFilter):
    """Фильтры для объявлений."""
    pass

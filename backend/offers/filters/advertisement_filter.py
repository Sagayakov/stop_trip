from offers.filters.eventfilter import EventFilter
from offers.filters.transportfilter import TransportFilter
from offers.filters.jobfilter import JobFilter
from offers.filters.servicefilter import ServiceFilter
from offers.filters.taxifilter import TaxiFilter


class AdvertisementFilter(TransportFilter, EventFilter, JobFilter, ServiceFilter, TaxiFilter):
    """Фильтры для объявлений."""
    pass
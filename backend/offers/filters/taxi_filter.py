from django_filters.rest_framework import filters, FilterSet

from offers.constants import TaxiType
from offers.constants import TaxiUnit


class TaxiFilter(FilterSet):
    """Фильтры такси."""

    taxi_unit = filters.ChoiceFilter(label="Единица измерения", choices=TaxiUnit.choices)
    taxi_type = filters.ChoiceFilter(label="Вид такси", choices=TaxiType.choices)

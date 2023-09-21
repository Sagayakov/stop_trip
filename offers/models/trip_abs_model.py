from django.db import models
from offers.constants.trip_constants import TripUnit


class AbsTrip(models.Model):
    """Абстрактная модель поездки."""
    # возможно нужно указать локацию
    trip_unit = models.CharField("Единица измерения", max_length=25, choices=TripUnit.choices,
                                 null=True, blank=True)

from django.db.models import TextChoices


class TaxiUnit(TextChoices):
    KM = "km", "км"
    HOUR = "hour", "час"
    ROUTE = "route", "маршрут"


class TaxiType(TextChoices):
    ECONOMY = "economy", "эконом"
    COMFORT = "comfort", "комфорт"
    BUSINESS = "business", "бизнес"
    STATION_WAGON = "station_wagon", "универсал"
    MINIVAN = "minivan", "минивэн"

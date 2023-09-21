from django.db.models import TextChoices


class TripUnit(TextChoices):
    UNIT = "unit", "Единица"
    HOUR = "hour", "Час"
    DAY = "day", "День"
    OTHER = "other", "Другое"

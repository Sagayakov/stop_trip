from django.db.models import TextChoices


class ServiceUnit(TextChoices):
    SERVICE = "service", "Услуга"
    HOUR = "hour", "Час"
    UNIT = "unit", "Шт"
    OTHER = "other", "Другое"

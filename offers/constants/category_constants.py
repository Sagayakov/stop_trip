from django.db.models import TextChoices


class CategoryChoices(TextChoices):
    PROPERTY = "property", "Недвижимость"
    TRANSPORT = "transport", "Транспорт"
    JOB = "job", "Работа"
    SERVICE = "service", "Услуги"
    TAXI = "taxi", "Такси"
    EVENT = "event", "События"

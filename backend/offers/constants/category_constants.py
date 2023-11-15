from django.db.models import TextChoices


class CategoryChoices(TextChoices):
    PROPERTY = "property", "Недвижимость"
    TRANSPORT = "transport", "Транспорт"
    JOB = "job", "Работа"
    SERVICE = "service", "Услуги"
    TAXI = "taxi", "Такси"
    EVENT = "event", "События"
    EXCHANGE_RATE = "exchange_rate", "Обмен валюты"
    MARKET = "market", "Купить-продать"
    DOCUMENT = "document", "Документы"
    FOOD = "food", "Еда"
    EXCURSION = "excursion", "Экскурсии"

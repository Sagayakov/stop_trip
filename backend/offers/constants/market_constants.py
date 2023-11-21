from django.db.models import TextChoices


class MarketCondition(TextChoices):
    NEW = "new", "Новое"
    USED = "used", "Б/У"

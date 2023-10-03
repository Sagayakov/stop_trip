from django.db.models import TextChoices


class CategoryChoices(TextChoices):
    PROPERTY = "property", "Недвижимость"
    TRANSPORT = "transport", "Транспорт"

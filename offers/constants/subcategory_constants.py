from django.db.models import TextChoices


class SubCategoryChoices(TextChoices):
    PROPERTY = "property", "Недвижимость"
    TRANSPORT = "transport", "Транспорт"

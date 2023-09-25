from django.db.models import TextChoices


class BuySellUnit(TextChoices):
    PIECE = "piece", "шт"
    KG = "kg", "кг"
    GRAM = "gr", "гр"
    OTHER = "other", "другое"


class BuySellItemCondition(TextChoices):
    PERFECT = "perfect", "отличное"
    GOOD = "good", "хорошее"
    BAD = "bad", "плохое"

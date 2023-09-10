from django.apps import AppConfig


class OfferConfig(AppConfig):
    default_auto_field: str = "django.db.models.BigAutoField"
    name: str = "offers"
    verbose_name: str = "Предложения"

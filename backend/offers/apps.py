from django.apps import AppConfig, apps


class OfferConfig(AppConfig):
    default_auto_field: str = "django.db.models.BigAutoField"
    name: str = "offers"
    verbose_name: str = "Объявления"

    def ready(self):
        from .signals import connect_cache_invalidation

        connect_cache_invalidation(apps)

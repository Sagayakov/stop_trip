from django.apps import AppConfig


class FavoritesConfig(AppConfig):
    default_auto_field: str = "django.db.models.BigAutoField"
    name: str = "favorites"
    verbose_name: str = "Лайки"

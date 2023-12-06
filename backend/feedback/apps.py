from django.apps import AppConfig


class FeedbackConfig(AppConfig):
    default_auto_field: str = "django.db.models.BigAutoField"
    name: str = "feedback"
    verbose_name: str = "Обратная связь"

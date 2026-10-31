from django.apps import AppConfig, apps


class OfferConfig(AppConfig):
    default_auto_field: str = "django.db.models.BigAutoField"
    name: str = "offers"
    verbose_name: str = "Объявления"

    def ready(self):
        from .signals import connect_cache_invalidation

        connect_cache_invalidation(apps)

        # После запуска (в том числе после обновления кода) сбрасываем кэш ответов API,
        # чтобы посетители не получили ответы в старом формате.
        try:
            from common.cache import bump_data_version

            bump_data_version()
        except Exception:  # Redis может быть ещё не запущен — не мешаем старту
            pass

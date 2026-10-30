"""
Кэш ответов API для гостей с мгновенным сбросом.

Зачем: при сотнях одновременных посетителей одни и те же запросы (лента, карточка,
фильтры) повторяются тысячи раз. Ответ кладётся в Redis и отдаётся без обращения к БД.

Как сбрасывается: в кэше хранится «номер версии» данных. Он входит в ключ каждого
закэшированного ответа. Когда объявление (фото, оценка продавца, город) создаётся,
меняется или удаляется, номер версии увеличивается — и все старые ответы перестают
использоваться. Поэтому новое объявление видно сразу, а не через 10 минут, как раньше.

Вошедшим пользователям кэш не отдаётся: в ответе есть их личные данные (my_rating,
свои скрытые объявления).
"""

import json
from functools import wraps
from typing import Callable

from django.core.cache import cache
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response

VERSION_KEY = "api:data_version"
DEFAULT_TIMEOUT = 60 * 15


def get_data_version() -> int:
    version = cache.get(VERSION_KEY)
    if version is None:
        version = 1
        cache.add(VERSION_KEY, version, timeout=None)
    return version


def bump_data_version(*args, **kwargs) -> None:
    """Сбрасывает весь кэш ответов. Подходит как обработчик сигналов Django."""

    try:
        cache.incr(VERSION_KEY)
    except ValueError:
        cache.set(VERSION_KEY, 2, timeout=None)


def cache_for_anonymous(timeout: int = DEFAULT_TIMEOUT) -> Callable:
    """Декоратор метода ViewSet: кэширует успешный ответ для гостей."""

    def decorator(view_method: Callable) -> Callable:
        @wraps(view_method)
        def wrapper(self, request, *args, **kwargs):
            if request.user.is_authenticated:
                return view_method(self, request, *args, **kwargs)

            key = f"api:{get_data_version()}:{request.get_full_path()}"
            cached = cache.get(key)
            if cached is not None:
                return Response(cached)

            response = view_method(self, request, *args, **kwargs)
            if response.status_code == 200:
                # Сохраняем «простые» данные (как в JSON-ответе), без QuerySet и Decimal.
                plain_data = json.loads(JSONRenderer().render(response.data))
                cache.set(key, plain_data, timeout=timeout)
            return response

        return wrapper

    return decorator

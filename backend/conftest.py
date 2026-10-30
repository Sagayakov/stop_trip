import pytest
from django.core.cache import cache


@pytest.fixture(autouse=True)
def clear_cache():
    """Каждый тест начинается с пустого кэша (кэш ответов API и лимиты запросов)."""

    cache.clear()
    yield
    cache.clear()

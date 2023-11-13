from django_filters import BaseInFilter, NumberFilter, CharFilter


class NumberInFilter(BaseInFilter, NumberFilter):
    pass


class CharInFilter(BaseInFilter, CharFilter):
    pass

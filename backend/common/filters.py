from django_filters import BaseInFilter, NumberFilter, CharFilter
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response


class NumberInFilter(BaseInFilter, NumberFilter):
    pass


class CharInFilter(BaseInFilter, CharFilter):
    pass


class GetFilterParams:
    """
    Класс для получения значений фильтра.

    Автоматически проходит по всем методам и собирает значения.

    Для ипользования метода необходимо явно указать filterset_class.
    В фильтре прописать classmethod-ы :
        - _{* название фильтра *}_filter_specs(cls, queryset) - прописываем вручную алгоритм сбора параметров
        - get_filter_params(cls, queryset) - собирает все параметры

    Пример (взят из AdvertisementFilter):

        @classmethod
        def _advertisement_filter_specs(cls, queryset) -> list[dict]:
            specs: list[dict] = []

            # Категория
            category_specs = {
                "name": "category",
                "choices": [
                    {"value": value, "label": label} for value, label in CategoryChoices.choices
                ],
            }
            specs.append(category_specs)

            # Цена
            price_range = queryset.aggregate(min=Min("price"), max=Max("price"))
            price_specs = {
                "name": "price",
                "range": {"min": price_range["min"], "max": price_range["max"]},
            }
            specs.append(price_specs)

            return specs

        @classmethod
        def get_filter_params(cls, queryset) -> dict[str, Union[int, list]]:
            params: list[dict] = []

            for method in dir(cls):
                if method.endswith("_filter_specs"):
                    params += [*getattr(cls, method)(queryset)]

            filter_params = {"count": queryset.count(), "params": params}
            return filter_params

    """

    @action(detail=False, methods=["GET"])
    def get_filter_params(self, request):
        """Эндпоинт для получения значений фильтра."""

        filter_params = self.filterset_class.get_filter_params(queryset=self.get_queryset())
        return Response(filter_params, status=status.HTTP_200_OK)

    # TODO дописать метод для подсчёта всех доступных параметров после фильтрации

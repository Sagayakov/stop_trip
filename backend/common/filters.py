from django_filters import BaseInFilter, NumberFilter, CharFilter, ChoiceFilter
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response


class NumberInFilter(BaseInFilter, NumberFilter):
    pass


class CharInFilter(BaseInFilter, CharFilter):
    pass


class ChoiceInFilter(BaseInFilter, ChoiceFilter):
    pass


class GetFilterParams:
    """
    Класс для получения значений фильтра.

    Автоматически проходит по всем методам и собирает значения.

    Для ипользования метода необходимо явно указать filterset_class.
    В фильтре прописать classmethod-ы :
        ### для получения всех параметров
        - _{* название фильтра *}_filter_specs(cls, queryset) - прописываем вручную алгоритм сбора параметров
        - get_filter_params(cls, queryset) - собирает все параметры

        ### для получения доступных параметров после фильтрации
        - _{* название фильтра *}_filtered_facets(cls, queryset) - прописываем вручную алгоритм сбора параметров
        - get_filtered_params(cls, queryset) - собирает все доступные параметры после фильтрации

    Пример (взят из AdvertisementFilter):
        ### для получения всех параметров

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

        ### для получения доступных параметров после фильтрации

        @classmethod
        def _advertisement_filtered_facets(cls, queryset) -> dict[str, list]:
            facets: dict[str, Union[list, dict]] = {}

            # Категория
            facets["category"] = CategoryChoices.values

            # Цена
            price_range = queryset.aggregate(min=Min("price"), max=Max("price"))
            facets["price"] = {"min": price_range["min"], "max": price_range["max"]}

            return facets

        @classmethod
        def get_filtered_params(cls, queryset) -> dict[str, Union[int, list]]:
            params: dict[str, Union[int, list]] = {}

            for method in dir(cls):
                if method.endswith("_filtered_facets"):
                    params |= getattr(cls, method)(queryset)

            filter_params = {"count": queryset.count(), "actual_params": params}
            return filter_params

    """

    @action(detail=False, methods=["GET"])
    def get_filter_params(self, request):
        """Эндпоинт для получения значений фильтра."""

        filter_params = self.filterset_class.get_filter_params(queryset=self.get_queryset())
        return Response(filter_params, status=status.HTTP_200_OK)

    @action(detail=False, methods=["GET"])
    def get_available_filtered_params(self, request):
        """Эндпоинт для получения доступных (после всех фильтраций) значений фильтра."""

        filtered_queryset = self.filterset_class(request.GET, self.get_queryset()).qs
        filtered_params = self.filterset_class.get_available_filtered_params(
            queryset=filtered_queryset
        )
        return Response(filtered_params, status=status.HTTP_200_OK)

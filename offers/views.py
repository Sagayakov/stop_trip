from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .constants import CategoryChoices
from .models import Advertisement
from .serializers import (
    PropertyCreateSerializer,
    AdvertisementListSerializer,
    TransportCreateSerializer,
    AdvertisementRetrieveSerializer,
)


@extend_schema(tags=["Advertisement"])
class AdvertisementModelViewSet(ModelViewSet):
    """Объявления."""

    def get_queryset(self):
        queryset = Advertisement.objects.prefetch_related("images")
        if self.action == self.retrieve.__name__:
            queryset.select_related("transport_brand", "transport_model")
        return queryset

    def get_serializer_class(self):
        if self.action in [self.create.__name__, self.update.__name__]:
            subcategories_serializers = {
                CategoryChoices.PROPERTY: PropertyCreateSerializer,
                CategoryChoices.TRANSPORT: TransportCreateSerializer,
            }

            if category := self.request.data.get("category"):
                return subcategories_serializers[category]
            else:
                raise ValidationError

        elif self.action == self.retrieve.__name__:
            return AdvertisementRetrieveSerializer

        return AdvertisementListSerializer

    # def get_permissions(self):
    #     if self.action == self.create.__name__:
    #         return ...  # авторизованные пользователи
    #     elif self.action == self.update.__name__:
    #         return ...  # собственник объявления
    #     elif self.action == self.destroy.__name__:
    #         return ...  # собственник объявления или админ
    #
    #     return [permission() for permission in self.permission_classes]

    def create(self, request, *args, **kwargs):
        owner = self.request.user
        request_data = {"owner": owner, **self.request.data}
        serializer = self.get_serializer(data=request_data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from users.models import User
from .constants import CategoryChoices
from .models import Advertisement
from .permissions import OwnerPermission
from .serializers import (
    PropertyCreateSerializer,
    AdvertisementListSerializer,
    TransportCreateSerializer,
    AdvertisementRetrieveSerializer,
    JobCreateSerializer,
    ServiceCreateSerializer,
    TaxiCreateSerializer,
    EventCreateSerializer,
    AdvertisementUpdateSerializer,
)


@extend_schema(tags=["Advertisement"])
class AdvertisementModelViewSet(ModelViewSet):
    """Объявления."""

    # todo продумать политику создания и изменения объявления (пользователь сам или через админов)
    # permission_classes = {
    #     "create": [IsAuthenticated],  # авторизованные пользователи
    #     "update": [OwnerPermission],  # собственник объявления
    #     "destroy": [OwnerPermission, IsAdminUser],  # собственник объявления или админ
    #     "list": [AllowAny],  # всем
    #     "retrieve": [AllowAny],  # всем
    # }

    def get_queryset(self):
        queryset = Advertisement.objects.all()

        if self.action == self.list.__name__:
            queryset = queryset.prefetch_related("images")

        if self.action == self.retrieve.__name__:
            queryset = queryset.select_related(
                "transport_brand", "transport_model"
            ).prefetch_related("property_amenities")

        return queryset

    def get_serializer_class(self):
        if self.action == self.create.__name__:
            subcategories_serializers = {
                CategoryChoices.PROPERTY.value: PropertyCreateSerializer,
                CategoryChoices.TRANSPORT: TransportCreateSerializer,
                CategoryChoices.JOB: JobCreateSerializer,
                CategoryChoices.SERVICE: ServiceCreateSerializer,
                CategoryChoices.EVENT: EventCreateSerializer,
                CategoryChoices.TAXI: TaxiCreateSerializer,
            }

            if category := self.request.data.get("category"):
                return subcategories_serializers[category]
            else:
                raise ValidationError

        elif self.action == self.update.__name__:
            return AdvertisementUpdateSerializer

        elif self.action in [self.retrieve.__name__, self.update.__name__]:
            return AdvertisementRetrieveSerializer

        return AdvertisementListSerializer

    # def get_permissions(self):
    #     return [permission() for permission in self.permission_classes[self.action]]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.validated_data["owner"] = User.objects.get(id=self.request.user.id)
        serializer.save()  # todo оптимизация создания M2M связей
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.validated_data["owner"] = User.objects.get(id=self.request.user.id)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

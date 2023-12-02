from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from common.filters import GetFilterParams
from users.models import User
from .constants import CategoryChoices
from .filters import AdvertisementFilter
from .models import Advertisement, Country, Region, City
from .permissions import OwnerPermission, OwnerOrAdminPermission
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
    ExchangeRateCreateSerializer,
    MarketCreateSerializer,
    DocumentCreateSerializers,
    FoodCreateSerializer,
    ExcursionCreateSerializer,
)


@extend_schema(tags=["Advertisement"])
class AdvertisementModelViewSet(ModelViewSet, GetFilterParams):
    """Объявления."""

    custom_permission_classes = {
        "create": [IsAuthenticated],
        "update": [OwnerPermission],
        "destroy": [OwnerOrAdminPermission],
        "list": [AllowAny],
        "retrieve": [AllowAny],
        "get_filter_params": [AllowAny],
    }
    filterset_class = AdvertisementFilter
    # TODO добавить пагинацию

    def get_queryset(self):
        queryset = Advertisement.objects.filter(is_published=True)

        if self.action in [self.list.__name__, self.retrieve.__name__]:
            queryset = queryset.prefetch_related("images")

        if self.action == self.retrieve.__name__:
            queryset = queryset.select_related(
                "transport_brand",
                "transport_model",
                "proposed_currency",
                "exchange_for",
                "country",
                "region",
                "city",

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
                CategoryChoices.EXCHANGE_RATE: ExchangeRateCreateSerializer,
                CategoryChoices.MARKET: MarketCreateSerializer,
                CategoryChoices.DOCUMENT: DocumentCreateSerializers,
                CategoryChoices.FOOD: FoodCreateSerializer,
                CategoryChoices.EXCURSION: ExcursionCreateSerializer,
            }

            if category := self.request.data.get("category"):
                return subcategories_serializers[category]
            else:
                raise ValidationError

        elif self.action == self.update.__name__:
            return AdvertisementUpdateSerializer

        elif self.action == self.retrieve.__name__:
            return AdvertisementRetrieveSerializer

        return AdvertisementListSerializer

    def get_permissions(self):
        if self.action in self.custom_permission_classes.keys():
            return [permission() for permission in self.custom_permission_classes[self.action]]
        return [permission() for permission in self.permission_classes]

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
        serializer.save()  # todo оптимизация создания M2M связей
        return Response(serializer.data, status=status.HTTP_201_CREATED)

from copy import deepcopy

from django.db.models import Prefetch, Q
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django_filters.rest_framework import DjangoFilterBackend
from drf_spectacular.utils import extend_schema, OpenApiParameter
from rest_framework import status, filters
from rest_framework.decorators import action
from rest_framework.exceptions import ValidationError
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from slugify import slugify

from common.cache import cache_for_anonymous
from common.filters import GetFilterParams
from users.models import User, UserMessenger
from countries.models import Region, City
from countries.serializers import CitySerializer, RegionSerializer
from .constants import CategoryChoices
from .filters import AdvertisementFilter
from .models import (
    Advertisement,
    PropertyAmenity,
    RubExchangeRate,
    TransportModel,
    TransportBrand,
)
from .permissions import OwnerPermission, OwnerOrAdminPermission
from .throttles import ContactsAnonThrottle, ContactsUserThrottle
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
    MyAdvertisementSerializer,
    TransportModelSerializer,
    TransportBrandSerializer,
)


@extend_schema(tags=["Advertisement"])
class AdvertisementModelViewSet(ModelViewSet, GetFilterParams):
    """Объявления."""

    # Права на каждое действие. Действия, которых здесь нет, требуют авторизации
    # (см. DEFAULT_PERMISSION_CLASSES в settings).
    custom_permission_classes = {
        "create": [IsAuthenticated],
        "update": [OwnerPermission],
        "partial_update": [OwnerPermission],
        "destroy": [OwnerOrAdminPermission],
        "list": [AllowAny],
        "retrieve": [AllowAny],
        "get_filter_params": [AllowAny],
        "get_available_filtered_params": [AllowAny],
        "my_advertisements": [IsAuthenticated],
        "contacts": [AllowAny],
        "rub_rate": [AllowAny],
        "get_regions_by_country": [AllowAny],
        "get_cities_by_region": [AllowAny],
        "get_transport_brands": [AllowAny],
        "get_transport_models_by_brand": [AllowAny],
    }
    filterset_class = AdvertisementFilter
    pagination_class = PageNumberPagination
    lookup_field = "slug"
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    search_fields = ["title", "description"]

    def get_queryset(self):
        queryset = Advertisement.objects.select_related(
            "country", "region", "city", "proposed_currency", "exchange_for"
        )

        if self.action == self.list.__name__:
            queryset = queryset.filter(is_published=True).prefetch_related(
                "images",
                Prefetch(
                    "owner",
                    User.objects.all()
                    .prefetch_related("rating_from_users")
                    .annotate_avg_rating()
                    .annotate_rating_num()
                    .annotate_my_rating(self.request.user.id),
                ),
            )

            return queryset

        elif self.action == self.my_advertisements.__name__:
            queryset = queryset.prefetch_related("images")

            return queryset

        elif self.action == self.contacts.__name__:
            return Advertisement.objects.filter(self._visibility_filter()).select_related("owner")

        elif self.action == self.retrieve.__name__:
            queryset = (
                queryset.filter(self._visibility_filter())
                .select_related(
                    "transport_brand",
                    "transport_model",
                    "proposed_currency",
                    "exchange_for",
                )
                .prefetch_related(
                    "images",
                    "property_amenities",
                    Prefetch(
                        "owner",
                        User.objects.all()
                        .prefetch_related(
                            Prefetch(
                                "user_messengers", UserMessenger.objects.select_related("messenger")
                            ),
                        )
                        .annotate_avg_rating()
                        .annotate_rating_num()
                        .annotate_my_rating(self.request.user.id),
                    ),
                )
            )

            return queryset

        elif self.action in ("get_filter_params", "get_available_filtered_params"):
            # Значения фильтров считаем только по опубликованным объявлениям.
            return queryset.filter(is_published=True)

        return queryset

    def _visibility_filter(self) -> Q:
        """Опубликованные объявления видят все, снятые с публикации — только владелец."""

        visibility = Q(is_published=True)
        if self.request.user.is_authenticated:
            visibility |= Q(owner=self.request.user)
        return visibility

    def get_serializer_class(self):
        if self.action == self.create.__name__:
            subcategories_serializers = {
                CategoryChoices.PROPERTY: PropertyCreateSerializer,
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

            category = self.request.data.get("category")
            if category not in subcategories_serializers:
                raise ValidationError({"category": ["Укажите корректную категорию объявления."]})
            return subcategories_serializers[category]

        elif self.action in [self.update.__name__, self.partial_update.__name__]:
            return AdvertisementUpdateSerializer

        elif self.action == self.retrieve.__name__:
            return AdvertisementRetrieveSerializer

        elif self.action == self.my_advertisements.__name__:
            return MyAdvertisementSerializer

        return AdvertisementListSerializer

    def get_permissions(self):
        if self.action in self.custom_permission_classes.keys():
            return [permission() for permission in self.custom_permission_classes[self.action]]
        return [permission() for permission in self.permission_classes]

    def create(self, request, *args, **kwargs):
        request_data = deepcopy(request.data)
        images = request_data.pop("images", [])
        property_amenities = request_data.pop("property_amenities", [])
        serializer = self.get_serializer(data=request_data)
        serializer.is_valid(raise_exception=True)
        serializer.validated_data["images"] = images
        serializer.validated_data["slug"] = slugify(request.data["title"])
        if property_amenities:
            serializer.validated_data["property_amenities"] = (
                PropertyAmenity.objects.filter(slug__in=property_amenities[0].split(","))
                .values_list("id", flat=True)
                .distinct()
            )
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        request_data = deepcopy(request.data)
        upload_images = request_data.pop("upload_images", [])
        delete_images = request_data.pop("delete_images", [])
        property_amenities = request_data.pop("property_amenities", [])
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request_data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.validated_data["upload_images"] = upload_images
        serializer.validated_data["delete_images"] = delete_images
        # slug при смене заголовка не меняем: иначе ломаются ссылки на объявление, избранное и SEO.
        if property_amenities:
            serializer.validated_data["property_amenities"] = (
                PropertyAmenity.objects.filter(slug__in=property_amenities[0].split(","))
                .values_list("id", flat=True)
                .distinct()
            )
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    # Лента и карточка кэшируются для гостей в Redis и сбрасываются при любом изменении
    # объявлений (см. common/cache.py). Вошедшие пользователи получают свежие данные.
    @cache_for_anonymous()
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    @cache_for_anonymous()
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)

    @action(detail=False, methods=["GET"])
    def my_advertisements(self, request, *args, **kwargs):
        """Мои объявления."""

        queryset = self.get_queryset().filter(owner=self.request.user)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @extend_schema(responses={200: {"type": "object", "properties": {"phone": {"type": "string"}}}})
    @action(
        detail=True,
        methods=["GET"],
        throttle_classes=[ContactsAnonThrottle, ContactsUserThrottle],
    )
    def contacts(self, request, *args, **kwargs):
        """
        Телефон продавца. Отдаётся только по нажатию кнопки «Показать телефон».

        Номера нет в списке и карточке объявления, а частота запросов ограничена
        (см. DEFAULT_THROTTLE_RATES), поэтому массово собрать номера скриптом не получится.
        """

        advertisement = self.get_object()
        phone = advertisement.owner.phone
        return Response({"phone": str(phone) if phone else None}, status=status.HTTP_200_OK)

    @extend_schema(
        responses={200: {"type": "object", "properties": {"vnd_per_rub": {"type": "number"}}}}
    )
    @action(detail=False, methods=["GET"])
    @cache_for_anonymous()
    def rub_rate(self, request, *args, **kwargs):
        """Курс рубля: сколько донгов за 1 рубль. null — курс не задан, рубли не показываем."""

        rate = RubExchangeRate.get_solo().vnd_per_rub
        return Response({"vnd_per_rub": float(rate) if rate > 0 else None})

    @method_decorator(cache_page(60 * 10))
    @extend_schema(
        parameters=[
            OpenApiParameter(
                name="country",
                type=str,
                location=OpenApiParameter.QUERY,
                description="Ввести slug страны",
                required=True,
            ),
        ]
    )
    @action(detail=False, methods=["GET"])
    def get_regions_by_country(self, request, *args, **kwargs):
        """Возвращает регионы по стране."""

        country = request.query_params.get("country")
        if not country:
            return Response("country - обязательный параметр", status=status.HTTP_400_BAD_REQUEST)
        queryset = Region.objects.filter(country__slug=country)
        serializer = RegionSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @method_decorator(cache_page(60 * 10))
    @extend_schema(
        parameters=[
            OpenApiParameter(
                name="region",
                type=str,
                location=OpenApiParameter.QUERY,
                description="Ввести slug региона",
                required=True,
            ),
        ]
    )
    @action(detail=False, methods=["GET"])
    def get_cities_by_region(self, request, *args, **kwargs):
        """Возвращает города по региону."""

        region = request.query_params.get("region")
        if not region:
            return Response("region - обязательный параметр", status=status.HTTP_400_BAD_REQUEST)
        queryset = City.objects.filter(region__slug=region)
        serializer = CitySerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @method_decorator(cache_page(60 * 10))
    @extend_schema(
        parameters=[
            OpenApiParameter(
                name="category",
                type=str,
                location=OpenApiParameter.QUERY,
                description="Ввести категорию транспорта",
                required=False,
            ),
        ]
    )
    @action(detail=False, methods=["GET"])
    def get_transport_brands(self, request, *args, **kwargs):
        """Возвращает все брэнды транспорта."""

        if category := request.query_params.get("category"):
            queryset = (
                TransportBrand.objects.prefetch_related("brand_models")
                .filter(brand_models__category=category)
                .distinct()
            )
        else:
            queryset = TransportBrand.objects.all()
        serializer = TransportBrandSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @method_decorator(cache_page(60 * 10))
    @extend_schema(
        parameters=[
            OpenApiParameter(
                name="brand",
                type=str,
                location=OpenApiParameter.QUERY,
                description="Ввести slug бренда транспорта",
                required=True,
            ),
            OpenApiParameter(
                name="category",
                type=str,
                location=OpenApiParameter.QUERY,
                description="Ввести категорию транспорта",
                required=False,
            ),
        ]
    )
    @action(detail=False, methods=["GET"])
    def get_transport_models_by_brand(self, request, *args, **kwargs):
        """Возвращает модели транспорта по марке."""

        brand = request.query_params.get("brand")
        if not brand:
            return Response("brand - обязательный параметр", status=status.HTTP_400_BAD_REQUEST)
        if category := request.query_params.get("category"):
            queryset = TransportModel.objects.filter(brand__slug=brand, category=category)
        else:
            queryset = TransportModel.objects.filter(brand__slug=brand)
        serializer = TransportModelSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

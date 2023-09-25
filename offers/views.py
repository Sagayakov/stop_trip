from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .constants.subcategory_constants import SubCategoryChoices
from .models import Advertisement, Category, SubCategory
from .serializers import CategorySerializer, SubCategorySerializer, PropertySerializer, AdvertisementSerializer


@extend_schema(tags=["Advertisement"])
class AdvertisementModelViewSet(ModelViewSet):
    queryset = Advertisement.objects.all()

    def get_serializer_class(self):
        subcategories_serializers = {
            SubCategoryChoices.PROPERTY: PropertySerializer,
            SubCategoryChoices.TRANSPORT: ...,
        }
        if subcategory := self.request.data.get("subcategory"):
            return subcategories_serializers[subcategory]
        return AdvertisementSerializer

    def create(self, request, *args, **kwargs):
        owner = self.request.user
        request_data = {'owner': owner, **self.request.data}
        serializer = self.get_serializer(data=request_data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@extend_schema(tags=["Category"])
class CategoryModelViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


@extend_schema(tags=["SubCategory"])
class SubCategoryModelViewSet(ModelViewSet):
    queryset = SubCategory.objects.all()
    serializer_class = SubCategorySerializer

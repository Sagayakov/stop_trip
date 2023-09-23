from drf_spectacular.utils import extend_schema
from rest_framework import mixins, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet, GenericViewSet

from offers.models import Advertisement, Category, SubCategory
from offers.serializers import CategorySerializer, SubCategorySerializer, PropertySerializer, AdvertisementSerializer


@extend_schema(tags=["Advertisement"])
class AdvertisementModelViewSet(mixins.RetrieveModelMixin,
                                mixins.DestroyModelMixin,
                                mixins.ListModelMixin,
                                GenericViewSet):
    queryset = Advertisement.objects.all()

    def get_serializer_class(self):
        if self.action in ('property_update', 'property_create'):
            return PropertySerializer
        else:
            return AdvertisementSerializer

    @action(detail=False, methods=['POST'])
    def property_create(self, request):
        serializer_class = self.get_serializer_class()
        serializer = serializer_class(data=self.request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CategoryModelViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class SubCategoryModelViewSet(ModelViewSet):
    queryset = SubCategory.objects.all()
    serializer_class = SubCategorySerializer

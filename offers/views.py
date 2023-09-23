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
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['PUT'])
    def property_update(self, request, pk=None):
        try:
            advertisement = Advertisement.objects.get(pk=pk)
        except Advertisement.DoesNotExist:
            return Response({"detail": "Advertisement not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(advertisement, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@extend_schema(tags=["Category"])
class CategoryModelViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


@extend_schema(tags=["SubCategory"])
class SubCategoryModelViewSet(ModelViewSet):
    queryset = SubCategory.objects.all()
    serializer_class = SubCategorySerializer

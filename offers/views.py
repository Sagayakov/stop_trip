from rest_framework import mixins
from rest_framework.viewsets import GenericViewSet

from offers.models import Advertisement, Category
from offers.serializers import AdvertisementSerializer, CategorySerializer


class AdvertisementModelViewSet(mixins.ListModelMixin,
                                mixins.CreateModelMixin,
                                mixins.RetrieveModelMixin,
                                mixins.UpdateModelMixin,
                                mixins.DestroyModelMixin,
                                GenericViewSet):
    queryset = Advertisement.objects.all()
    serializer_class = AdvertisementSerializer


class CategoryModelViewSet(mixins.ListModelMixin,
                           mixins.CreateModelMixin,
                           mixins.RetrieveModelMixin,
                           mixins.UpdateModelMixin,
                           mixins.DestroyModelMixin,
                           GenericViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

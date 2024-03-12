from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from drf_spectacular.utils import extend_schema
from rest_framework.mixins import (
    CreateModelMixin,
    DestroyModelMixin,
    UpdateModelMixin,
    ListModelMixin,
)
from rest_framework import status
from rest_framework.viewsets import GenericViewSet
from rest_framework.decorators import action
from rest_framework.response import Response

from offers.permissions import OwnerOrAdminPermission
from ..models import UserMessenger, Messenger
from ..serializers import MessengerCreateSerializer, MessengerListSerializer, MessengerSerializer


@extend_schema(tags=["Messenger"])
class MessengerViewSet(
    CreateModelMixin, UpdateModelMixin, DestroyModelMixin, GenericViewSet, ListModelMixin
):
    """Мессенджеры."""

    permission_classes = [OwnerOrAdminPermission]

    def get_serializer_class(self):
        if self.action in [self.create.__name__, self.update.__name__]:
            return MessengerCreateSerializer
        elif self.action == self.all_messengers.__name__:
            return MessengerSerializer
        return MessengerListSerializer

    def get_queryset(self):
        return UserMessenger.objects.filter(owner=self.request.user)

    @method_decorator(cache_page(60 * 10))
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    @method_decorator(cache_page(60 * 10))
    @action(detail=False, methods=["GET"])
    def all_messengers(self, request, *args, **kwargs):
        queryset = Messenger.objects.all()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

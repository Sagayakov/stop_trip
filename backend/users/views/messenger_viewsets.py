from drf_spectacular.utils import extend_schema
from rest_framework.mixins import (
    CreateModelMixin,
    DestroyModelMixin,
    UpdateModelMixin,
    ListModelMixin,
)
from rest_framework.viewsets import GenericViewSet

from offers.permissions import OwnerOrAdminPermission
from ..models import UserMessenger
from ..serializers import MessengerCreateSerializer, MessengerListSerializer


@extend_schema(tags=["Messenger"])
class MessengerViewSet(
    CreateModelMixin, UpdateModelMixin, DestroyModelMixin, GenericViewSet, ListModelMixin
):
    """Мессенджеры."""

    permission_classes = [OwnerOrAdminPermission]

    def get_serializer_class(self):
        if self.action in [self.create.__name__, self.update.__name__]:
            return MessengerCreateSerializer
        return MessengerListSerializer

    def get_queryset(self):
        return UserMessenger.objects.filter(owner=self.request.user)

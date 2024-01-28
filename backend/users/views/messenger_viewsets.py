from drf_spectacular.utils import extend_schema
from rest_framework.mixins import CreateModelMixin, DestroyModelMixin, UpdateModelMixin
from rest_framework.viewsets import GenericViewSet

from offers.permissions import OwnerOrAdminPermission
from ..models import UserMessenger
from ..serializers import MessengerCreateSerializer


@extend_schema(tags=["Messenger"])
class MessengerViewSet(CreateModelMixin, UpdateModelMixin, DestroyModelMixin, GenericViewSet):
    """Мессенджеры."""

    serializer_class = MessengerCreateSerializer
    permission_classes = [OwnerOrAdminPermission]

    def get_queryset(self):
        return UserMessenger.objects.filter(owner=self.request.user)

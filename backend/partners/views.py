from drf_spectacular.utils import extend_schema
from rest_framework.mixins import ListModelMixin
from rest_framework.permissions import AllowAny
from rest_framework.viewsets import GenericViewSet

from .models import PartnerModel
from .serializers import PartnerListSerializer


@extend_schema(tags=["Partner"])
class PartnerViewSet(ListModelMixin, GenericViewSet):
    """Партнеры"""

    permission_classes = [AllowAny]
    serializer_class = PartnerListSerializer

    def get_queryset(self):
        return PartnerModel.objects.all().prefetch_related(
            "images",
        )

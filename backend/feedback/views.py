from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.mixins import CreateModelMixin
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from .serializers import FeedBackCreateSerializer


@extend_schema(tags=["Feedback"])
class FeedbackModelViewSet(CreateModelMixin, GenericViewSet):
    """Обратная связь"""

    permission_classes = [IsAuthenticated]
    serializer_class = FeedBackCreateSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.validated_data["owner"] = self.request.user
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

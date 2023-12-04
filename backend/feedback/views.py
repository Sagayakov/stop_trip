from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from drf_spectacular.utils import extend_schema

from .serializers import FeedBackCreateSerializer
from .models import FeedBackModel


@extend_schema(tags=["Feedback"])
class FeedbackModelViewSet(ModelViewSet):
    """Обратная связь"""

    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = FeedBackModel.objects.all()
        return queryset

    def get_serializer_class(self):
        return FeedBackCreateSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.validated_data["owner"] = self.request.user
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

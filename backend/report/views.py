from drf_spectacular.utils import extend_schema
from rest_framework import mixins, status
from rest_framework.viewsets import GenericViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.db import IntegrityError

from .serializers import ReportSerializer


@extend_schema(tags=["Report"])
class ReportViewSet(mixins.CreateModelMixin, GenericViewSet):
    """Report View"""

    permission_classes = [IsAuthenticated]
    serializer_class = ReportSerializer

    def create(self, request, *args, **kwargs):
        try:
            return super().create(request, *args, **kwargs)
        except IntegrityError as _:
            return Response(
                status=status.HTTP_400_BAD_REQUEST,
            )

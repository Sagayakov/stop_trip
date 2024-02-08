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

    def create(self, request, *args, **kwargs):
        serializer = ReportSerializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            serializer.validated_data["from_user"] = self.request.user
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except IntegrityError as _:
            return Response(
                {"detail": "Уже есть жалоба от юзера к этому объявлению"},
                status=status.HTTP_400_BAD_REQUEST,
            )

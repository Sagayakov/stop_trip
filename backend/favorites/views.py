from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import CreateModelMixin

from .models import LikeModel
from .serializers import LikeSerializer


@extend_schema(tags=["Likes"])
class LikeViewSet(CreateModelMixin, GenericViewSet):
    """Лайки"""

    queryset = LikeModel.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = LikeSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        advertisement = serializer.validated_data["advertisement"]

        like = LikeModel.objects.filter(
            owner=self.request.user, advertisement__slug=advertisement.slug
        ).first()

        if like:
            like.delete()
            return Response({"message": "Лайк удален"}, status=status.HTTP_204_NO_CONTENT)
        else:
            serializer = self.get_serializer(data=self.request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({"message": "Лайк установлен"}, status=status.HTTP_201_CREATED)

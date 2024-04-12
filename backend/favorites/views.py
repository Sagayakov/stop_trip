from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import CreateModelMixin

from .models import LikeModel
from .serializers import LikeSerializer


@extend_schema(tags=["Likes"])
class LikeToggleViewSet(CreateModelMixin, GenericViewSet):
    """Лайки"""

    queryset = LikeModel.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = LikeSerializer

    def create(self, request, *args, **kwargs):
        user = self.request.user
        data = self.request.data
        slug = data.get("advertisement")
        like = LikeModel.objects.filter(owner=user, advertisement__slug=slug).first()

        if like:
            like.delete()
            return Response({"message": "Лайк удален"}, status=status.HTTP_200_OK)
        else:
            serializer = self.get_serializer(data=data)
            serializer.is_valid(raise_exception=True)
            serializer.validated_data["owner"] = user
            serializer.save()
            return Response({"message": "Лайк установлен"}, status=status.HTTP_201_CREATED)

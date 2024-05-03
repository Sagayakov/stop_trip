from drf_spectacular.utils import extend_schema
from django.db.models import Prefetch
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import CreateModelMixin
from rest_framework.decorators import action

from .models import LikeModel
from .serializers import LikeSerializer, LikeListSerializer
from offers.models import Advertisement
from users.models import User


@extend_schema(tags=["Likes"])
class LikeViewSet(CreateModelMixin, GenericViewSet):
    """Лайки"""

    # queryset = LikeModel.objects.all()
    permission_classes = [IsAuthenticated]
    # serializer_class = LikeSerializer

    def get_serializer_class(self):
        if self.action == self.create.__name__:
            return LikeSerializer
        return LikeListSerializer

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

    @action(detail=False, methods=["GET"])
    def my_favorites(self, request, *args, **kwargs):
        """Мои лайки"""

        queryset = (
            LikeModel.objects.filter(owner=self.request.user)
            # .select_related("advertisement", "owner")
            .prefetch_related(
                # LikeModel
                Prefetch(
                    "advertisement",
                    Advertisement.objects.select_related(
                        "country", "region", "city"
                    ).prefetch_related(
                        "images",
                        Prefetch(
                            "owner",
                            User.objects.all()
                            .annotate_avg_rating()
                            .annotate_rating_num()
                            .annotate_my_rating(self.request.user.id),
                        ),
                    ),
                ),
            )
        )
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

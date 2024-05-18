from drf_spectacular.utils import extend_schema
from django.db.models import Prefetch
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import CreateModelMixin, DestroyModelMixin
from rest_framework.decorators import action

from .models import FavoriteModel
from .serializers import FavoriteSerializer, FavoriteListSerializer
from offers.models import Advertisement
from users.models import User


@extend_schema(tags=["Favorites"])
class FavoriteViewSet(CreateModelMixin, DestroyModelMixin, GenericViewSet):
    """Лайки"""

    queryset = FavoriteModel.objects.all()
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.action in [self.create.__name__, self.delete.__name__]:
            return FavoriteSerializer
        return FavoriteListSerializer

    def create(self, request, *args, **kwargs):
        advertisement = request.data.get("advertisement")

        like = FavoriteModel.objects.filter(
            owner=self.request.user, advertisement__slug=advertisement
        ).first()

        if not like:
            serializer = self.get_serializer(data=self.request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({"message": "Лайк установлен"}, status=status.HTTP_201_CREATED)
        else:
            return Response({"message": "Лайк уже установлен"}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        advertisement = request.data.get("advertisement")

        like = FavoriteModel.objects.filter(
            owner=self.request.user, advertisement__slug=advertisement
        ).first()

        if like:
            like.delete()
            return Response({"message": "Лайк удален"}, status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({"message": "Лайк не найден"}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=["GET"])
    def my_favorites(self, request, *args, **kwargs):
        """Мои избранные объявления"""

        queryset = FavoriteModel.objects.filter(owner=self.request.user).prefetch_related(
            Prefetch(
                "advertisement",
                Advertisement.objects.select_related("country", "region", "city").prefetch_related(
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
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=["GET"])
    def my_likes(self, request, *args, **kwargs):
        """Мои установленные лайки"""

        queryset = FavoriteModel.objects.filter(owner=self.request.user)
        data = queryset.values_list("advertisement__slug", flat=True)
        return Response(list(data), status=status.HTTP_200_OK)

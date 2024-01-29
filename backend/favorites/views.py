from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.mixins import ListModelMixin
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from offers.models import Advertisement
from .favorites import Favorite
from .serializers import FavoriteAdvertisementCreateSerializer


@extend_schema(tags=["Favorites"])
class FavoriteViewSet(GenericViewSet, ListModelMixin):
    """Избранное."""

    def get_serializer_class(self):
        if self.action in ["create", "delete_favorite"]:
            return FavoriteAdvertisementCreateSerializer
        else:
            return

    def get_queryset(self):
        favorites = Favorite(self.request.session)
        list_keys = favorites.keys
        return Advertisement.objects.filter(id__in=list_keys)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=self.request.data)
        serializer.is_valid(raise_exception=True)
        favorites = Favorite(request.session)
        try:
            favorites.add(serializer.data["id"])
        except ValueError:
            pass

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def list(self, request, *args, **kwargs):
        favorites = Favorite(request.session)
        list_keys = favorites.keys
        return Response(list_keys, status=status.HTTP_200_OK)

    @extend_schema(responses=None)
    @action(detail=False, methods=["POST"])
    def delete_favorite(self, request, *args, **kwargs):
        """Эндпоинт удаления ОН из избранного."""

        serializer = self.get_serializer(data=self.request.data)
        serializer.is_valid(raise_exception=True)
        try:
            Favorite(self.request.session).remove(serializer.data["id"])
        except ValueError:
            pass
        return Response(status=status.HTTP_204_NO_CONTENT)

    @extend_schema(request=None, responses=None)
    @action(detail=False, methods=["POST"])
    def clear_favorite(self, request, *args, **kwargs):
        """Эндпоинт очистки избранного."""

        Favorite(self.request.session).clear()
        return Response(status=status.HTTP_204_NO_CONTENT)

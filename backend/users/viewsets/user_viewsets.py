from rest_framework import mixins, viewsets
from rest_framework.permissions import IsAuthenticated
from drf_spectacular.utils import extend_schema

from users.models import User
from offers.models import Advertisement
from offers.serializers import AdvertisementListSerializer


@extend_schema(tags=["Advertisement for 1 user"])
class UserAdvertisementModelView(mixins.ListModelMixin, viewsets.GenericViewSet):
    """Вывод собственных объявлений юзера"""

    permission_classes = [IsAuthenticated]
    serializer_class = AdvertisementListSerializer

    def get_queryset(self):
        user = User.objects.get(id=self.request.user.id)
        queryset = Advertisement.objects.filter(owner=user).select_related("owner")

        return queryset

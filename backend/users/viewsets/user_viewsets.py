from drf_spectacular.utils import extend_schema
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated

from users.models import User
from offers.models import Advertisement
from offers.serializers import AdvertisementListSerializer


@extend_schema(tags=["Advertisement_user"])
class UserAdvertisementModelView(ModelViewSet):
    """Вывод собственных объявлений юзера"""

    permission_classes = [IsAuthenticated]
    http_method_names = ["post"]

    def get_queryset(self):
        user = User.objects.get(id=self.request.user.id)
        queryset = Advertisement.objects.filter(owner=user).select_related("owner")

        return queryset

    def get_serializer_class(self):
        return AdvertisementListSerializer

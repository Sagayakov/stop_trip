from drf_spectacular.utils import extend_schema
from rest_framework.mixins import RetrieveModelMixin
from rest_framework.permissions import AllowAny
from rest_framework.viewsets import GenericViewSet
from django.db.models import Prefetch

from ..models import User, UserMessenger
from ..serializers import UserForRetrieveAdvertisementSerializer


@extend_schema(tags=["User"])
class UserViewSet(GenericViewSet, RetrieveModelMixin):
    """Вывод информации о юзере"""

    permission_classes = [AllowAny]
    serializer_class = UserForRetrieveAdvertisementSerializer

    def get_queryset(self):
        queryset = (
            User.objects.all()
            .prefetch_related(
                Prefetch(
                    "user_messengers",
                    queryset=UserMessenger.objects.select_related("messenger"),
                )
            )
            .annotate_avg_rating()
            .annotate_rating_num()
            .annotate_my_rating(self.request.user.id)
        )

        return queryset

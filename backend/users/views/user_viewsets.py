from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.mixins import RetrieveModelMixin
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.viewsets import GenericViewSet
from django.db.models import Prefetch

from offers.throttles import ContactsAnonThrottle, ContactsUserThrottle
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

    @action(
        detail=True,
        methods=["GET"],
        throttle_classes=[ContactsAnonThrottle, ContactsUserThrottle],
    )
    def contacts(self, request, *args, **kwargs):
        """Телефон продавца для кнопки «Показать телефон» на его странице (с лимитом запросов)."""

        user = User.objects.filter(pk=kwargs["pk"], is_active=True).only("phone").first()
        if user is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response({"phone": str(user.phone) if user.phone else None})

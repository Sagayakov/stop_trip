from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import extend_schema, OpenApiParameter
from rest_framework import mixins
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from .models import Rate, User
from .serializers import RateSerializer, RateChangeSerializer


class RateAPIView(mixins.ListModelMixin, GenericViewSet):
    queryset = Rate.objects.filter(is_active=True).select_related("from_user", "to_user")
    custom_permission_classes = {
        "change_rate": [IsAuthenticated],
        "list": [AllowAny],
    }

    def get_serializer_class(self):
        if self.action == self.change_rate.__name__:
            return RateChangeSerializer
        return RateSerializer

    def get_permissions(self):
        if self.action in self.custom_permission_classes.keys():
            return [permission() for permission in self.custom_permission_classes[self.action]]
        return [permission() for permission in self.permission_classes]

    @extend_schema(
        parameters=[
            OpenApiParameter(
                name="to_user",
                description="Пользователю",
                required=True,
                type=OpenApiTypes.INT,
            ),
        ]
    )
    @action(detail=False, methods=["POST"])
    def change_rate(self, request, *args, **kwargs):
        to_user_pk = int(request.query_params.get("to_user"))
        from_user_pk = self.request.user.pk
        if to_user_pk == from_user_pk:
            return Response(
                status=status.HTTP_400_BAD_REQUEST, data={"message": "You can't rate yourself."}
            )

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        if (
            user_rate := self.get_queryset()
            .filter(from_user=from_user_pk, to_user=to_user_pk)
            .first()
        ):
            user_rate.rating = serializer.validated_data["rating"]
            user_rate.comment = serializer.validated_data["comment"]
            user_rate.save()
        else:
            user_rate = Rate(
                from_user=User.objects.get(pk=from_user_pk),
                to_user=User.objects.get(pk=to_user_pk),
                rating=serializer.validated_data["rating"],
                comment=serializer.validated_data["comment"],
            )
            user_rate.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import RateSerializer, RateDetailSerializer
from .models import User, Rate
from .permissions import OwnerOrAdminPermission


class CreateListRatesAPIView(viewsets.ModelViewSet):
    serializer_class = RateSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        pk = self.kwargs["pk"]
        return Rate.objects.filter(to_user=pk, is_active=True)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        pk = self.kwargs["pk"]
        user = User.objects.get(pk=pk)
        rate = Rate.objects.filter(to_user=user,
                                   from_user=self.request.user)
        if rate.exists():
            return Response(status=status.HTTP_400_BAD_REQUEST, data={"message": "You already rated this user"})
        if user.rating == 0:
            user.average_rating = serializer.validated_data["rating"]
        else:
            user.average_rating = (user.average_rating + serializer.validated_data["rating"]) / 2
        user.rating = user.rating + 1
        user.save()
        serializer.save(to_user=user,
                        from_user=self.request.user)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)




#
# class RetrieveUpdateDestroyRateAPIView(generics.RetrieveUpdateDestroyAPIView):
#     serializer_class = RateDetailSerializer
#     queryset = Rate.objects.all()
#     permission_classes = (IsAuthenticated, OwnerOrAdminPermission)
#
#     def get_permissions(self):
#         if self.request.method == "GET":
#             return [OwnerOrAdminPermission()]
#         return [IsAuthenticated()]







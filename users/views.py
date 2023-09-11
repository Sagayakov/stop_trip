from rest_framework.generics import ListAPIView

from users.models import User
from users.serializers import UserSerializer


class UserListAPIView(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

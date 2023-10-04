from rest_framework.permissions import IsAuthenticated


class OwnerPermission(IsAuthenticated):
    def has_object_permission(self, request, view, obj):
        return obj == request.user

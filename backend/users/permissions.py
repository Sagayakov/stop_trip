from rest_framework.permissions import IsAuthenticated


class OwnerPermission(IsAuthenticated):
    def has_object_permission(self, request, view, obj):
        return obj.rate_author == request.user


class OwnerOrAdminPermission(IsAuthenticated):
    def has_object_permission(self, request, view, obj):
        return any(
            [obj.from_user == request.user, bool(request.user and request.user.is_staff)]
        )

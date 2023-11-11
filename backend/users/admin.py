from django.contrib.admin import register
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as Admin
from django.utils.translation import gettext_lazy as _

from .models import User


# @register(User)
# class UserAdmin(UserAdmin):
#     """Пользователь."""
#
#     list_display = ("username", "email", "phone", "first_name", "last_name", "is_staff")
#     fieldsets = (
#         (None, {"fields": ("username", "password")}),
#         (_("Personal info"), {"fields": ("first_name", "last_name", "email", "phone")}),
#         (
#             _("Permissions"),
#             {
#                 "fields": (
#                     "is_active",
#                     "is_staff",
#                     "is_superuser",
#                     "groups",
#                     "user_permissions",
#                 ),
#             },
#         ),
#         (_("Important dates"), {"fields": ("last_login", "date_joined")}),
#     )
class UserAdmin(Admin):
    model = User
    list_display = ("full_name", "email", "phone", "is_staff", "is_active")
    list_filter = (
        "email",
        "is_staff",
        "is_active",
    )
    fieldsets = (
        (None, {"fields": ("full_name", "email", "phone", "password")}),
        (_("Permissions"), {"fields": ("is_staff", "is_active", "groups", "user_permissions")}),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "full_name",
                    "email",
                    "phone",
                    "password1",
                    "password2",
                    "is_staff",
                    "is_active",
                    "groups",
                    "user_permissions",
                ),
            },
        ),
    )
    search_fields = ("email",)
    ordering = ("email",)


admin.site.register(User, UserAdmin)

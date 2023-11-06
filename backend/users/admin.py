from django.contrib.admin import register
from django.contrib.auth.admin import UserAdmin as Admin
from django.utils.translation import gettext_lazy as _

from .models import User


@register(User)
class UserAdmin(Admin):
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

from django.contrib.admin import register, ModelAdmin, StackedInline
from django.contrib.auth.admin import UserAdmin as Admin
from django.utils.translation import gettext_lazy as _
from django import forms
from django.db import models

from .models import User, Messenger, UserMessenger


class UserMessengerInline(StackedInline):
    model = UserMessenger
    extra = 0


@register(User)
class UserAdmin(Admin):
    inlines = (UserMessengerInline,)
    list_display = ("full_name", "date_joined", "email", "phone", "is_staff", "is_active")
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
    search_fields = ("email", "full_name")
    ordering = ("email",)


@register(Messenger)
class MessengersAdmin(ModelAdmin):
    formfield_overrides = {
        models.CharField: {"widget": forms.Textarea(attrs={"rows": 4, "cols": 80})},
    }
    list_display = ("name", "link_to_messenger")

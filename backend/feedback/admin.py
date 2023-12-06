from django.contrib.admin import register, ModelAdmin

from .models import FeedBackModel


@register(FeedBackModel)
class FeedBackAdmin(ModelAdmin):
    list_display = (
        "id",
        "owner",
        "feedback",
        "date_create",
    )

    list_display_links = (
        "id",
        "owner",
        "feedback",
    )

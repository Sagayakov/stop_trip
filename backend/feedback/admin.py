from django.contrib.admin import register, ModelAdmin

from .models import FeedBackModel


@register(FeedBackModel)
class FeedBackAdmin(ModelAdmin):
    list_display = (
        "id",
        "owner",
        "text",
        "date_create",
    )

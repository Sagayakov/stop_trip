from django.contrib.admin import register, ModelAdmin

from .models import FeedBackModel


@register(FeedBackModel)
class FeedBackAdmin(ModelAdmin):
    list_display = (
        "id",
        "owner",
        "short_text",
        "date_create",
    )

    def short_text(self, obj):
        return obj.text[:75]

    short_text.short_description = "Начало отзыва"

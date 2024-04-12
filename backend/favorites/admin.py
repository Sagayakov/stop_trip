from django.contrib.admin import register, ModelAdmin

from .models import LikeModel


@register(LikeModel)
class LikeAdmin(ModelAdmin):
    list_display = (
        "id",
        "owner",
        "advertisement",
    )

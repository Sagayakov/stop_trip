from django.contrib.admin import register, ModelAdmin

from .models import FavoriteModel


@register(FavoriteModel)
class FavoriteAdmin(ModelAdmin):
    list_display = (
        "id",
        "owner",
        "advertisement",
    )

from django.contrib.admin import register, ModelAdmin
from ..models import Region


@register(Region)
class RegionAdmin(ModelAdmin):
    prepopulated_fields = {"slug": ("name",)}
    list_display = ("name", "country")
    list_filter = ("country",)

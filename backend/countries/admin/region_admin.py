from django.contrib.admin import register, ModelAdmin
from ..models import Region


@register(Region)
class RegionAdmin(ModelAdmin):
    prepopulated_fields = {"slug": ("name",)}

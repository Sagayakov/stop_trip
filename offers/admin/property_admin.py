from django.contrib.admin import register, ModelAdmin

from ..models import PropertyAmenity


@register(PropertyAmenity)
class PropertyAmenityAdmin(ModelAdmin):
    pass
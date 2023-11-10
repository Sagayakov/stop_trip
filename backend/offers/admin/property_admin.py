from django.contrib.admin import register, ModelAdmin

from ..models import PropertyAmenity, PropertyCity, PropertyDistrict


@register(PropertyAmenity)
class PropertyAmenityAdmin(ModelAdmin):
    pass


@register(PropertyCity)
class TransportBrandAdmin(ModelAdmin):
    prepopulated_fields = {"slug": ("name",)}


@register(PropertyDistrict)
class TransportModelAdmin(ModelAdmin):
    prepopulated_fields = {"slug": ("name",)}

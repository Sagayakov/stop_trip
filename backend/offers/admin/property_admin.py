from django.contrib.admin import register, ModelAdmin

from ..models import PropertyAmenity, PropertyCity, PropertyDistrict


@register(PropertyCity)
class PropertyCityAdmin(ModelAdmin):
    prepopulated_fields = {"slug": ("name",)}


@register(PropertyDistrict)
class PropertyDistrictAdmin(ModelAdmin):
    prepopulated_fields = {"slug": ("name",)}


@register(PropertyAmenity)
class PropertyAmenityAdmin(ModelAdmin):
    prepopulated_fields = {"slug": ("name",)}

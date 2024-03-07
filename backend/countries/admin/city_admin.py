from django.contrib.admin import register, ModelAdmin
from ..models import City


@register(City)
class CityAdmin(ModelAdmin):
    list_display = ("name", "slug", "region", "region_country")
    prepopulated_fields = {"slug": ("name",)}
    list_filter = ("region",)

    def region_country(self, obj):
        return obj.region.country if obj.region else None

    region_country.short_description = "Страна"

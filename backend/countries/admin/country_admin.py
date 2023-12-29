from django.contrib.admin import register, ModelAdmin
from ..models import Country


@register(Country)
class CountryAdmin(ModelAdmin):
    prepopulated_fields = {"slug": ("name",)}

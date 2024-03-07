from django.contrib.admin import ModelAdmin, register

from ..models import TransportModel, TransportBrand


@register(TransportBrand)
class TransportBrandAdmin(ModelAdmin):
    prepopulated_fields = {"slug": ("name",)}


@register(TransportModel)
class TransportModelAdmin(ModelAdmin):
    prepopulated_fields = {"slug": ("name",)}
    list_display = ("name", "slug", "brand")
    list_filter = ("brand",)

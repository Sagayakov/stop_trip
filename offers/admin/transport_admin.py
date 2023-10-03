from django.contrib.admin import ModelAdmin, register

from ..models import TransportModel, TransportBrand


@register(TransportBrand)
class TransportBrandAdmin(ModelAdmin):
    pass


@register(TransportModel)
class TransportModelAdmin(ModelAdmin):
    pass

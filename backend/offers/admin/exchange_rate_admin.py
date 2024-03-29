from django.contrib.admin import register, ModelAdmin

from ..models import Currency


@register(Currency)
class CurrencyAdmin(ModelAdmin):
    list_display = ("name", "short_name")

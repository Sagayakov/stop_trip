from django.contrib import admin
from solo.admin import SingletonModelAdmin

from ..models import RubExchangeRate


@admin.register(RubExchangeRate)
class RubExchangeRateAdmin(SingletonModelAdmin):
    fields = ("vnd_per_rub", "updated_at")
    readonly_fields = ("updated_at",)

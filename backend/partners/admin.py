from django.contrib.admin import register, ModelAdmin, StackedInline

from .models import PartnerModel, PartnerImageModel


class PartnerImageInline(StackedInline):
    model = PartnerImageModel
    extra = 0


@register(PartnerModel)
class PartnerAdmin(ModelAdmin):
    inlines = (PartnerImageInline,)
    list_display = (
        "id",
        "title",
        "date_create",
    )

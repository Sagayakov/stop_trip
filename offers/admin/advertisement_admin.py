from django.contrib.admin import register, ModelAdmin, StackedInline

from ..models import Advertisement, AdvertisementImage


class AdvertisementImageInline(StackedInline):
    model = AdvertisementImage
    extra = 0


@register(Advertisement)
class AdvertisementAdmin(ModelAdmin):
    # todo дописать через fieldsets
    inlines = (AdvertisementImageInline,)
    prepopulated_fields = {"slug": ("title",)}

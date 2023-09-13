from django.contrib import admin
from django.contrib.admin import register, ModelAdmin

from offers.models.advertisement import Advertisement
from offers.models.attribute import Attribute
from offers.models.category import Category
from offers.models.image import Image
from offers.models.subcategory import SubCategory

# todo переписать через классы
admin.site.register(Advertisement)
admin.site.register(Category)
admin.site.register(SubCategory)
admin.site.register(Attribute)
admin.site.register(Image)


# @register(Advertisement)
# class AdvertisementAdmin(ModelAdmin):
#     pass

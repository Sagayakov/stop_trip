from django.contrib import admin
from django.contrib.admin import register, ModelAdmin

from .models import Advertisement, Category, SubCategory, Image, Attribute


# todo переписать через классы
admin.site.register(Advertisement)
admin.site.register(Category)
admin.site.register(SubCategory)
admin.site.register(Attribute)
admin.site.register(Image)


# @register(Advertisement)
# class AdvertisementAdmin(ModelAdmin):
#     pass

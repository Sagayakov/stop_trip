from django.contrib import admin

from .models import Advertisement, Category, SubCategory, Image, Attributes, Product

admin.site.register(Advertisement)
admin.site.register(Category)
admin.site.register(SubCategory)
admin.site.register(Attributes)
admin.site.register(Image)
admin.site.register(Product)
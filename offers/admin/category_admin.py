from django.contrib.admin import register, ModelAdmin, StackedInline

from ..models import Category, SubCategory


class SubCategoryInline(StackedInline):
    model = SubCategory
    extra = 0


@register(Category)
class CategoryAdmin(ModelAdmin):
    inlines = (SubCategoryInline,)

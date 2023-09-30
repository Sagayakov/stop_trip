from django.contrib.admin import register, ModelAdmin, StackedInline

from ..models import Category


# class SubCategoryInline(StackedInline):
#     model = SubCategory
#     extra = 0


@register(Category)
class CategoryAdmin(ModelAdmin):
    list_display = ["title",
                    "date_create",
                    "date_update"]

from django.contrib.admin import register, ModelAdmin
from .models import ReportModel


@register(ReportModel)
class ReportAdmin(ModelAdmin):
    list_display = (
        "reason",
        "from_user",
        "advertisement",
        "date_create",
    )
    readonly_fields = (
        "reason",
        "advertisement",
        "from_user",
        "description",
        "date_create",
    )
    search_fields = ("from_user__email", "advertisement__owner__email")
    list_filter = ("advertisement__owner__email",)
    show_change_link = True

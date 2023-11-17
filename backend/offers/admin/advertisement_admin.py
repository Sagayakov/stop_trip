from django.contrib.admin import register, ModelAdmin, StackedInline
from django.utils.translation import gettext_lazy as _

from ..models import Advertisement, AdvertisementImage


class AdvertisementImageInline(StackedInline):
    model = AdvertisementImage
    extra = 0


@register(Advertisement)
class AdvertisementAdmin(ModelAdmin):
    inlines = (AdvertisementImageInline,)
    prepopulated_fields = {
        "slug": ("title", "price", "owner"),
    }
    fieldsets = (
        (
            None,
            {
                "fields": (
                    "owner",
                    "category",
                    "title",
                    "slug",
                    "price",
                    "description",
                    "is_published",
                )
            },
        ),
        (
            _("Транспорт"),
            {
                "classes": ("collapse",),
                "fields": (
                    "transport_type_of_service",
                    "transport_type",
                    "transport_category",
                    "transport_brand",
                    "transport_model",
                    "transport_engine_type",
                    "transport_drive_type",
                    "transport_engine_volume",
                    "transport_year_of_production",
                    "transport_transmission_type",
                    "transport_body_type",
                    "transport_condition",
                    "transport_passengers_quality",
                ),
            },
        ),
        (
            _("Недвижимость"),
            {
                "classes": ("collapse",),
                "fields": (
                    "property_type_of_service",
                    "property_city",
                    "property_district",
                    "property_building_max_floor",
                    "property_floor",
                    "property_bathroom_count",
                    "property_bathroom_type",
                    "property_area",
                    "property_living_area",
                    "property_balcony",
                    "property_has_furniture",
                    "property_amenities",
                    "property_house_type",
                    "property_has_parking",
                    "property_rental_condition",
                    "property_prepayment",
                    "property_sleeping_places",
                    "property_rooms_count",
                ),
            },
        ),
        (
            _("Такси"),
            {
                "classes": ("collapse",),
                "fields": (
                    "taxi_unit",
                    "taxi_type",
                ),
            },
        ),
        (
            _("Работа"),
            {
                "classes": ("collapse",),
                "fields": (
                    "job_type",
                    "job_duration",
                    "job_payment_type",
                    "job_experience",
                ),
            },
        ),
        (
            _("Мероприятия"),
            {
                "classes": ("collapse",),
                "fields": (
                    "start_date",
                    "end_date",
                    "is_online",
                ),
            },
        ),
        (
            _("Услуги"),
            {"classes": ("collapse",), "fields": ("home_visit",)},
        ),
        (
            _("Валютные пары"),
            {
                "classes": ("collapse",),
                "fields": (
                    "proposed_currency",
                    "exchange_for",
                    "exchange_rate",
                ),
            },
        ),
    )

    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "category",
                    "title",
                    "price",
                    "description",
                    "is_published",
                    "transport_type_of_service",
                    "transport_type",
                    "transport_category",
                    "transport_brand",
                    "transport_model",
                    "transport_engine_type",
                    "transport_drive_type",
                    "transport_engine_volume",
                    "transport_year_of_production",
                    "transport_transmission_type",
                    "transport_body_type",
                    "transport_condition",
                    "transport_passengers_quality",
                    "property_type_of_service",
                    "property_city",
                    "property_district",
                    "property_building_max_floor",
                    "property_floor",
                    "property_bathroom_count",
                    "property_bathroom_type",
                    "property_area",
                    "property_living_area",
                    "property_balcony",
                    "property_has_furniture",
                    "property_amenities",
                    "property_house_type",
                    "property_has_parking",
                    "property_rental_condition",
                    "property_prepayment",
                    "property_sleeping_places",
                    "property_rooms_count",
                    "taxi_unit",
                    "taxi_type",
                    "trip_unit",
                    "job_type",
                    "job_duration",
                    "job_payment_type",
                    "job_experience",
                    "start_date",
                    "end_date",
                    "is_online",
                    "home_visit",
                    "proposed_currency",
                    "exchange_for",
                    "exchange_rate",
                ),
            },
        ),
    )

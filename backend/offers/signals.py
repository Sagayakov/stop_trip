"""Сброс кэша ответов API при любом изменении данных, которые видны в объявлениях."""

from django.db.models.signals import m2m_changed, post_delete, post_save

from common.cache import bump_data_version

# Модели, изменение которых меняет то, что видят посетители в ленте и карточках.
WATCHED_MODELS = (
    ("offers", "Advertisement"),
    ("offers", "AdvertisementImage"),
    ("offers", "PropertyAmenity"),
    ("offers", "Currency"),
    ("offers", "RubExchangeRate"),
    ("offers", "TransportBrand"),
    ("offers", "TransportModel"),
    ("users", "User"),
    ("users", "Rate"),
    ("users", "UserMessenger"),
    ("countries", "Country"),
    ("countries", "Region"),
    ("countries", "City"),
)


def connect_cache_invalidation(apps) -> None:
    for app_label, model_name in WATCHED_MODELS:
        model = apps.get_model(app_label, model_name)
        uid = f"bump_cache_{app_label}_{model_name}"
        post_save.connect(bump_data_version, sender=model, dispatch_uid=f"{uid}_save")
        post_delete.connect(bump_data_version, sender=model, dispatch_uid=f"{uid}_delete")

    advertisement = apps.get_model("offers", "Advertisement")
    m2m_changed.connect(
        bump_data_version,
        sender=advertisement.property_amenities.through,
        dispatch_uid="bump_cache_amenities_m2m",
    )

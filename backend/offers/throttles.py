from rest_framework.throttling import AnonRateThrottle, UserRateThrottle


class ContactsAnonThrottle(AnonRateThrottle):
    """Ограничение показа телефонов для гостей (по IP) — защита от массового сбора номеров."""

    scope = "contacts_anon"


class ContactsUserThrottle(UserRateThrottle):
    """Ограничение показа телефонов для вошедших пользователей."""

    scope = "contacts_user"

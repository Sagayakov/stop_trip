from django.db.models import TextChoices


class ReasonForReport(TextChoices):
    OFFER_NOT_CURRENT_REASON = "offer_not_current", "Товар продан"
    NOT_CENSORED_REASON = "not_censored", "Не цензурные выражения"
    PROHIBITED_SUBSTANCES_REASON = "prohibited_substances", "Запрещенные вещества"
    SCAMMER_REASON = "scammer", "Мошенник"
    WRONG_DESCRIPTION_REASON = "wrong_description", "Неверное описание/фото"
    WRONG_LOCATION_REASON = "wrong_location", "Неверная локация"
    WRONG_PRICE_REASON = "wrong_price", "Неверная цена"
    OTHER_REASON = "other", "Другое"

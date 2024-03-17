from django.db.models import TextChoices


class DocumentType(TextChoices):
    TOURIST_VISA = "tourist-visa", "Туристическая виза"
    BUSINESS_VISA = "business-visa", "Бизнес-виза"
    C_FORM = "c-form", "C-форма"
    EXIT_PERMIT = "exit-permit", "Продление выезда"
    OTHER_DOCUMENT = "other", "Другое"


class DocumentDuration(TextChoices):
    MONTH = "month", "Месяц"
    QUARTER = "quarter", "Квартал"
    YEAR = "year", "Год"
    YEARS_5 = "years_5", "5 лет"
    OTHER = "other", "Другое"

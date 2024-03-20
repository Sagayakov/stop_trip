from django.db.models import TextChoices


class PropertyTypeOfService(TextChoices):
    SALE = "sale", "Продажа"
    RENT = "rent", "Аренда"


class PropertyType(TextChoices):
    FLAT = "flat", "Квартира"
    HOUSE = "house", "Дом"
    ROOM = "room", "Комната"
    BED_PLACE = "bed_place", "Спальное место"
    PARKING = "parking", "Парковочное место"
    COMMERCIAL = "commercial", "Коммерческое помещение"


class PropertyBathroomType(TextChoices):
    COMBINED = "combined", "Совмещённый"
    SEPARATE = "separate", "Раздельный"


class PropertyBalcony(TextChoices):
    YES = "yes", "Есть"
    NO = "no", "Нет"
    LOGGIA = "loggia", "Лоджия"


class PropertyHouseType(TextChoices):
    PANEL = "panel", "Панельный"
    BRICK = "brick", "Кирпичный"
    WOODEN = "wooden", "Деревянный"
    BLOCK = "block", "Блочный"


class PropertyRentalCondition(TextChoices):
    FAMILY = "family", "Семье"
    ALONE = "alone", "Для одного"
    GIRLS = "girls", "Девушке"
    OFFICE = "office", "Под офис"
    STUDENTS = "students", "Студентам"
    NOT_COMPANIES = "not_companies", "Не компаниям"


class PropertyPrepayment(TextChoices):
    WITHOUT = "without", "Без предоплаты"
    MONTH = "month", "Месяц"
    TWO_MONTHS = "two_months", "Два месяца"
    THREE_MONTHS = "three_months", "Три месяца"
    HALF_A_YEAR = "half_a_year", "Пол года"


class PropertyRentDuration(TextChoices):
    DAILY = "daily", "Посуточно"
    PER_MONTHS = "per_months", "Помесячно"

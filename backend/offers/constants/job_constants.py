from django.db.models import TextChoices


class JobDurationType(TextChoices):
    ONE_TIME_TASK = "one_time_task", "Разовое задание"
    TEMPORARY = "temporary", "Временная работа"
    PERMANENT = "permanent", "Постоянная работа"
    OTHER = "other", "Другое"


class JobType(TextChoices):
    FULL_TIME = "full_time", "Полный день"
    PART_TIME = "part_time", "Неполный день"


class JobPaymentType(TextChoices):
    HOURLY_PAYMENT = "hourly_payment", "почасовая оплата"
    DAILY_PAYMENT = "daily_payment", "ежедневная оплата"
    WEEKLY_PAYMENT = "weekly_payment", "еженедельная оплата"
    MONTHLY_PAYMENT = "monthly_payment", "ежемесячная оплата"
    OTHER = "other", "другое"

from django.db import models

from ..constants import JobDurationType, JobPaymentType, JobType


class AbsJob(models.Model):
    """Абстрактная модель работы."""

    job_type = models.CharField(
        "Тип работы", max_length=25, choices=JobType.choices, blank=True, null=True
    )
    job_duration = models.CharField(
        "Продолжительность работы",
        max_length=25,
        choices=JobDurationType.choices,
        blank=True,
        null=True,
    )
    job_payment_type = models.CharField(
        "Тип оплаты", max_length=25, choices=JobPaymentType.choices, blank=True, null=True
    )
    job_experience = models.BooleanField("С опытом", default=False)

    class Meta:
        abstract = True

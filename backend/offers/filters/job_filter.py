from django_filters.rest_framework import filters, FilterSet

from offers.constants import JobType, JobDurationType, JobPaymentType


class JobFilter(FilterSet):
    job_type = filters.ChoiceFilter(
        label="Тип работы", choices=JobType.choices
    )
    job_duration = filters.ChoiceFilter(
        label="Продолжительность работы", choices=JobDurationType.choices
    )
    job_payment_type = filters.ChoiceFilter(
        label="Тип оплаты", choices=JobPaymentType.choices
    )
    job_experience = filters.BooleanFilter(
        label="С опытом"
    )
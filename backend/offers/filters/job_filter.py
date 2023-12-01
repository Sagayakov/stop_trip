from django_filters.rest_framework import filters, FilterSet

from ..constants import JobType, JobDurationType, JobPaymentType


class JobFilter(FilterSet):
    """Фильтры работы."""

    job_type = filters.ChoiceFilter(label="Тип работы", choices=JobType.choices)
    job_duration = filters.ChoiceFilter(
        label="Продолжительность работы", choices=JobDurationType.choices
    )
    job_payment_type = filters.ChoiceFilter(label="Тип оплаты", choices=JobPaymentType.choices)
    job_experience = filters.BooleanFilter(label="С опытом")

    @classmethod
    def _job_filter_specs(cls, queryset) -> list[dict]:
        specs: list[dict] = []

        # Тип работы
        job_type_specs = {
            "name": "job_type",
            "choices": [{"value": value, "label": label} for value, label in JobType.choices],
        }
        specs.append(job_type_specs)

        # Продолжительность работы
        job_duration_specs = {
            "name": "job_duration",
            "choices": [
                {"value": value, "label": label} for value, label in JobDurationType.choices
            ],
        }
        specs.append(job_duration_specs)

        # Тип оплаты
        job_payment_type_specs = {
            "name": "job_payment_type",
            "choices": [
                {"value": value, "label": label} for value, label in JobPaymentType.choices
            ],
        }
        specs.append(job_payment_type_specs)

        # С опытом
        job_experience_specs = {
            "name": "job_experience",
            "choices": [True, False],
        }
        specs.append(job_experience_specs)

        return specs

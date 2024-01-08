from typing import Union

from django_filters.rest_framework import filters, FilterSet

from common.filters import ChoiceInFilter
from ..constants import JobType, JobDurationType, JobPaymentType


class JobFilter(FilterSet):
    """Фильтры работы."""

    job_type = ChoiceInFilter(label="Тип работы", choices=JobType.choices)
    job_duration = ChoiceInFilter(label="Продолжительность работы", choices=JobDurationType.choices)
    job_payment_type = ChoiceInFilter(label="Тип оплаты", choices=JobPaymentType.choices)
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

    @classmethod
    def _job_filtered_facets(cls, queryset) -> dict[str, list]:
        facets: dict[str, Union[list, dict]] = {}

        # Тип работы
        facets["job_type"] = (
            queryset.exclude(job_type__isnull=True).values_list("job_type", flat=True).distinct()
        )

        # Продолжительность работы
        facets["job_duration"] = (
            queryset.exclude(job_duration__isnull=True)
            .values_list("job_duration", flat=True)
            .distinct()
        )

        # Тип оплаты
        facets["job_payment_type"] = (
            queryset.exclude(job_payment_type__isnull=True)
            .values_list("job_payment_type", flat=True)
            .distinct()
        )

        # С опытом
        facets["job_experience"] = (
            queryset.exclude(job_experience__isnull=True)
            .values_list("job_experience", flat=True)
            .distinct()
        )

        return facets

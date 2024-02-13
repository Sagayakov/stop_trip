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
    def _job_filter_specs(cls, queryset) -> dict[str, list[dict]]:
        specs: dict[str, Union[list, dict]] = {}

        # Тип работы
        job_type_specs = {
            "job_type": [{"value": value, "label": label} for value, label in JobType.choices],
        }
        specs |= job_type_specs

        # Продолжительность работы
        job_duration_specs = {
            "job_duration": [
                {"value": value, "label": label} for value, label in JobDurationType.choices
            ],
        }
        specs |= job_duration_specs

        # Тип оплаты
        job_payment_type_specs = {
            "job_payment_type": [
                {"value": value, "label": label} for value, label in JobPaymentType.choices
            ],
        }
        specs |= job_payment_type_specs

        # С опытом
        job_experience_specs = {
            "job_experience": [{"value": True, "label": "Да"}, {"value": False, "label": "Нет"}],
        }
        specs |= job_experience_specs

        return specs

    @classmethod
    def _job_filtered_facets(cls, queryset) -> dict[str, list]:
        facets: dict[str, Union[list, dict]] = {}

        # Тип работы
        facets["job_type"] = (
            queryset.exclude(job_type__isnull=True)
            .values_list("job_type", flat=True)
            .order_by("job_type")
            .distinct("job_type")
        )

        # Продолжительность работы
        facets["job_duration"] = (
            queryset.exclude(job_duration__isnull=True)
            .values_list("job_duration", flat=True)
            .order_by("job_duration")
            .distinct("job_duration")
        )

        # Тип оплаты
        facets["job_payment_type"] = (
            queryset.exclude(job_payment_type__isnull=True)
            .values_list("job_payment_type", flat=True)
            .order_by("job_payment_type")
            .distinct("job_payment_type")
        )

        # С опытом
        facets["job_experience"] = (
            queryset.exclude(job_experience__isnull=True)
            .values_list("job_experience", flat=True)
            .order_by("job_experience")
            .distinct("job_experience")
        )

        return facets

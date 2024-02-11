from typing import Union

from django_filters.rest_framework import filters, FilterSet

from common.filters import ChoiceInFilter
from offers.constants import DocumentType, DocumentDuration


class DocumentFilter(FilterSet):
    """Фильтр документов"""

    document_type = ChoiceInFilter(label="Тип документа", choices=DocumentType.choices)
    document_duration = ChoiceInFilter(label="Срок действия", choices=DocumentDuration.choices)

    @classmethod
    def _document_filter_specs(cls, queryset) -> dict[str, list[dict]]:
        specs: dict[str, Union[list, dict]] = {}

        # Тип документа
        document_type_specs = {
            "document_type": [
                {"value": value, "label": label} for value, label in DocumentType.choices
            ],
        }
        specs |= document_type_specs

        # Срок действия
        document_duration_specs = {
            "document_duration": [
                {"value": value, "label": label} for value, label in DocumentDuration.choices
            ],
        }
        specs |= document_duration_specs

        return specs

    @classmethod
    def _document_filtered_facets(cls, queryset) -> dict[str, list]:
        facets: dict[str, Union[list, dict]] = {}

        # Тип документа
        facets["document_type"] = (
            queryset.exclude(document_type__isnull=True)
            .values_list("document_type", flat=True)
            .order_by("document_type")
            .distinct("document_type")
        )

        # Срок действия
        facets["document_duration"] = (
            queryset.exclude(document_duration__isnull=True)
            .values_list("document_duration", flat=True)
            .order_by("document_duration")
            .distinct("document_duration")
        )

        return facets

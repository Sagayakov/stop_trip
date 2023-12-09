from django_filters.rest_framework import filters, FilterSet

from offers.constants import DocumentType, DocumentDuration


class DocumentFilter(FilterSet):
    """Фильтр документов"""

    document_type = filters.ChoiceFilter(label="Тип документа", choices=DocumentType.choices)
    document_duration = filters.ChoiceFilter(
        label="Срок действия", choices=DocumentDuration.choices
    )

    @classmethod
    def _document_filter_specs(cls, queryset) -> list[dict]:
        specs: list[dict] = []

        # Тип документа
        document_type_specs = {
            "name": "document_type",
            "choices": [{"value": value, "label": label} for value, label in DocumentType.choices],
        }
        specs.append(document_type_specs)

        # Срок действия
        document_duration_specs = {
            "name": "document_duration",
            "choices": [
                {"value": value, "label": label} for value, label in DocumentDuration.choices
            ],
        }
        specs.append(document_duration_specs)
        return specs

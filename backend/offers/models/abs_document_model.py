from django.db import models

from ..constants import DocumentType, DocumentDuration


class AbsDocument(models.Model):
    """Абстрактная модель документов."""

    document_type = models.CharField(
        "Тип документа", max_length=50, choices=DocumentType.choices, blank=True
    )
    document_duration = models.CharField(
        "Срок действия", max_length=50, choices=DocumentDuration.choices, blank=True
    )

    class Meta:
        abstract = True

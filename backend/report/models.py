from django.db import models
from .constants import ReasonForReport


class ReportModel(models.Model):
    """Жалоба на объявление"""

    from_user = models.ForeignKey(
        "users.User",
        on_delete=models.CASCADE,
        verbose_name="От пользователя",
        related_name="reports_to_advertisements",
    )
    advertisement = models.ForeignKey(
        "offers.Advertisement",
        on_delete=models.CASCADE,
        verbose_name="Объявление",
        related_name="reports_to_advertisements",
    )
    reason = models.CharField("Причина жалобы", max_length=50, choices=ReasonForReport.choices)
    description = models.TextField(
        "Описание",
        max_length=500,
        blank=True,
        null=True,
    )
    date_create = models.DateTimeField("Дата создания", auto_now_add=True)

    class Meta:
        verbose_name = "Жалоба"
        verbose_name_plural = "Жалобы"
        constraints = [
            models.UniqueConstraint(
                fields=["from_user", "advertisement"], name="unique_user_report"
            )
        ]

    def __str__(self):
        return f"{self.advertisement} stoptrip.com/{self.advertisement.slug}"

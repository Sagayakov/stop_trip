from django.db import models


class AbsEvent(models.Model):
    """Абстрактная модель событий."""

    start_date = models.DateTimeField(verbose_name="Дата начала", blank=True, null=True)
    end_date = models.DateTimeField(verbose_name="Дата окончания", blank=True, null=True)
    is_online = models.BooleanField(default=False, verbose_name="Онлайн")

    class Meta:
        abstract = True

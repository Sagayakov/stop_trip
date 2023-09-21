from django.db import models


class AbsEvent(models.Model):
    start_date = models.DateTimeField(verbose_name="Дата начала")
    end_date = models.DateTimeField(verbose_name="Дата окончания", blank=True, null=True)
    is_online = models.BooleanField(default=False, verbose_name="Онлайн")
    event_name = models.ManyToManyField("offers.EventTheme")

    class Meta:
        abstract = True


class EventTheme(models.Model):
    name = models.CharField(max_length=255, verbose_name="Тематика мероприятия")

    class Meta:
        verbose_name = "Тематика мероприятия"
        verbose_name_plural = "Тематика мероприятия"

    def __str__(self):
        return self.name

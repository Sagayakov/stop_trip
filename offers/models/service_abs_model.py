from django.db import models
from offers.constants.service_constants import ServiceUnit


class AbsService(models.Model):
    """"Абстрактная модель услуги"""

    service_unit = models.CharField("Единица измерения",
                                    choices=ServiceUnit.choices, null=True, blank=True)
    home_visit = models.BooleanField(verbose_name="Выезд на дом", default=False)
    service_name = models.ForeignKey(
        "offers.Service", on_delete=models.CASCADE, related_name="services", null=True, blank=True
    )

    class Meta:
        abstract = True


class Service(models.Model):
    name = models.CharField(max_length=255, verbose_name="Наименование услуги")

    class Meta:
        verbose_name = "Услуга"
        verbose_name_plural = "Услуги"

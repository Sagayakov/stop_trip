from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models

from ..constants import (
    TransportTypeOfService,
    TransportCategory,
    TransportEngineType,
    TransportDriveType,
    TransportTransmissionType,
    TransportBodyType,
    TransportCondition,
    TransportType,
)


class TransportBrand(models.Model):
    """Бренды."""

    name = models.CharField("Название", db_index=True)
    slug = models.SlugField("Слаг", unique=True, db_index=True)

    class Meta:
        verbose_name = "Бренд"
        verbose_name_plural = "Транспорт - Бренд"
        ordering = ("name",)

    def __str__(self):
        return self.name


class TransportModel(models.Model):
    """Модели."""

    brand = models.ForeignKey(
        "offers.TransportBrand",
        on_delete=models.CASCADE,
        verbose_name="Бренд",
        related_name="brand_models",
    )

    name = models.CharField("Название", db_index=True)
    slug = models.SlugField("Слаг", unique=True, db_index=True)

    class Meta:
        verbose_name = "Модель"
        verbose_name_plural = "Транспорт - Модели"
        ordering = ("name",)

    def __str__(self):
        return self.name


class AbsTransport(models.Model):
    """Абстрактная модель транспорта."""

    transport_type_of_service = models.CharField(
        "Тип услуги", max_length=25, choices=TransportTypeOfService.choices, null=True, blank=True
    )
    transport_type = models.CharField(
        "Тип транспорта", max_length=50, choices=TransportType.choices, null=True, blank=True
    )
    transport_category = models.CharField(
        "Категория транспорта",
        max_length=50,
        choices=TransportCategory.choices,
        null=True,
        blank=True,
    )

    transport_brand = models.ForeignKey(
        "offers.TransportBrand",
        on_delete=models.CASCADE,
        verbose_name="Марка",
        related_name="advertisements",
        null=True,
        blank=True,
    )
    transport_model = models.ForeignKey(
        "offers.TransportModel",
        on_delete=models.CASCADE,
        verbose_name="Модель",
        related_name="advertisements",
        null=True,
        blank=True,
    )

    transport_engine_type = models.CharField(
        "Тип двигателя", max_length=100, choices=TransportEngineType.choices, null=True, blank=True
    )
    transport_drive_type = models.CharField(
        "Привод", max_length=50, choices=TransportDriveType.choices, null=True, blank=True
    )
    transport_engine_volume = models.FloatField(
        "Объём",
        choices=list([(float(i / 10), float(i / 10)) for i in range(10, 100)]),
        null=True,
        blank=True,
    )
    transport_year_of_production = models.PositiveSmallIntegerField(
        "Год производства",
        validators=[MinValueValidator(1900), MaxValueValidator(2100)],
        null=True,
        blank=True,
    )
    transport_transmission_type = models.CharField(
        "Тип коробки передач",
        max_length=50,
        choices=TransportTransmissionType.choices,
        null=True,
        blank=True,
    )
    transport_body_type = models.CharField(
        "Тип кузова", max_length=50, choices=TransportBodyType.choices, null=True, blank=True
    )
    transport_condition = models.CharField(
        "Состояние", max_length=100, choices=TransportCondition.choices, null=True, blank=True
    )
    transport_passengers_quality = models.PositiveSmallIntegerField(
        "Кол-во пассажиров", null=True, blank=True
    )
    transport_vin = models.CharField(
        "VIN-номер", max_length=17, null=True, blank=True
    )
    transport_commission = models.PositiveSmallIntegerField(
        "Комиссия", null=True, blank=True
    )

    class Meta:
        abstract = True

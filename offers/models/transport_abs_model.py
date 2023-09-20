from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models

from ..constants import (
    TransportTypeOfService,
    TransportCategory,
    TransportBrand,
    TransportModel,
    TransportEngineType,
    TransportDriveType,
    TransportTransmissionType,
    TransportBodyType,
    TransportCondition,
    TransportType,
)


class AbsTransport(models.Model):
    """Абстрактная модель транспорта."""

    transport_type_of_service = models.CharField(
        "Тип услуги", max_length=25, choices=TransportTypeOfService.choices, blank=True
    )
    transport_type = models.CharField(
        "Тип транспорта", max_length=50, choices=TransportType.choices, blank=True
    )
    transport_category = models.CharField(
        "Категория транспорта", max_length=50, choices=TransportCategory.choices, blank=True
    )
    transport_brand = models.CharField(
        "Марка", max_length=100, choices=TransportBrand.choices, blank=True
    )
    transport_model = models.CharField(
        "Модель", max_length=100, choices=TransportModel.choices, blank=True
    )
    transport_engine_type = models.CharField(
        "Тип двигателя", max_length=100, choices=TransportEngineType.choices, blank=True
    )
    transport_drive_type = models.CharField(
        "Привод", max_length=50, choices=TransportDriveType.choices, blank=True
    )
    transport_engine_volume = models.FloatField(
        "Объём",
        choices=list([(float(i / 10), float(i / 10)) for i in range(10, 100)]),
        null=True,
        blank=True,  # todo переписать через choices
    )
    transport_year_of_production = models.PositiveSmallIntegerField(
        "Год производства",
        validators=[MinValueValidator(1900), MaxValueValidator(2100)],
        null=True,
        blank=True,
    )
    transport_transmission_type = models.CharField(
        "Тип коробки передач", max_length=50, choices=TransportTransmissionType.choices, blank=True
    )
    transport_body_type = models.CharField(
        "Тип кузова", max_length=50, choices=TransportBodyType.choices, blank=True
    )
    transport_condition = models.CharField(
        "Состояние", max_length=100, choices=TransportCondition.choices, blank=True
    )
    transport_passengers_quality = models.PositiveSmallIntegerField(
        "Кол-во пассажиров", null=True, blank=True
    )

    class Meta:
        abstract = True

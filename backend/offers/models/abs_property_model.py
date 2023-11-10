from django.db import models


from ..constants import (
    PropertyTypeOfService,
    PropertyBathroomType,
    PropertyBalcony,
    PropertyHouseType,
    PropertyRentalCondition,
    PropertyPrepayment,
)


class PropertyCity(models.Model):
    """Город для недвижимости"""

    name = models.CharField("Название", db_index=True)
    slug = models.SlugField("Слаг", unique=True, db_index=True)

    class Meta:
        verbose_name = "Город"
        verbose_name_plural = "Недвижимость - Города"
        ordering = ("name",)

    def __str__(self):
        return self.name


class PropertyDistrict(models.Model):
    """Районы"""

    city = models.ForeignKey(
        "offers.PropertyCity",
        on_delete=models.CASCADE,
        verbose_name="Город",
        related_name="property_districts",
    )

    name = models.CharField("Название", db_index=True)
    slug = models.SlugField("Слаг", unique=True, db_index=True)

    class Meta:
        verbose_name = "Район"
        verbose_name_plural = "Недвижимость - Районы"
        ordering = ("name",)

    def __str__(self):
        return self.name


class AbsProperty(models.Model):
    """Абстрактная модель недвижимости."""

    property_type_of_service = models.CharField(
        "Тип услуги", max_length=25, choices=PropertyTypeOfService.choices, blank=True
    )
    property_city = models.ForeignKey(
        "offers.PropertyCity",
        on_delete=models.CASCADE,
        verbose_name="Город",
        related_name="advertisements",
        null=True,
        blank=True,
    )

    property_district = models.ForeignKey(
        "offers.PropertyDistrict",
        on_delete=models.CASCADE,
        verbose_name="Район",
        related_name="advertisements",
        null=True,
        blank=True,
    )

    property_building_max_floor = models.PositiveSmallIntegerField(
        verbose_name="Количество этажей в доме", null=True, blank=True
    )
    property_floor = models.PositiveSmallIntegerField(verbose_name="Номер этажа", null=True, blank=True)
    property_bathroom_count = models.PositiveSmallIntegerField(
        verbose_name="Количество санузлов", null=True, blank=True
    )
    property_bathroom_type = models.CharField(
        "Тип санузла", max_length=100, choices=PropertyBathroomType.choices, blank=True
    )
    property_area = models.PositiveSmallIntegerField(verbose_name="Общая площадь", null=True, blank=True)
    property_living_area = models.PositiveSmallIntegerField(verbose_name="Жилая площадь", null=True, blank=True)
    property_balcony = models.CharField(
        "Балкон", max_length=50, choices=PropertyBalcony.choices, blank=True
    )
    property_has_furniture = models.BooleanField(verbose_name="Мебель", default=False)
    property_amenities = models.ManyToManyField(
        "offers.PropertyAmenity", verbose_name="Удобства", related_name="advertisements", blank=True
    )
    property_house_type = models.CharField(
        "Тип дома", max_length=100, choices=PropertyHouseType.choices, blank=True
    )
    property_has_parking = models.BooleanField(verbose_name="Есть парковка", default=False)
    property_rental_condition = models.CharField(
        "Условия аренды", max_length=100, choices=PropertyRentalCondition.choices, blank=True
    )
    property_prepayment = models.CharField(
        "Предоплата", max_length=50, choices=PropertyPrepayment.choices, blank=True
    )
    property_sleeping_places = models.PositiveSmallIntegerField(
        verbose_name="Количество спальных мест", null=True, blank=True
    )
    property_rooms_count = models.PositiveSmallIntegerField(
        verbose_name="Количество комнат", null=True, blank=True
    )

    class Meta:
        abstract = True


class PropertyAmenity(models.Model):
    """Удобства недвижимости."""

    name = models.CharField("Название", max_length=50)

    class Meta:
        verbose_name = "Удобство"
        verbose_name_plural = "Удобства"

    def __str__(self):
        return self.name

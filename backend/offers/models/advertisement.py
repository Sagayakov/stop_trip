from django.db import models
from location_field.models.plain import PlainLocationField
from .abs_event_model import AbsEvent
from .abs_exchange_rate_model import AbsExchangeRate
from .abs_job_model import AbsJob
from .abs_property_model import AbsProperty
from .abs_service_model import AbsService
from .abs_taxi_model import AbsTaxi
from .abs_transport_model import AbsTransport
from .abs_document_model import AbsDocument
from .abs_market_model import AbsMarket
from .abs_excursion_model import AbsExcursion
from .abs_food_model import AbsFood
from ..constants import CategoryChoices


class Country(models.Model):
    """Страна"""

    name = models.CharField("Название", db_index=True)
    slug = models.SlugField("Слаг", unique=True, db_index=True)

    class Meta:
        verbose_name = "Страна"
        verbose_name_plural = "Страны"
        ordering = ("name",)

    def __str__(self):
        return self.name


class Region(models.Model):
    """Регион"""

    country = models.ForeignKey(
        "offers.Country",
        on_delete=models.CASCADE,
        verbose_name="Страна",
        related_name="regions",
    )

    name = models.CharField("Название", db_index=True)
    slug = models.SlugField("Слаг", unique=True, db_index=True)

    class Meta:
        verbose_name = "Регион"
        verbose_name_plural = "Регионы"
        ordering = ("name",)

    def __str__(self):
        return self.name


class City(models.Model):
    """Город"""

    region = models.ForeignKey(
        "offers.Region",
        on_delete=models.CASCADE,
        verbose_name="Регион",
        related_name="cities",
    )
    name = models.CharField("Название", db_index=True)
    slug = models.SlugField("Слаг", unique=True, db_index=True)

    class Meta:
        verbose_name = "Город"
        verbose_name_plural = "Города"
        ordering = ("name",)

    def __str__(self):
        return self.name


class Advertisement(
    AbsTransport,
    AbsProperty,
    AbsJob,
    AbsEvent,
    AbsTaxi,
    AbsService,
    AbsExchangeRate,
    AbsDocument,
    AbsMarket,
    AbsExcursion,
    AbsFood,
):
    """Объявления."""

    country = models.ForeignKey(
        "offers.Country",
        on_delete=models.CASCADE,
        verbose_name="Страна",
        related_name="country_advertisements",

    )

    region = models.ForeignKey(
        "offers.Region",
        on_delete=models.CASCADE,
        verbose_name="Район",
        related_name="region_advertisements",
        null=True,
        blank=True,
    )

    city = models.ForeignKey(
        "offers.City",
        on_delete=models.CASCADE,
        verbose_name="Город",
        related_name="city_advertisements",

    )

    owner = models.ForeignKey(
        "users.User",
        on_delete=models.CASCADE,
        related_name="advertisements",
        verbose_name="Создатель",
    )

    category = models.CharField("Категории", max_length=100, choices=CategoryChoices.choices)
    title = models.CharField("Название", max_length=100)
    price = models.DecimalField("Цена", max_digits=6, decimal_places=2,  null=True, blank=True)
    coordinates = PlainLocationField(verbose_name="Координаты", blank=True)
    description = models.TextField("Описание", max_length=1000, null=True, blank=True)
    is_published = models.BooleanField("Опубликованно", default=True)
    date_create = models.DateTimeField("Дата создания", auto_now_add=True)
    date_update = models.DateTimeField("Дата редактирования", auto_now=True)
    # location = models.CharField("Локация", max_length=128, null=True, blank=True)
    slug = models.SlugField("Слаг", blank=True, null=True, db_index=True, unique=True)

    class Meta:
        verbose_name = "Объявление"
        verbose_name_plural = "Объявления"
        ordering = ("-date_create",)
        # constraints = [
        #     # у пользователя не может быть несколько объявлений на одну и ту же валютную пару
        #     models.UniqueConstraint(
        #         fields=["owner", "proposed_currency", "exchange_for"],
        #         name="owner_proposed_currency_exchange_for_unique_together",
        #     )
        # ]

    def __str__(self):
        return f"Объявление: {self.title}. Владелец: {self.owner}"


class AdvertisementImage(models.Model):
    """Фото объявлений."""

    advertisement = models.ForeignKey(
        "offers.Advertisement",
        on_delete=models.CASCADE,
        related_name="images",
        verbose_name="Объявление",
    )

    image = models.ImageField(
        "Фотография",
        upload_to="offers/advertisement_image/image",
        blank=True,
        null=True,
    )

    class Meta:
        verbose_name = "Изображение"
        verbose_name_plural = "Изображения"

    def __str__(self):
        return f"Объявление - {self.advertisement.title}, #{self.pk}"

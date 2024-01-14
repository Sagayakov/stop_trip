from django.core.exceptions import ValidationError
from django.db import models
from autoslug import AutoSlugField
from location_field.models.plain import PlainLocationField

from forbidden_words.models import ForbiddenWords
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

    owner = models.ForeignKey(
        "users.User",
        on_delete=models.CASCADE,
        related_name="advertisements",
        verbose_name="Создатель",
    )
    country = models.ForeignKey(
        "countries.Country",
        on_delete=models.CASCADE,
        related_name="advertisement",
        verbose_name="Страна",
        null=True,
        blank=True,
    )
    region = models.ForeignKey(
        "countries.Region",
        on_delete=models.CASCADE,
        related_name="advertisement",
        verbose_name="Регион",
        null=True,
        blank=True,
    )
    city = models.ForeignKey(
        "countries.City",
        on_delete=models.CASCADE,
        related_name="advertisement",
        verbose_name="Город",
        null=True,
        blank=True,
    )

    category = models.CharField("Категории", max_length=100, choices=CategoryChoices.choices)
    title = models.CharField("Название", max_length=100)
    price = models.DecimalField("Цена", max_digits=10, decimal_places=2, null=True, blank=True)
    coordinates = PlainLocationField(verbose_name="Координаты", blank=True)
    description = models.TextField("Описание", max_length=1000, null=True, blank=True)
    is_published = models.BooleanField("Опубликованно", default=True)
    date_create = models.DateTimeField("Дата создания", auto_now_add=True)
    date_update = models.DateTimeField("Дата редактирования", auto_now=True)
    slug = AutoSlugField(unique=True, db_index=True)

    class Meta:
        verbose_name = "Объявление"
        verbose_name_plural = "Объявления"
        ordering = ("-date_create",)

    def clean(self):
        """Проверяет, содержит ли название объявления запрещенные слова."""
        forbidden_words = ForbiddenWords.objects.first()

        if forbidden_words:
            all_words = forbidden_words.russian_words + forbidden_words.english_words

            for word in all_words:
                if word.lower() in self.title.lower():
                    raise ValidationError("Название объявления содержит запрещенное слово.")

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

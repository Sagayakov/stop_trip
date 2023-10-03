from django.db import models

from .abs_event_model import AbsEvent
from .abs_job_model import AbsJob
from .abs_property_model import AbsProperty
from .abs_service_model import AbsService
from .abs_taxi_model import AbsTaxi
from .abs_transport_model import AbsTransport
from ..constants import CategoryChoices


class Advertisement(AbsTransport, AbsProperty, AbsJob, AbsEvent, AbsTaxi, AbsService):
    """Объявления."""

    owner = models.ForeignKey(
        "users.User",
        on_delete=models.CASCADE,
        null=True,
        related_name="advertisements",
        verbose_name="Создатель",
    )

    category = models.CharField("Категории", choices=CategoryChoices.choices)
    title = models.CharField("Название", max_length=100)
    price = models.PositiveIntegerField(verbose_name="Цена", default=0)
    description = models.TextField("Описание", max_length=1000, null=True, blank=True)
    is_published = models.BooleanField(verbose_name="Опубликованно", default=True)
    date_create = models.DateTimeField(verbose_name="Дата создания", auto_now_add=True)
    date_update = models.DateTimeField(verbose_name="Дата редактирования", auto_now=True)
    # location = models.CharField(max_length=128, verbose_name="Локация", null=True, blank=True)
    slug = models.SlugField("Слаг", blank=True, null=True, db_index=True, unique=True)

    class Meta:
        verbose_name = "Объявление"
        verbose_name_plural = "Объявления"

    def __str__(self):
        return f"Объявление: {self.title}. Владелец: {self.owner}"

    # todo чтобы в методе save проставлялся слаг


class AdvertisementImage(models.Model):
    """Фото объявлений."""

    advertisement = models.ForeignKey(
        "offers.Advertisement",
        on_delete=models.CASCADE,
        related_name="images",
        verbose_name="Объявление",
    )

    image = models.ImageField(
        upload_to="offers/advertisement_image/image",
        blank=True,
        null=True,
        verbose_name="Фотография",
    )

    class Meta:
        verbose_name = "Изображение"
        verbose_name_plural = "Изображения"

    def __str__(self):
        return f"Объявление - {self.advertisement.title}, #{self.pk}"

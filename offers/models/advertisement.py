from django.db import models

from .abs_event_model import AbsEvent
from .abs_exchange_rate_model import AbsExchangeRate
from .abs_job_model import AbsJob
from .abs_property_model import AbsProperty
from .abs_service_model import AbsService
from .abs_taxi_model import AbsTaxi
from .abs_transport_model import AbsTransport
from ..constants import CategoryChoices


class Advertisement(
    AbsTransport, AbsProperty, AbsJob, AbsEvent, AbsTaxi, AbsService, AbsExchangeRate
):
    """Объявления."""

    owner = models.ForeignKey(
        "users.User",
        on_delete=models.CASCADE,
        related_name="advertisements",
        verbose_name="Создатель",
    )

    category = models.CharField("Категории", max_length=100, choices=CategoryChoices.choices)
    title = models.CharField("Название", max_length=100)
    price = models.PositiveIntegerField("Цена", null=True, blank=True)
    description = models.TextField("Описание", max_length=1000, null=True, blank=True)
    is_published = models.BooleanField("Опубликованно", default=True)
    date_create = models.DateTimeField("Дата создания", auto_now_add=True)
    date_update = models.DateTimeField("Дата редактирования", auto_now=True)
    # location = models.CharField("Локация", max_length=128, null=True, blank=True)
    slug = models.SlugField("Слаг", blank=True, null=True, db_index=True, unique=True)

    class Meta:
        verbose_name = "Объявление"
        verbose_name_plural = "Объявления"
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

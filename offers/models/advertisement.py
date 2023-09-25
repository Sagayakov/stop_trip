from django.db import models
from .property_abs_model import AbsProperty
from .transport_abs_model import AbsTransport
from .job_abs_model import AbsJob
from .buy_sell_abs_model import AbsBuySell
from .trip_abs_model import AbsTrip
from .event_abs_model import AbsEvent
from .taxi_abs_model import AbsTaxi
from .service_abs_model import AbsService


class Advertisement(AbsTransport,
                    AbsProperty,
                    AbsJob,
                    AbsBuySell,
                    AbsTrip,
                    AbsEvent,
                    AbsTaxi,
                    AbsService):

    """Объявления."""

    subcategory = models.ForeignKey(
        "offers.SubCategory",
        on_delete=models.CASCADE,
        related_name="advertisements",
        verbose_name="Подкатегория",
    )
    owner = models.ForeignKey(
        "users.User",
        on_delete=models.CASCADE,
        null=True,
        related_name="advertisements",
        verbose_name="Создатель",
    )

    title = models.CharField("Название", max_length=100)
    price = models.PositiveIntegerField("Цена", default=0)
    description = models.TextField("Описание", max_length=1000)
    is_published = models.BooleanField("Опубликованно", default=True)
    date_create = models.DateTimeField("Дата создания", auto_now_add=True)
    date_update = models.DateTimeField("Дата редактирования", auto_now=True)
    # location = models.CharField(max_length=128, verbose_name="Локация", null=True, blank=True)
    slug = models.SlugField("Слаг", blank=True, null=True, db_index=True, unique=True)

    def __str__(self):
        return f"Product: {self.title}. Owner: {self.owner.username}"

    class Meta:
        verbose_name = "Объявление"
        verbose_name_plural = "Объявления"


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

    def __str__(self):
        return f"Объявление - {self.advertisement.title}, #{self.pk}"

    class Meta:
        verbose_name = "Изображение"
        verbose_name_plural = "Изображения"

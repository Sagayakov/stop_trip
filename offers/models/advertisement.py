from django.db import models

from .property_abs_model import AbsProperty
from .transport_abs_model import AbsTransport
from ..constants.subcategory_constants import SubCategoryChoices


class Advertisement(AbsTransport, AbsProperty):
    """Объявления."""

    # subcategory = models.ForeignKey(
    #     "offers.SubCategory",
    #     on_delete=models.CASCADE,
    #     related_name="advertisements",
    #     verbose_name="Подкатегория",
    # )
    subcategory = models.CharField(choices=SubCategoryChoices.choices, verbose_name='Подкатегории')
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
        return f"Объявление: {self.title}. Владелец: {self.owner}"

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

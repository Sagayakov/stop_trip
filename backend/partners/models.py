from django.db import models
from autoslug import AutoSlugField


class PartnerModel(models.Model):
    """Модель размещения партнеров"""

    title = models.CharField("Название", max_length=70)
    description = models.CharField("Описание", max_length=300)
    contact = models.CharField("Контактная информация", max_length=50, null=True, blank=True)
    link = models.URLField("Ссылка на партнера", max_length=150, null=True, blank=True)
    date_create = models.DateTimeField("Дата создания", auto_now_add=True)
    slug = AutoSlugField(unique=True, db_index=True)

    class Meta:
        verbose_name = "Партнер"
        verbose_name_plural = "Партнеры"
        ordering = ("-date_create",)

    def __str__(self):
        return f"Партнер {self.title}"


class PartnerImageModel(models.Model):
    """Фото партнеров"""

    partner = models.ForeignKey(
        "partners.PartnerModel",
        on_delete=models.CASCADE,
        related_name="images",
        verbose_name="Партнеры",
    )
    image = models.ImageField(
        "Фотография",
        upload_to="partners/image",
        blank=True,
        null=True,
    )

    class Meta:
        verbose_name = "Изображение"
        verbose_name_plural = "Изображения"

    def __str__(self):
        return f"Парнтер {self.partner.title}, #{self.pk}"

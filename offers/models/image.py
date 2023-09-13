from django.db import models

from offers.models.advertisement import Advertisement


class Image(models.Model):
    advertisements = models.ForeignKey(
        Advertisement, related_name="images", on_delete=models.CASCADE, verbose_name='Объявление'
    )
    photo = models.ImageField(upload_to="offers/image/photo", blank=True, null=True, verbose_name='Фотография')

    def __str__(self) -> str:
        return f"{self.pk}"

    class Meta:
        verbose_name = "Изображение"
        verbose_name_plural = "Изображения"

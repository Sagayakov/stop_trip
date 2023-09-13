from django.db import models

from offers.models.category import Category


class SubCategory(models.Model):
    title = models.CharField(max_length=50, verbose_name='Название')
    category = models.ForeignKey(
        Category, on_delete=models.CASCADE, verbose_name='Категория', related_name='subcategories'
    )

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Подкатегория"
        verbose_name_plural = "Подкатегории"

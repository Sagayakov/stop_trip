from django.db import models

from offers.models.attribute import Attribute
from offers.models.subcategory import SubCategory
from users.models import User


class Advertisement(models.Model):
    title = models.CharField(max_length=100, verbose_name='Название')
    subcategory = models.ForeignKey(
        SubCategory, on_delete=models.CASCADE, related_name="advertisements", verbose_name='Подкатегория'
    )
    attributes = models.ManyToManyField(Attribute, verbose_name='Аттрибуты', related_name='advertisements')
    price = models.PositiveIntegerField(default=0, verbose_name="Цена")
    owner = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, related_name="advertisements", verbose_name="Создатель"
    )
    description = models.CharField(max_length=2048, verbose_name="Описание")
    is_public = models.BooleanField(default=True, verbose_name="Публикация")
    date_create = models.DateTimeField(auto_now_add=True, verbose_name="Дата создания")
    date_update = models.DateTimeField(auto_now=True, verbose_name="Дата редактирования")
    location = models.CharField(max_length=128, verbose_name="Локация", null=True, blank=True)
    # временное решение
    # проработать нужно добавление карты, отображение города
    slug = models.SlugField(
        blank=True, null=True, db_index=True, unique=True, verbose_name="Слаг"
    )

    def __str__(self):
        return f"ID: {self.pk} | Product: {self.title}. Owner: {self.owner.username}"

    class Meta:
        verbose_name = "Объявление"
        verbose_name_plural = "Объявления"


# todo просмотреть возможность замены CharField на TextField или RichTextField
# todo добавить линтер black
# todo написать тесты и проверить количество запросов

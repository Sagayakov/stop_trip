from datetime import datetime

from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Category(models.Model):
    title = models.CharField(max_length=50)
    date_create = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')
    date_update = models.DateTimeField(auto_now=True, verbose_name='Дата редактирования')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Категория"
        verbose_name_plural = "Категория"


class SubCategory(models.Model):
    title = models.CharField(max_length=50)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Подкатегория"
        verbose_name_plural = "Подкатегории"


class Product(models.Model):
    title = models.CharField(max_length=100)
    subcategory = models.ForeignKey(SubCategory, on_delete=models.CASCADE)
    attributes = models.ManyToManyField("Attributes")

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Товар"
        verbose_name_plural = "Товары"


class Image(models.Model):
    property = models.ForeignKey(
        'Advertisement', related_name='images', on_delete=models.CASCADE)
    photo = models.ImageField(
        upload_to='images/', blank=True, null=True)

    def __str__(self) -> str:
        return f'{self.pk}'

    class Meta:
        verbose_name = "Изображение"
        verbose_name_plural = "Изображения"


class Attributes(models.Model):
    title = models.CharField(max_length=30)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Аттрибут"
        verbose_name_plural = "Аттрибуты"


class Advertisement(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, verbose_name='Товар')
    price = models.PositiveIntegerField(default=0, verbose_name='Цена')
    contact = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, verbose_name='Создатель модели')
    description = models.CharField(max_length=2048, verbose_name='Описание')
    is_public = models.BooleanField(default=True, verbose_name='Публикация')
    date_create = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')
    date_update = models.DateTimeField(auto_now=True, verbose_name='Дата редактирования')
    location = models.CharField(max_length=128, verbose_name='Локация', null=True, blank=True)
    # временное решение
    # проработать нужно добавление карты, отображение города
    slug = models.SlugField(blank=True, null=True, db_index=True, unique=True, verbose_name='Ссылка')

    def __str__(self):
        return self.product

    class Meta:
        verbose_name = "Объявление"
        verbose_name_plural = "Объявления"

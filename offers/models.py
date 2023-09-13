from django.db import models


class Category(models.Model):
    title = models.CharField(max_length=50, verbose_name="Название")
    date_create = models.DateTimeField(auto_now_add=True, verbose_name="Дата создания")
    date_update = models.DateTimeField(auto_now=True, verbose_name="Дата редактирования")

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Категория"
        verbose_name_plural = "Категория"


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


class Image(models.Model):
    advertisements = models.ForeignKey(
        "offers.Advertisement", related_name="images", on_delete=models.CASCADE, verbose_name='Объявление'
    )
    photo = models.ImageField(upload_to="offers/image/photo", blank=True, null=True, verbose_name='Фотография')

    def __str__(self) -> str:
        return f"{self.pk}"

    class Meta:
        verbose_name = "Изображение"
        verbose_name_plural = "Изображения"


class Attribute(models.Model):
    title = models.CharField(max_length=30, verbose_name='Название')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Аттрибут"
        verbose_name_plural = "Аттрибуты"


class Advertisement(models.Model):
    title = models.CharField(max_length=100, verbose_name='Название')
    subcategory = models.ForeignKey(
        "offers.SubCategory", on_delete=models.CASCADE, related_name="advertisements", verbose_name='Подкатегория'
    )
    attributes = models.ManyToManyField("Attribute", verbose_name='Аттрибуты', related_name='advertisements')
    price = models.PositiveIntegerField(default=0, verbose_name="Цена")
    owner = models.ForeignKey(
        "users.User", on_delete=models.SET_NULL, null=True, related_name="advertisements", verbose_name="Создатель"
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


# todo разнести по файлам модели
# todo просмотреть возможность замены CharField на TextField или RichTextField
# todo добавить линтер black
# todo написать тесты и проверить количество запросов

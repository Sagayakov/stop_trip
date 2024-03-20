# Generated by Django 4.2.5 on 2024-03-17 15:52

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("offers", "0018_transportbrand_ref_id_transportmodel_category_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="advertisement",
            name="document_type",
            field=models.CharField(
                blank=True,
                choices=[
                    ("tourist-visa", "Туристическая виза"),
                    ("business-visa", "Бизнес-виза"),
                    ("c-form", "C-форма"),
                    ("exit-permit", "Продление выезда"),
                    ("other", "Другое"),
                ],
                max_length=50,
                verbose_name="Тип документа",
            ),
        ),
        migrations.AlterField(
            model_name="advertisement",
            name="property_type",
            field=models.CharField(
                blank=True,
                choices=[
                    ("flat", "Квартира"),
                    ("house", "Дом"),
                    ("room", "Комната"),
                    ("bed_place", "Спальное место"),
                    ("parking", "Парковочное место"),
                    ("commercial", "Коммерческое помещение"),
                ],
                max_length=50,
                null=True,
                verbose_name="Тип собственности",
            ),
        ),
    ]
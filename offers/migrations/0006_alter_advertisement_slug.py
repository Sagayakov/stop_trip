# Generated by Django 4.2.5 on 2023-09-13 07:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('offers', '0005_rename_attributes_attribute_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='advertisement',
            name='slug',
            field=models.SlugField(blank=True, null=True, unique=True, verbose_name='Слаг'),
        ),
    ]

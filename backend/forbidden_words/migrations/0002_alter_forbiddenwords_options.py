# Generated by Django 4.2.5 on 2024-01-14 15:21

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("forbidden_words", "0001_initial"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="forbiddenwords",
            options={"verbose_name": "Запрещенны слова", "verbose_name_plural": "Запрещенны слова"},
        ),
    ]

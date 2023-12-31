# Generated by Django 4.2.5 on 2023-12-23 13:49

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("feedback", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="feedbackmodel",
            name="text",
            field=models.TextField(
                validators=[
                    django.core.validators.MinLengthValidator(10),
                    django.core.validators.MaxLengthValidator(900),
                ],
                verbose_name="Текст",
            ),
        ),
    ]

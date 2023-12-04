# Generated by Django 4.2.5 on 2023-11-25 19:13

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="FeedBackModel",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True, primary_key=True, serialize=False, verbose_name="ID"
                    ),
                ),
                (
                    "feedback",
                    models.CharField(
                        validators=[
                            django.core.validators.MinLengthValidator(10),
                            django.core.validators.MaxLengthValidator(900),
                        ],
                        verbose_name="Обратная связь",
                    ),
                ),
                ("date_create", models.DateTimeField(auto_now_add=True)),
                (
                    "owner",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="feedback",
                        to=settings.AUTH_USER_MODEL,
                        verbose_name="Создатель",
                    ),
                ),
            ],
            options={
                "verbose_name": "Обратная связь",
                "verbose_name_plural": "Обратная связь",
            },
        ),
    ]

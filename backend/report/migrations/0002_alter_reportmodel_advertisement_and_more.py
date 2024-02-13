# Generated by Django 4.2.5 on 2024-02-09 18:58

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("offers", "0015_alter_advertisement_slug"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("report", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="reportmodel",
            name="advertisement",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="reports_to_advertisements",
                to="offers.advertisement",
                verbose_name="Объявление",
            ),
        ),
        migrations.AlterField(
            model_name="reportmodel",
            name="description",
            field=models.TextField(blank=True, max_length=500, null=True, verbose_name="Описание"),
        ),
        migrations.AlterField(
            model_name="reportmodel",
            name="from_user",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="reports_to_advertisements",
                to=settings.AUTH_USER_MODEL,
                verbose_name="От пользователя",
            ),
        ),
    ]

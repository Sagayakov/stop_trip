# Generated by Django 4.2.5 on 2024-01-23 19:51

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("users", "0004_alter_rate_unique_together"),
    ]

    operations = [
        migrations.AlterField(
            model_name="rate",
            name="from_user",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="rating_from_users",
                to=settings.AUTH_USER_MODEL,
                verbose_name="От пользователя",
            ),
        ),
        migrations.AlterField(
            model_name="rate",
            name="to_user",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="rating_to_users",
                to=settings.AUTH_USER_MODEL,
                verbose_name="Пользователю",
            ),
        ),
    ]

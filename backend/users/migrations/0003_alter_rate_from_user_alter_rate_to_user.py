# Generated by Django 4.2.5 on 2023-10-31 17:59

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_rename_user_rated_rate_from_user_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='rate',
            name='from_user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='from_user_rates', to=settings.AUTH_USER_MODEL, verbose_name='Оценивающий пользователь'),
        ),
        migrations.AlterField(
            model_name='rate',
            name='to_user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='to_user_rates', to=settings.AUTH_USER_MODEL, verbose_name='Оцененный'),
        ),
    ]

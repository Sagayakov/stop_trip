# Generated by Django 4.2.5 on 2023-09-28 13:19

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('offers', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='advertisement',
            name='owner',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='advertisements', to=settings.AUTH_USER_MODEL, verbose_name='Создатель'),
        ),
        migrations.AddField(
            model_name='advertisement',
            name='property_amenities',
            field=models.ManyToManyField(blank=True, related_name='amenities', to='offers.propertyamenity', verbose_name='Удобства'),
        ),
        migrations.AddField(
            model_name='advertisement',
            name='service_name',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='services', to='offers.service'),
        ),
        migrations.AddField(
            model_name='advertisement',
            name='subcategory',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='advertisements', to='offers.subcategory', verbose_name='Подкатегория'),
        ),
    ]

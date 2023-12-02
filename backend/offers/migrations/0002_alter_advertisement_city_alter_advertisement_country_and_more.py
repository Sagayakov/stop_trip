# Generated by Django 4.2.5 on 2023-12-02 05:20

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('offers', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='advertisement',
            name='city',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='city_advertisements', to='offers.city', verbose_name='Город'),
        ),
        migrations.AlterField(
            model_name='advertisement',
            name='country',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='country_advertisements', to='offers.country', verbose_name='Страна'),
        ),
        migrations.AlterField(
            model_name='advertisement',
            name='region',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='region_advertisements', to='offers.region', verbose_name='Район'),
        ),
        migrations.AlterField(
            model_name='city',
            name='region',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='cities', to='offers.region', verbose_name='Регион'),
        ),
    ]

# Generated by Django 4.2.5 on 2023-10-23 17:52

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('offers', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='review',
            name='advertisement',
        ),
    ]

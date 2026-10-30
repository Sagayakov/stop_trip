from django.db import migrations, models

from countries.data.vietnam import CURRENCIES


def load_currencies(apps, schema_editor):
    """Валюты для категории «Обмен валют». Повторный запуск ничего не дублирует."""

    Currency = apps.get_model("offers", "Currency")
    for short_name, name in CURRENCIES:
        Currency.objects.get_or_create(short_name=short_name, defaults={"name": name})


class Migration(migrations.Migration):
    dependencies = [
        ("offers", "0024_alter_advertisement_description"),
    ]

    operations = [
        # Цены во вьетнамских донгах большие (аренда байка — сотни тысяч, машины — сотни
        # миллионов), прежнего лимита в 99 млн не хватало.
        migrations.AlterField(
            model_name="advertisement",
            name="price",
            field=models.DecimalField(
                blank=True, decimal_places=2, max_digits=15, null=True, verbose_name="Цена"
            ),
        ),
        migrations.AddIndex(
            model_name="advertisement",
            index=models.Index(
                fields=["is_published", "-date_create"], name="adv_published_date_idx"
            ),
        ),
        migrations.AddIndex(
            model_name="advertisement",
            index=models.Index(fields=["category", "is_published"], name="adv_category_idx"),
        ),
        migrations.RunPython(load_currencies, reverse_code=migrations.RunPython.noop),
    ]

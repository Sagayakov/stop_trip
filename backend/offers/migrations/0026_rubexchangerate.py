from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("offers", "0025_price_vnd_currencies_indexes"),
    ]

    operations = [
        migrations.CreateModel(
            name="RubExchangeRate",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True, primary_key=True, serialize=False, verbose_name="ID"
                    ),
                ),
                (
                    "vnd_per_rub",
                    models.DecimalField(
                        decimal_places=2,
                        default=0,
                        help_text="Сколько вьетнамских донгов стоит 1 российский рубль, например 290. "
                        "0 — не показывать цены в рублях.",
                        max_digits=10,
                        verbose_name="Донгов за 1 рубль",
                    ),
                ),
                ("updated_at", models.DateTimeField(auto_now=True, verbose_name="Обновлён")),
            ],
            options={
                "verbose_name": "Курс рубля",
                "verbose_name_plural": "Курс рубля",
            },
        ),
    ]

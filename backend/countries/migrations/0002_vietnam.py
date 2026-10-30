from django.db import migrations

from countries.data.vietnam import COUNTRY, REGIONS


def load_vietnam(apps, schema_editor):
    """Создаёт Вьетнам, его провинции и города. Повторный запуск ничего не дублирует."""

    Country = apps.get_model("countries", "Country")
    Region = apps.get_model("countries", "Region")
    City = apps.get_model("countries", "City")

    country, _ = Country.objects.get_or_create(
        slug=COUNTRY["slug"], defaults={"name": COUNTRY["name"]}
    )
    for region_slug, region_name, cities in REGIONS:
        region, _ = Region.objects.get_or_create(
            slug=region_slug, defaults={"name": region_name, "country": country}
        )
        for city_slug, city_name in cities:
            City.objects.get_or_create(
                slug=city_slug, defaults={"name": city_name, "region": region}
            )


class Migration(migrations.Migration):
    dependencies = [
        ("countries", "0001_initial"),
    ]

    operations = [
        migrations.RunPython(load_vietnam, reverse_code=migrations.RunPython.noop),
    ]

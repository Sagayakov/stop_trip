from pytest import mark

from countries.data.vietnam import REGIONS
from countries.models import City, Country, Region
from offers.models import Currency


@mark.django_db
def test_vietnam_loaded_by_migration():
    vietnam = Country.objects.get(slug="vietnam")
    assert Region.objects.filter(country=vietnam).count() == len(REGIONS) == 34
    assert City.objects.get(slug="nha-trang").region.slug == "khanh-hoa"
    assert City.objects.get(slug="phu-quoc").region.slug == "an-giang"
    assert City.objects.get(slug="hoi-an").region.slug == "da-nang"


@mark.django_db
def test_currencies_loaded_by_migration():
    codes = set(Currency.objects.values_list("short_name", flat=True))
    assert codes >= {"VND", "USD", "EUR", "RUB"}

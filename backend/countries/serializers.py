from rest_framework import serializers
from .models import Country, Region, City


class CountrySerializer(serializers.ModelSerializer):
    """Сериализатор страны объявления."""

    class Meta:
        model = Country
        fields = ("name",)


class RegionSerializer(serializers.ModelSerializer):
    """Сериализатор области объявления."""

    class Meta:
        model = Region
        fields = ("name",)


class CitySerializer(serializers.ModelSerializer):
    """Сериализатор города объявления."""

    class Meta:
        model = City
        fields = ("name",)

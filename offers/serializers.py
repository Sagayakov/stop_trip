from rest_framework import serializers

from .models import Advertisement, Category, SubCategory
from users.models import User


class AdvertisementSerializer(serializers.ModelSerializer):
    subcategory = serializers.CharField(allow_null=False)
    owner = serializers.PrimaryKeyRelatedField(allow_null=False, queryset=User.objects.all())
    title = serializers.CharField(allow_null=False, max_length=100)
    price = serializers.IntegerField()
    description = serializers.CharField(max_length=1000)
    is_published = serializers.BooleanField()

    class Meta:
        model = Advertisement
        fields = (
            'id', 'subcategory', 'title', 'price', 'description', 'is_published', 'slug', 'date_create', 'date_update'
        )


class PropertySerializer(AdvertisementSerializer):
    class Meta:
        model = Advertisement
        fields = AdvertisementSerializer.Meta.fields + (
            'property_type_of_service', 'property_city', 'property_district', 'property_coords',
            'property_building_max_floor', 'property_floor', 'property_bathroom_count', 'property_bathroom_type',
            'property_area', 'property_living_area', 'property_balcony', 'property_has_furniture', 'property_amenities',
            'property_house_type', 'property_has_parking', 'property_rental_condition', 'property_prepayment',
            'property_sleeping_places'
        )


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class SubCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SubCategory
        fields = '__all__'

from rest_framework import serializers
from offers.models import Advertisement


class FavoriteAdvertisementCreateSerializer(serializers.Serializer):
    id = serializers.PrimaryKeyRelatedField(queryset=Advertisement.objects.all(), required=True)

from .advertisement_serializers import AdvertisementCreateSerializer
from ..models import Advertisement


class TaxiCreateSerializer(AdvertisementCreateSerializer):
    class Meta:
        model = Advertisement
        fields = AdvertisementCreateSerializer.Meta.fields + (
            "taxi_unit",
            "taxi_type",
        )

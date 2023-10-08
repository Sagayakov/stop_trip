from rest_framework.routers import DefaultRouter

from offers.views import AdvertisementModelViewSet

router = DefaultRouter()
router.register("advertisements", AdvertisementModelViewSet, basename="advertisements")

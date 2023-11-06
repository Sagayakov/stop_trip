from rest_framework.routers import DefaultRouter
from offers.views import AdvertisementModelViewSet
from users.views import RateViewSet

router = DefaultRouter()

router.register("advertisements", AdvertisementModelViewSet, basename="advertisements")
router.register("user_rate", RateViewSet, basename="user_rate")

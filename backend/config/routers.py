from rest_framework.routers import DefaultRouter
from django.urls import path, include
from offers.views import AdvertisementModelViewSet
# from users.views import CreateListRatesModelViewSet

router = DefaultRouter()
router.register("advertisements", AdvertisementModelViewSet, basename="advertisements")




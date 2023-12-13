from rest_framework.routers import DefaultRouter

from favorites.views import FavoriteViewSet
from offers.views import AdvertisementModelViewSet, UserAdvertisementModelView
from users.views import RateViewSet
from feedback.views import FeedbackModelViewSet

router = DefaultRouter()

router.register("advertisements", AdvertisementModelViewSet, basename="advertisements")
router.register("user_rate", RateViewSet, basename="user_rate")
router.register("feedback", FeedbackModelViewSet, basename="feedback")
router.register("favorites", FavoriteViewSet, basename="favorites")
router.register("advertisement_user", UserAdvertisementModelView, basename="advertisement_user")

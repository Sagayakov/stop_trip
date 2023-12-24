from rest_framework.routers import DefaultRouter

from favorites.views import FavoriteViewSet
from feedback.views import FeedbackModelViewSet
from offers.views import AdvertisementModelViewSet
from users.views import RateViewSet

router = DefaultRouter()

router.register("advertisements", AdvertisementModelViewSet, basename="advertisements")
router.register("user_rate", RateViewSet, basename="user_rate")
router.register("feedback", FeedbackModelViewSet, basename="feedback")
router.register("favorites", FavoriteViewSet, basename="favorites")

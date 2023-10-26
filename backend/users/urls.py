from django.urls import path
from .views import (
    RateCreateAPIView,
    RateListAPIView, RateDetailAPIView
)

urlpatterns = [path("<int:pk>/rate-create", RateCreateAPIView.as_view(), name="rate-create"),
               path("<int:pk>/rate-list", RateListAPIView.as_view(), name="rate-list"),
               path("rate-details/<int:pk>/", RateDetailAPIView.as_view(), name="rate-detail")]

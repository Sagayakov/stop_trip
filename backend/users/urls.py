from django.urls import path
from .views import (CreateListRatesAPIView, RetrieveUpdateDestroyRateAPIView

)

urlpatterns = [path("<int:pk>/list-create-rate", CreateListRatesAPIView.as_view(), name="list-create-rate"),
               path("rate-details/<int:pk>/", RetrieveUpdateDestroyRateAPIView.as_view(), name="rate-detail")]

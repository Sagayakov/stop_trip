from django.urls import path, include
from rest_framework.routers import DefaultRouter

from offers import views

router = DefaultRouter()
router.register('advertisements', views.AdvertisementModelViewSet)
router.register('categories', views.CategoryModelViewSet)
router.register('subcategories', views.SubCategoryModelViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

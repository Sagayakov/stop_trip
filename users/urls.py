from django.urls import path

from users import views


urlpatterns = [
    path('v1/users/', views.UserListAPIView.as_view()),
]

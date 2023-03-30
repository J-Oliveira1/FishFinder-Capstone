from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_reviews),
    path('new/', views.user_reviews)
]
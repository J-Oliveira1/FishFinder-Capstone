from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.get_comments),
    path('new/', views.user_comments)
]
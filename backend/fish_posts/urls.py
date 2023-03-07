from django.urls import path, include
from fish_posts import views

urlpatterns = [
    path('', views.fishing_posts),
    path('all/', views.get_fish_posts),

]
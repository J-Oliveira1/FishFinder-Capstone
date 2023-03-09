from django.urls import path, include
from fish_posts import views

urlpatterns = [
    path('new/', views.fishing_posts),
    path('', views.get_fish_posts),
    path('<int:fish_posts_id>/update/', views.update_fish_posts),
    path('<int:fish_posts_id>/delete/', views.delete_fish_post),
]
from django.urls import path, include
from fishing_holes import views 

urlpatterns = [
    path('', views.user_fishing_holes),
    path('all/', views.get_all_fishing_holes),
    path('<int:fishing_holes_id>/fish_posts/', include("fish_posts.urls")),
]
from django.urls import path, include
from . import views 

urlpatterns = [
    path('', views.user_fishing_holes),
    path('all/', views.get_all_fishing_holes),
    path('<int:fishing_holes_id>/update/', views.update_fishing_holes),
    path('<int:fishing_holes_id>/delete/', views.delete_fishing_holes),
    path('<int:fishing_hole_id>/fish_posts/', include('fish_posts.urls')),
    path('<int:fishing_hole_id>/comments/', include('comments.urls')),
]
from django.urls import path, include
from . import views 

urlpatterns = [
    path('', views.user_fishing_holes),
    path('all/', views.get_all_fishing_holes),
    path('<int:fishing_hole_id>/fish_posts/', include('fish_posts.urls'))
]
from django.db import models
from authentication.models import User
from fish_posts.models import FishPosts

# Create your models here.
class FishingHoles(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    record_fish = models.ForeignKey(FishPosts, on_delete=models.CASCADE)
    address = models.CharField(max_length=225)
    latitude = models.FloatField(max_length=225)
    longitude = models.FloatField(max_length=225)
    parking = models.CharField(max_length=225)
    restroom = models.CharField(max_length=225)

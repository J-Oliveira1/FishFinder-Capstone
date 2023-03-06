from django.db import models
from authentication.models import User
from fishing_holes.models import FishingHoles

# Create your models here.
class FishPosts(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    fishing_hole = models.ForeignKey(FishingHoles, on_delete=models.CASCADE)
    type = models.CharField(max_length=225)
    photo = models.CharField(max_length=255)
    size = models.DecimalField(max_digits=3)
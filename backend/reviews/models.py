from django.db import models
from authentication.models import User
from fishing_holes.models import FishingHole

class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    fishing_hole = models.ForeignKey(FishingHole, on_delete=models.CASCADE)
    text = models.CharField(max_length=225)
    



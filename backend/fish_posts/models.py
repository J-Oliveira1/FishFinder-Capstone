from django.db import models
from authentication.models import User
from fishing_holes.models import FishingHole

# Create your models here.
class FishPost(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    fishing_hole = models.ForeignKey(FishingHole, on_delete=models.CASCADE)
    type = models.CharField(max_length=225)
    photo = models.CharField(max_length=255)
    size = models.DecimalField(max_digits=3, decimal_places=2, blank=True, null=True)
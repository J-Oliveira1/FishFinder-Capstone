from django.db import models
from authentication.models import User
from fishing_holes.models import FishingHole


class Review(models.Model):
    STAR_RATINGS = [
        (1, '1 star'),
        (2, '2 stars'),
        (3, '3 stars'),
        (4, '4 stars'),
        (5, '5 stars'),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    fishing_hole = models.ForeignKey(FishingHole, on_delete=models.CASCADE)
    text = models.CharField(max_length=225)
    rating = models.IntegerField(choices=STAR_RATINGS)

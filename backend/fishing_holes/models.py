from django.db import models
from authentication.models import User


# Create your models here.
class FishingHole(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    record_fish = models.ForeignKey('fish_posts.FishPost', on_delete=models.CASCADE, blank=True, null=True)
    address = models.CharField(max_length=225)
    latitude = models.FloatField(max_length=225)
    longitude = models.FloatField(max_length=225)
    parking = models.CharField(max_length=225)
    restroom = models.CharField(max_length=225)

    def average_rating(self):
        reviews = self.review_set.all()
        if reviews.count() > 0:
            return sum(review.rating for review in reviews) / reviews.count()
        else:
            return None
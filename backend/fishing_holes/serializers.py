from rest_framework import serializers
from .models import FishingHole

class FishingHoleSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    def get_username(self, fishing_hole):
        return fishing_hole.user.username
    
    def get_average_rating(self, fishing_hole):
        return fishing_hole.average_rating()
    
    class Meta:
        model = FishingHole
        fields = ['id', 'username', 'record_fish', 'address', 'latitude', 'longitude', 'parking', 'restroom', 'average_rating']
        depth = 1
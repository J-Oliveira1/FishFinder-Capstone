from rest_framework import serializers
from .models import FishPost

class FishPostSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    def get_username(self, fish_post):
        return fish_post.user.username
    
    class Meta:
        model = FishPost
        fields = ['id', 'username', 'fishing_hole_id', 'type', 'photo', 'size']
        depth = 1
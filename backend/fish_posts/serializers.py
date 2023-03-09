from rest_framework import serializers
from .models import FishPost
from rest_framework.fields import FileField, SerializerMethodField

class FishPostSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    photo = FileField(required=False)
    def get_username(self, fish_post):
        return fish_post.user.username
    
    class Meta:
        model = FishPost
        fields = ['id', 'username', 'fishing_hole_id', 'type', 'photo',  'size']
        depth = 1


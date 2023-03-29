from rest_framework import serializers
from .models import Review


class ReviewSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    def get_username(self, review):
        return review.user.username
    
    class Meta:
        model = Review  
        fields = ['id', 'username', 'fishing_hole_id', 'text']
from rest_framework import serializers
from .models import Comment


class CommentSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    def get_username(self, comment):
        return comment.user.username
    
    class Meta:
        model = Comment
        fields = ['id', 'username', 'fishing_hole_id', 'text']
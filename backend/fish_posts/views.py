from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import FishPost
from .serializers import FishPostSerializer




@api_view(['GET'])
@permission_classes([AllowAny])
def get_fish_posts(request, fishing_hole_id):
    fish_posts = FishPost.objects.filter(fishing_hole_id=fishing_hole_id)
    serializer = FishPostSerializer(fish_posts, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def fishing_posts(request, fishing_hole_id):
    if request.method == 'POST':
        serializer = FishPostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user, fishing_hole_id=fishing_hole_id)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
    
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_fish_posts(request, fishing_hole_id, fish_posts_id):
    fish_posts = get_object_or_404(FishPost, pk=fish_posts_id, fishing_hole_id=fishing_hole_id)
    if request.method == 'PUT':
        serializer = FishPostSerializer(fish_posts, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user, fishing_hole_id=fishing_hole_id, fish_posts=fish_posts)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_fish_post(request, fish_posts_id, fishing_hole_id):
    fish_posts = get_object_or_404(FishPost, pk=fish_posts_id, fishing_hole_id=fishing_hole_id)
    fish_posts.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
    

          
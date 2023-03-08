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
    print(
        'User ', f"{request.user.id} {request.user.email} {request.user.username}"
    )
    if request.method == 'POST':
        serializer = FishPostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user, fishing_hole_id=fishing_hole_id)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)       
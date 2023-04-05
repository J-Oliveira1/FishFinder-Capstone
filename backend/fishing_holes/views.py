from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import FishingHole
from .serializers import FishingHoleSerializer

# Create your views here.

@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_fishing_holes(request):
    fishing_holes = FishingHole.objects.all()
    serializer = FishingHoleSerializer(fishing_holes, many=True)
    for index, fishing_hole_data in enumerate(serializer.data):
        fishing_hole = FishingHole.objects.get(pk=fishing_hole_data['id'])
        serializer.data[index]['average_rating'] = fishing_hole.average_rating()
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def user_fishing_holes(request):
    if request.method == 'POST':
        serializer = FishingHoleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_fishing_holes(request, fishing_holes_id):
    fishing_hole = get_object_or_404(FishingHole, pk=fishing_holes_id)
    if request.method == 'PUT':
        serializer = FishingHoleSerializer(fishing_hole, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_fishing_holes(request, fishing_holes_id):
    fishing_hole = get_object_or_404(FishingHole, pk=fishing_holes_id)
    fishing_hole.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
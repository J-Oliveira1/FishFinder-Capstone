from .serializers import ReviewSerializer
from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Review


@api_view(['GET'])
@permission_classes([AllowAny])
def get_reviews(request, fishing_hole_id):
    reviews = Review.objects.filter(fishing_hole_id=fishing_hole_id)
    serializer = ReviewSerializer(reviews, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def user_reviews(request, fishing_hole_id):
    if request.method == 'POST':
        serializer = ReviewSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user, fishing_hole_id=fishing_hole_id)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

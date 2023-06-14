from pathlib import Path
from django.conf import settings
from django.core.exceptions import ValidationError
from django.core.files.storage import FileSystemStorage

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status

from .serializers import ProductSerializer
from .models import Product


@api_view(['GET'])
@permission_classes([IsAuthenticated | IsAdminUser])
def get_products(request):
    products = Product.objects.all().order_by('-id')
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated | IsAdminUser])
def get_product_id(request, pk):
    try:
        product = Product.objects.get(id=pk)
        serializer = ProductSerializer(product)
        return Response(serializer.data)
    except Product.DoesNotExist:
        return Response({'Error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
@permission_classes([IsAuthenticated | IsAdminUser])
def add_product(request):
    serializer = ProductSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_product(request, pk):
    try:
        product = Product.objects.get(id=pk)
    except Product.DoesNotExist:
        return Response({'Error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = ProductSerializer(instance=product, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated | IsAdminUser])
def update_product_image(request, pk):
    try:
        product = Product.objects.get(pk=pk)
    except Product.DoesNotExist:
        return Response({'Error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

    image = request.FILES.get('image')
    if image:
        if product.image:
            storage = FileSystemStorage(location=settings.MEDIA_ROOT)
            storage.delete(product.image.name)
        try:
            validate_image_file(image)
            product.image = image
            product.save()
            serializer = ProductSerializer(product)
            return Response(serializer.data)
        except ValidationError:
            return Response({'Error': 'Invalid image format'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'Error': 'No image provided'}, status=status.HTTP_400_BAD_REQUEST)


def validate_image_file(image):
    valid_extensions = ['.jpg', '.jpeg', '.png']
    file_extension = Path(image.name).suffix.lower()
    if file_extension not in valid_extensions:
        raise ValidationError('Invalid image format.')


@api_view(['DELETE'])
@permission_classes([IsAuthenticated | IsAdminUser])
def delete_product(request, pk):
    try:
        product = Product.objects.get(id=pk)
    except Product.DoesNotExist:
        return Response({'Error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

    product.delete()
    return Response('Product deleted')

from django.urls import path
from . import views

urlpatterns = [
    path('get/', views.get_products),
    path('getProduct/<int:pk>/', views.get_product_id),
    path('add/', views.add_product),
    path('update/<int:pk>/', views.update_product),
    path('updateImage/<int:pk>/', views.update_product_image),
    path('delete/<int:pk>/', views.delete_product),
]

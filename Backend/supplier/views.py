from django.shortcuts import render
from django.shortcuts import render
from rest_framework import generics
from .models import Supplier
from .serializer import SupplierSerializer

# Create your views here.
class SupplierCreateView(generics.CreateAPIView):
      queryset= Supplier.objects.all()
      serializer_class=SupplierSerializer

class SupplierListView(generics.ListAPIView):
       queryset=Supplier.objects.all()
       serializer_class=SupplierSerializer
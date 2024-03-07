from django.shortcuts import render
from rest_framework import generics
from .models import *
from .serializer import CoffeeTypeSerializer,ProcessTypeSerializer

# class CellAPIView(generics.ListAPIView):
#     serializer_class = SectionSerializer
#     lookup_url_kwarg = 'section'

#     def get_queryset(self):
#         section_id = self.kwargs.get(self.lookup_url_kwarg)
#         queryset = Cell.objects.filter(section=section_id)

#         return queryset

class CoffeTypeListView(generics.ListAPIView):
    queryset=CoffeeType.objects.all()
    serializer_class=CoffeeTypeSerializer

class ProcessTypeAPIView(generics.ListAPIView):
    serializer_class=ProcessTypeSerializer
    lookup_url_kwarg='coffeetype'

    def get_queryset(self):
        coffee_type_id=self.kwargs.get(self.lookup_url_kwarg)
        queryset=ProcessType.objects.filter(coffee_type=coffee_type_id)
        return queryset
    
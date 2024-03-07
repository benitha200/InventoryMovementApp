from django.shortcuts import render
from django.db.models import Sum
from rest_framework import generics
from .models import Warehouse
from .serializer import *
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework import  viewsets

# Create your views here.

class WarehouseListView(generics.ListAPIView):
    queryset=Warehouse.objects.all()
    serializer_class=WarehouseSerializer


class WareHouseCreateView(generics.CreateAPIView):
    queryset=Warehouse.objects.all()
    serializer_class=WarehouseSerializer

class SectionCreateView(generics.CreateAPIView):
    queryset=Section.objects.all()
    serializer_class=SectionSerializer

class SectionListView(generics.ListAPIView):
    queryset=Section.objects.all()
    serializer_class=SectionSerializer

class SectionAPIView(generics.ListAPIView):
    serializer_class = SectionSerializer
    lookup_url_kwarg = 'warehouse'

    def get_queryset(self):
        warehouse_id = self.kwargs.get(self.lookup_url_kwarg)
        queryset = Section.objects.filter(warehouse=warehouse_id)
        return queryset

class CellCreateView(generics.CreateAPIView):
      queryset=Cell.objects.all()
      serializer_class=CellSerializer

class CellListView(generics.ListAPIView):
      queryset= Cell.objects.all()
      serializer_class=CellSerializer
    
class CellAPIView(generics.ListAPIView):
    serializer_class = SectionSerializer
    lookup_url_kwarg = 'section'

    def get_queryset(self):
        section_id = self.kwargs.get(self.lookup_url_kwarg)
        queryset = Cell.objects.filter(section=section_id)

        return queryset
    
# class WarehouseListView(generics.ListAPIView):
#     queryset = Warehouse.objects.prefetch_related('sections__cells').all()
#     serializer_class = WarehouseSerializer
    
class StockInCreateView(generics.CreateAPIView):
    queryset = StockIn.objects.all()
    serializer_class = StockInSerializer

    def perform_create(self, serializer):
        # Save StockIn instance
        stock_in_instance = serializer.save()

        # Print to debug and check values
        print(f"StockIn instance created: {stock_in_instance}")

        # Extract relevant data from the StockIn instance and create Stock instance
        stock_data = {
            'stock_in': stock_in_instance.id,
            'warehouse': stock_in_instance.warehouse.id,
            'section': stock_in_instance.section.id,
            'cell': stock_in_instance.cell.id,
            'coffetype': stock_in_instance.coffetype.id,
            'processtype': stock_in_instance.processtype.id,
            'wrn': stock_in_instance.wrn,
            'quantity_kgs': stock_in_instance.quantity_kgs,
            'bags_no': stock_in_instance.bags,
            'moved_to': 0,
            'moisture_content':stock_in_instance.moisture_content
        }
        print(f"Stock data to be created: {stock_data}")

        stock_serializer = StockSerializer(data=stock_data)
        if stock_serializer.is_valid():
            stock_serializer.save()
            print("Stock instance created successfully.")
        else:
            # Print validation errors for debugging
            print(f"Stock validation errors: {stock_serializer.errors}")
            
            # Handle validation errors if needed
            # You might want to customize this part based on your requirements
            response_data = {'error': 'Failed to create Stock instance'}
            return Response(response_data, status=status.HTTP_400_BAD_REQUEST)

        # Return a successful response if both instances are created successfully
        response_data = {'message': 'StockIn and Stock instances created successfully'}
        return Response(response_data, status=status.HTTP_201_CREATED)


class StockListView(generics.ListAPIView):
    serializer_class = StockListSerializer

    def get_queryset(self):
        queryset = Stock.objects.values(
            'warehouse__name',
            'coffetype__name',   
            'processtype__type_name' 
        ).annotate(
            total_quantity_kgs=Sum('quantity_kgs'),
            total_bags_no=Sum('bags_no')
        )
        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

class StockInListView(generics.ListAPIView):
    queryset = StockIn.objects.all().order_by("-id")
    serializer_class = StockInListSerializer

class StockDataAPIView(APIView):
    def get(self, request, *args, **kwargs):
        try:
            stocks = Stock.objects.all()
            serializer = StockDataSerializer(stocks, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

       
class CellWithWarehouseSectionAPIView(generics.ListAPIView):
    serializer_class = CellSerializer

    def get_queryset(self):
        # Fetch all cells with related sections and warehouses
        queryset = Cell.objects.select_related('section__warehouse').all()
        return queryset
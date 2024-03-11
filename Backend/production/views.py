from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import *
from stock.models import *
from .serializers import *
from rest_framework import generics
from django.db.models import Sum,Max

# Create your views here.
# class ProductionInCreateAPIView(APIView):
    # def post(self, request, *args, **kwargs):
    #     selected_wrns = request.data.get('selected_wrns', [])
    #     quantity_inputs = request.data.get('quantity_inputs', [])

    #     if len(selected_wrns) != len(quantity_inputs):
    #         return Response({"error": "Number of selected WRNs and quantity inputs do not match."}, status=status.HTTP_400_BAD_REQUEST)

    #     for wrn, quantity in zip(selected_wrns, quantity_inputs):
    #         production_data = {
    #             'stock': wrn['value'],  # Assuming 'value' in wrn corresponds to stock id
    #             'warehouse': wrn['warehouse_id'],
    #             'section': wrn['section_id'],
    #             'cell': wrn['cell_id'],
    #             'stock_quantity': wrn['stock_quantity'],
    #             'production_quantity': quantity,
    #             'bags': wrn['bags'],
    #             'processtype': wrn['processtype_id'],
    #         }
    #         serializer = ProductionInSerializer(data=production_data)
    #         if serializer.is_valid():
    #             serializer.save()
    #         else:
    #             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    #     return Response({"message": "Production data successfully created."}, status=status.HTTP_201_CREATED)
    
# class ProductionInCreateAPIView(APIView):
#     def post(self, request, *args, **kwargs):
#         print(request.data)
#         net_quantity = int(request.data['quantity'])
#         bags = (net_quantity + 59) // 60
#         try:
#             # Retrieve the corresponding Stock instance based on WRN
#             stock_instance = Stock.objects.get(wrn=request.data['wrn'])
#             print(stock_instance)
            
#             production_process=ProductionProcess.objects.get(id=request.data['production_process'])
            
#             production_data = {
#                 'stock': stock_instance,
#                 'warehouse': stock_instance.warehouse,
#                 'section': stock_instance.section,
#                 'cell': stock_instance.cell,
#                 'coffetype_id': stock_instance.stock_in.coffetype.id,
#                 'stock_quantity': stock_instance.quantity_kgs,
#                 'net_quantity': net_quantity,  
#                 'bags':bags,
#                 'processtype': stock_instance.processtype,
#                 'production_process':production_process
#             }

#             stock_instance.quantity_kgs -= int(request.data['quantity'])
#             stock_instance.bags_no-=bags

#             if(stock_instance.quantity_kgs < int(request.data['quantity'])):
#                 return Response({"error": f"Quantity of {stock_instance} is greater than expected"}, status=status.HTTP_400_BAD_REQUEST)


#             stock_instance.save()

#             production_instance = ProductionData.objects.create(**production_data)

#             # Serialize and return the created ProductionIn instance
#             serializer = ProductionDataSerializer(production_instance)
#             # return Response(serializer.data, status=status.HTTP_201_CREATED)

#             # Create ProductionIn instance
#             production_in_data = {
#                 'stock': stock_instance,
#                 'warehouse': stock_instance.warehouse,
#                 'section': stock_instance.section,
#                 'cell': stock_instance.cell,
#                 # 'supplier_id':stock_instance.stock_in.supplier,
#                 'stock_quantity': stock_instance.quantity_kgs,
#                 'production_quantity': int(request.data['quantity']),  # Convert quantity to integer
#                 'bags': stock_instance.bags_no,
#                 'processtype': stock_instance.processtype,
#             }
#             production_in_instance = ProductionInput.objects.create(**production_in_data)

#             return Response({"message": "Production data successfully created."}, status=status.HTTP_201_CREATED)

#         except Stock.DoesNotExist:
#             return Response({"error": "Stock not found for the provided WRN"}, status=status.HTTP_404_NOT_FOUND)
#         except Exception as e:
#             return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class ProductionInCreateAPIView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            print(request.data)
            net_quantity = int(request.data['quantity'])
            bags = (net_quantity + 59) // 60
            
            # Retrieve the corresponding Stock instance based on WRN
            stock_instance = Stock.objects.get(wrn=request.data['wrn'])
            print(stock_instance)

            production_process = ProductionProcess.objects.get(id=request.data['production_process'])

            production_data = {
                'stock': stock_instance,
                'warehouse': stock_instance.warehouse,
                'section': stock_instance.section,
                'cell': stock_instance.cell,
                'coffetype_id': stock_instance.stock_in.coffetype.id,
                'stock_quantity': stock_instance.quantity_kgs,
                'net_quantity': net_quantity,  
                'bags': bags,
                'processtype': stock_instance.processtype,
                'production_process': production_process,
                'batch_no':request.data['batchno'],
                'wrn':request.data['wrn']
            
            }
            if stock_instance.quantity_kgs < int(request.data['quantity']):
                            return Response({"error": f"Quantity of {stock_instance} is greater than expected"}, status=status.HTTP_400_BAD_REQUEST)
            stock_instance.quantity_kgs -= int(request.data['quantity'])
            stock_instance.bags_no -= bags

            

            stock_instance.save()

            production_instance = ProductionData.objects.create(**production_data)

            # Get the batch_no after saving
            request.data['batchno']

            # Serialize and return the created ProductionIn instance along with batch_no
            serializer = ProductionDataSerializer(production_instance)
            response_data = {
                "message": "Production data successfully created.",
                "batch_no": request.data['batchno'],
                "data": serializer.data,
            }
            
            return Response(response_data, status=status.HTTP_201_CREATED)

        except Stock.DoesNotExist:
            return Response({"error": "Stock not found for the provided WRN"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ProductionOutCreateAPIView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            print(request.data)
            net_quantity = int(request.data['quantity'])
            bags = (net_quantity + 59) // 60
            
            # Retrieve the corresponding Stock instance based on WRN
            stock_instance = Stock.objects.get(wrn=request.data['wrn'])
            print(stock_instance)

            production_process = ProductionProcess.objects.get(id=request.data['production_process'])

            production_data = {
                'stock': stock_instance,
                'warehouse': stock_instance.warehouse,
                'section': stock_instance.section,
                'cell': stock_instance.cell,
                'coffetype_id': stock_instance.stock_in.coffetype.id,
                'stock_quantity': stock_instance.quantity_kgs,
                'net_quantity': net_quantity,  
                'bags': bags,
                'processtype': stock_instance.processtype,
                'production_process': production_process,
                'batch_no':request.data['batchno'],
                'wrn':request.data['wrn']
            
            }
            if stock_instance.quantity_kgs < int(request.data['quantity']):
                            return Response({"error": f"Quantity of {stock_instance} is greater than expected"}, status=status.HTTP_400_BAD_REQUEST)
            stock_instance.quantity_kgs -= int(request.data['quantity'])
            stock_instance.bags_no -= bags

            

            stock_instance.save()

            production_instance = ProductionData.objects.create(**production_data)

            # Get the batch_no after saving
            request.data['batchno']

            # Serialize and return the created ProductionIn instance along with batch_no
            serializer = ProductionDataSerializer(production_instance)
            response_data = {
                "message": "Production data successfully created.",
                "batch_no": request.data['batchno'],
                "data": serializer.data,
            }
            
            return Response(response_data, status=status.HTTP_201_CREATED)

        except Stock.DoesNotExist:
            return Response({"error": "Stock not found for the provided WRN"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR) 
class MaxBatchNoAPIView(APIView):
    def get(self, request, *args, **kwargs):
        try:
            # Find the maximum batch_no from ProductionData
            max_batch_no = ProductionData.objects.aggregate(Max('batch_no'))['batch_no__max']

            if max_batch_no is not None:
                return Response({"max_batch_no": max_batch_no}, status=status.HTTP_200_OK)
            else:
                # Set default batch_no if no production data found
                default_batch_no = "00000"
                return Response({"max_batch_no": default_batch_no}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class ProductionBatchDetails(generics.ListAPIView):
    serializer_class=ProductionDataSerializer

    def get(self, request, *args, **kwargs):
        batch_no = request.query_params.get('batch_no')
        print(batch_no)

        if not batch_no:
            return Response({"detail": "Batch numbers are required"}, status=status.HTTP_400_BAD_REQUEST)

        production_data = ProductionData.objects.filter(batch_no=batch_no)
        serializer = ProductionDataSerializer(production_data, many=True) 

        return Response(serializer.data, status=status.HTTP_200_OK)

class ProductionDataListView(generics.ListAPIView):
    serializer_class = ProductionDataGroupedSerializer

    def get_queryset(self):
        queryset = (
            ProductionData.objects
            .values('production_process', 'production_process__name', 'batch_no')  # Include batch_no in values
            .annotate(
                total_stock_quantity=Sum('stock_quantity'),
                total_net_quantity=Sum('net_quantity'),
                total_bags=Sum('bags'),
            )
            .order_by('-batch_no')  # Order by production_process and batch_no if needed
        )

        # Optionally, you can exclude batches where all values are zero
        queryset = queryset.exclude(
            total_stock_quantity=0,
            total_net_quantity=0,
            total_bags=0,
        )

        return queryset

class AllProductionDataListView(generics.ListAPIView):
    queryset=ProductionData.objects.all()
    serializer_class=ProductionDataSerializer

class ProductionDataByProcess(generics.ListAPIView):
    serializer_class=ProductionDataSerializer
    lookup_url_kwarg='processfrom'

    def get_queryset(self):
        process_from=self.kwargs.get(self.lookup_url_kwarg)
        queryset=ProductionData.objects.filter(production_process__id=process_from)
        return queryset

class ProductionProcessCreateAPIView(generics.CreateAPIView):
    queryset=ProductionProcess.objects.all()
    serializer_class=ProductionProcessSerializer


class ProductionProcessListView(generics.ListAPIView):
    queryset=ProductionProcess.objects.all()
    serializer_class=ProductionProcessSerializer

# class ProductionLogsCreateAPIView(APIView):
#     def post(self, request, *args, **kwargs):
#         try:
#             moved_quantity = int(request.data['moved_quantity'])
#             bags = (moved_quantity + 59) // 60

#             production_instance = ProductionData.objects.get(batch_no=request.data['batch_no'])
#             production_process_from = ProductionProcess.objects.get(id=request.data['production_process_from'])
#             production_process_to = ProductionProcess.objects.get(id=request.data['production_process_to'])

#             production_data = {
#                 'production': production_instance,
#                 'warehouse': production_instance.warehouse,
#                 'section': production_instance.section,
#                 'cell': production_instance.cell,
#                 'stock_quantity': production_instance.stock_quantity,
#                 'net_quantity': production_instance.net_quantity,
#                 'bags': bags,
#                 # 'processtype': production_instance.processtype,
#                 'production_process_from': production_process_from,
#                 'production_process_from': production_process_to,
#                 'batch_no':request.data['batch_no']
#             }

#             if int(request.data['net_quantity']) < int(request.data['moved_quantity']):
#                 return Response({"error": f"Quantity of {production_instance} is greater than expected"}, status=status.HTTP_400_BAD_REQUEST)


#             production_instance.net_quantity -= int(request.data['moved_quantity'])
#             production_instance.bags -= bags

#             production_instance.production_process=production_process_to

#             print(production_instance.net_quantity)

#             production_instance.save()

#             production_logs_instance = ProductionLogs.objects.create(**production_data)

#             # Get the batch_no after saving
#             response_data = {
#                     "message": "Production data successfully Moved.",
#                     # "batch_no": request.data['batchno'],
#                     "data": ProductionLogsSerializer(production_logs_instance).data,
#                 }

#             return Response(response_data, status=status.HTTP_201_CREATED)

#         except Stock.DoesNotExist:
#             return Response({"error": "Production Not found"}, status=status.HTTP_404_NOT_FOUND)
#         except Exception as e:
#             return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
# class ProductionLogsCreateAPIView(APIView):
#     def post(self, request, *args, **kwargs):
#         try:
#             print(request.data)
#             # Check if 'moved_quantity' is present in the request data and not None
#             if 'moved_quantity' not in request.data or request.data['moved_quantity'] is None:
#                 return Response({"error": "moved_quantity is required"}, status=status.HTTP_400_BAD_REQUEST)

#             moved_quantity = int(request.data['moved_quantity'])
#             bags = (moved_quantity + 59) // 60

#             production_instance = ProductionData.objects.get(batch_no=request.data['batch_no'])
#             production_process_from = ProductionProcess.objects.get(id=request.data['production_process_from'])
#             production_process_to = ProductionProcess.objects.get(id=request.data['production_process_to'])

#             if production_process_from == production_process_to:
#                 return Response({"error": "you can move from - to the same process"}, status=status.HTTP_406_NOT_ACCEPTABLE)

#             production_data = {
#                 'production': production_instance,
#                 'warehouse': production_instance.warehouse,
#                 'section': production_instance.section,
#                 'cell': production_instance.cell,
#                 'stock_quantity': production_instance.stock_quantity,
#                 'net_quantity': production_instance.net_quantity,
#                 'bags': bags,
#                 'production_process_from': production_process_from,
#                 'production_process_to': production_process_to,
#                 'batch_no': request.data['batch_no']
#             }
#             print(production_data)

#             if  moved_quantity > int(request.data['net_quantity']):
#                 return Response({"error": f"Quantity of {production_instance} is greater than expected"}, status=status.HTTP_400_BAD_REQUEST)

#             production_instance.net_quantity = moved_quantity
#             production_instance.bags = bags
#             production_instance.production_process = production_process_to
#             production_instance.save()

#             production_logs_instance = ProductionLogs.objects.create(**production_data)
#             print(production_logs_instance)


#             response_data = {
#                 "message": "Production data successfully Moved.",
#                 "data": ProductionLogsSerializer(production_logs_instance).data,
#             }

#             return Response(response_data, status=status.HTTP_201_CREATED)

#         except ProductionData.DoesNotExist:
#             return Response({"error": "Production Not found"}, status=status.HTTP_404_NOT_FOUND)
#         except Exception as e:
#             return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

class ProductionLogsCreateAPIView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            print(request.data)
            if 'moved_quantity' not in request.data or request.data['moved_quantity'] is None:
                return Response({"error": "moved_quantity is required"}, status=status.HTTP_400_BAD_REQUEST)

            moved_quantity = int(request.data['moved_quantity'])
            bags = (moved_quantity + 59) // 60

            production_instance = ProductionData.objects.get(batch_no=request.data['batch_no'],production_process=request.data['production_process_from'])
            production_process_from = ProductionProcess.objects.get(id=request.data['production_process_from'])
            production_process_to = ProductionProcess.objects.get(id=request.data['production_process_to'])

            if production_process_from == production_process_to:
                return Response({"error": "you can't move from and to the same process"}, status=status.HTTP_406_NOT_ACCEPTABLE)

            # Update production_instance fields for production from
            production_instance.net_quantity -= moved_quantity
            production_instance.bags -= bags
            production_instance.production_process = production_process_from
            production_instance.save()
            print(production_instance)

            # save production to process
            production_instance_ = ProductionData(
                stock=production_instance.stock,
                warehouse=production_instance.warehouse,
                section=production_instance.section,
                cell=production_instance.cell,
                coffetype_id= production_instance.coffetype_id,
                stock_quantity=production_instance.net_quantity,
                # coffetype_id=production_instance.coffetype_id,
                net_quantity=moved_quantity,
                bags=bags,
                processtype=production_instance.processtype,
                production_process=production_process_to,
                batch_no=request.data['batch_no']
            )

            production_instance_.save()

            # Create ProductionLogs instance
            production_logs_instance = ProductionLogs(
                production=production_instance,
                warehouse=production_instance.warehouse,
                section=production_instance.section,
                cell=production_instance.cell,
                stock_quantity=production_instance.stock_quantity,
                coffetype_id=production_instance.coffetype_id,
                net_quantity=production_instance.net_quantity,
                moved_quantity=moved_quantity,
                bags=bags,
                production_process_from=production_process_from,
                production_process_to=production_process_to,
                batch_no=request.data['batch_no']
            )
            production_logs_instance.save()

            response_data = {
                "message": "Production data successfully Moved.",
                "data": ProductionLogsSerializer(production_logs_instance).data,
            }

            return Response(response_data, status=status.HTTP_201_CREATED)

        except ProductionData.DoesNotExist:
            return Response({"error": "Production Not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        


class ProductionLogsAPIView(generics.ListAPIView):
    queryset = ProductionLogs.objects.all()
    serializer_class = ProductionLogsSerializer

class ProductionDataDetailsAPIView(APIView):
    def get(self, request, *args, **kwargs):
        batch_nos = request.query_params.getlist('batch_nos', [])
        print(batch_nos)

        if not batch_nos:
            return Response({"detail": "Batch numbers are required"}, status=status.HTTP_400_BAD_REQUEST)

        production_data = ProductionData.objects.filter(batch_no__in=batch_nos)
        serializer = ProductionDataSerializer(production_data, many=True)  # Replace with your serializer

        return Response(serializer.data, status=status.HTTP_200_OK)
    
class BatchCreateAPIView(generics.CreateAPIView):
    queryset=Batch.objects.all()
    serializer_class=BatchSerializer

class BatchListAPIView(generics.ListAPIView):
    queryset=Batch.objects.all()
    serializer_class=BatchSerializer
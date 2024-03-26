from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import *
from stock.models import *
from .serializers import *
from rest_framework import generics
from django.db.models import Sum, Max
from django.core.exceptions import ObjectDoesNotExist
from django.db import connection
from django.db import transaction

class ProductionInCreateAPIView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            print(request.data)
            net_quantity = int(request.data['quantity'])
            bags = (net_quantity + 59) // 60
            
            if(request.data['wrn']):
                stock_instance = Stock.objects.get(wrn=request.data['wrn'])
                print(stock_instance)

                production_process = ProductionProcess.objects.get(
                    name=request.data['production_process'])

                production_data = {
                    'stock': stock_instance,
                    'warehouse': stock_instance.warehouse,
                    'section': stock_instance.section,
                    'cell': stock_instance.cell,
                    'cell_from':stock_instance.cell.cell_label,
                    'coffetype_id': stock_instance.stock_in.coffetype.id,
                    'stock_quantity': stock_instance.quantity_kgs,
                    'net_quantity': net_quantity,
                    'bags': bags,
                    'processtype': stock_instance.processtype,
                    'production_process': production_process,
                    'batch_no':request.data['batchno'],
                    'sub_batch':request.data['sub_batch'],
                    'wrn':request.data['wrn'],
                    'mc_in':request.data['mc_in']
                
                }
                # if stock_instance.quantity_kgs < int(request.data['quantity']):
                #                 return Response({"error": f"Quantity of {stock_instance} is greater than expected"}, status=status.HTTP_400_BAD_REQUEST)
                # stock_instance.quantity_kgs -= int(request.data['quantity'])
                # stock_instance.bags_no -= bags

                

                # stock_instance.save()

                production_instance = ProductionData.objects.create(
                    **production_data)

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

            else:
                print("Woow")

                production_process = ProductionProcess.objects.get(
                    name=request.data['production_process'])
                cell = Cell.objects.get(cell_label=request.data['cell_from'])
                production_data = {
                    'cell': cell,
                    'coffetype_id': 1,
                    # 'stock_quantity': stock_instance.quantity_kgs,
                    'net_quantity': net_quantity,
                    'bags': bags,
                    # 'processtype': stock_instance.processtype,
                    'production_process': production_process,
                    'batch_no':request.data['batchno'],
                    'sub_batch':request.data['sub_batch'],
                    'mc_in':request.data['mc_in']
                
                }

                production_instance = ProductionData.objects.create(
                    **production_data)

                # Get the batch_no after saving
                request.data['batchno']

                serializer = ProductionDataSerializer(production_instance)
                response_data = {
                    "message": "Production data successfully created.",
                    "batch_no": request.data['batchno'],
                    "data": serializer.data,
                }

                return Response(response_data, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ProductionInApproveAPIView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            if(request.data['wrn'] != "-"):
                        production_instance=ProductionData.objects.get(id=request.data['id'])
                        stock_instance = Stock.objects.get(wrn=request.data['wrn'])
                        print(stock_instance)

                        if stock_instance.quantity_kgs < int(request.data['quantity']):
                                            return Response({"error": f"Quantity of {stock_instance} is greater than expected"}, status=status.HTTP_400_BAD_REQUEST)
                        stock_instance.quantity_kgs -= int(request.data['quantity'])
                        stock_instance.bags_no -= request.data['bags']
                        stock_instance.save()

                        production_instance.is_approved=1
                        production_instance.save()

                        response_data = {
                                "message": "Transaction is approved successfully",
                                "batch_no": request.data['batch_no'],
                            }
                        
                        return Response(response_data, status=status.HTTP_200_OK)
            else:
                production_instance=ProductionData.objects.get(id=request.data['id'])
                production_instance.is_approved=1
                production_instance.save()

                response_data = {
                        "message": "Transaction is approved successfully",
                        "batch_no": request.data['batch_no'],
                        }
                return Response(response_data, status=status.HTTP_200_OK)       
               
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



# class ProductionInCreateAPIView(APIView):
#     def post(self, request, *args, **kwargs):
#         try:
#             print(request.data)
#             net_quantity = int(request.data['quantity'])
#             bags = (net_quantity + 59) // 60
            
#             if(request.data['wrn']):
#                 stock_instance = Stock.objects.get(wrn=request.data['wrn'])
#                 print(stock_instance)

#                 production_process = ProductionProcess.objects.get(name=request.data['production_process'])

#                 production_data = {
#                     'stock': stock_instance,
#                     'warehouse': stock_instance.warehouse,
#                     'section': stock_instance.section,
#                     'cell': stock_instance.cell,
#                     'coffetype_id': stock_instance.stock_in.coffetype.id,
#                     'stock_quantity': stock_instance.quantity_kgs,
#                     'net_quantity': net_quantity,  
#                     'bags': bags,
#                     'processtype': stock_instance.processtype,
#                     'production_process': production_process,
#                     'batch_no':request.data['batchno'],
#                     'sub_batch':request.data['sub_batch'],
#                     'wrn':request.data['wrn']
                
#                 }
#                 if stock_instance.quantity_kgs < int(request.data['quantity']):
#                                 return Response({"error": f"Quantity of {stock_instance} is greater than expected"}, status=status.HTTP_400_BAD_REQUEST)
#                 stock_instance.quantity_kgs -= int(request.data['quantity'])
#                 stock_instance.bags_no -= bags

                

#                 stock_instance.save()

#                 production_instance = ProductionData.objects.create(**production_data)

#                 # Get the batch_no after saving
#                 request.data['batchno']

#                 # Serialize and return the created ProductionIn instance along with batch_no
#                 serializer = ProductionDataSerializer(production_instance)
#                 response_data = {
#                     "message": "Production data successfully created.",
#                     "batch_no": request.data['batchno'],
#                     "data": serializer.data,
#                 }
                
#                 return Response(response_data, status=status.HTTP_201_CREATED)
            
#             else:
#                 print("Woow")

#                 production_process = ProductionProcess.objects.get(name=request.data['production_process'])
#                 cell =Cell.objects.get(cell_label=request.data['cell_from'])
#                 production_data = {
#                     'cell': cell,
#                     'coffetype_id': 1,
#                     # 'stock_quantity': stock_instance.quantity_kgs,
#                     'net_quantity': net_quantity,  
#                     'bags': bags,
#                     # 'processtype': stock_instance.processtype,
#                     'production_process': production_process,
#                     'batch_no':request.data['batchno'],
#                     'sub_batch':request.data['sub_batch'],
#                     # 'wrn':request.data['wrn']
                
#                 }

#                 production_instance = ProductionData.objects.create(**production_data)

#                 # Get the batch_no after saving
#                 request.data['batchno']

#                 serializer = ProductionDataSerializer(production_instance)
#                 response_data = {
#                     "message": "Production data successfully created.",
#                     "batch_no": request.data['batchno'],
#                     "data": serializer.data,
#                 }
                
#                 return Response(response_data, status=status.HTTP_201_CREATED)

#         except Exception as e:
#             return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



class ProductionOutCreateAPIView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            with transaction.atomic():
                print(request.data)
                net_quantity = int(request.data['output_quantity'])
                bags = (net_quantity + 59) // 60
                
                try:
                    batch_instance = ProductionData.objects.filter(sub_batch=request.data['batch_no']).first()
                    print(batch_instance)
                except ProductionData.DoesNotExist:
                    batch_instance = None

                production_process = ProductionProcess.objects.get(id=int(request.data['production_process']))

                production_data = {
                     'warehouse': request.data['warehouse'],
                     'output_quantity': request.data['output_quantity'],
                     'output_quality': request.data['output_quality'],
                     'output_bags': bags,
                     'coffetype_id': batch_instance.coffetype_id if batch_instance else None,
                     'processtype': batch_instance.processtype if batch_instance else None,
                     'batch_no': request.data['batch_no'],
                     'lot_no': request.data['lot_no'],
                     'production_process': production_process,
                    #  'mc_out':0
                }

                production_instance = ProductionOutput.objects.create(**production_data)
                serializer = ProductionOutputSerializer(production_instance)
                response_data = {
                    "message": "Successfully added new Item.",
                    "data": serializer.data,
                }
                string=production_instance.warehouse
                Warehouse_id=int(string[0])

                warehouse=Warehouse.objects.get(id=Warehouse_id)
                cell=Cell.objects.get(cell_label=production_instance.warehouse)
                coffee_type=CoffeeType.objects.get(name="Green")
                print(production_instance.output_quality)
                process_type=ProcessType.objects.get(type_name=production_instance.output_quality)

                # Now, insert data into the Stock model
                stock_data = {
                    'stock_in': None,
                    'production_out': production_instance.id,
                    'warehouse': warehouse,
                    'cell':cell,
                    'coffetype': coffee_type,
                    'processtype': process_type,
                    'wrn': '', 
                    'grn': '',  
                    'quantity_kgs': production_instance.output_quantity,
                    'bags_no': production_instance.output_bags,
                    'moisture_content': 0,  
                    'cstatus': '',  
                }

                Stock.objects.create(**stock_data)

                return Response(response_data, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



# class ProductionOutCreateAPIView(APIView):
#     def post(self, request, *args, **kwargs):
#         try:
#             print(request.data)
#             net_quantity = int(request.data['output_quantity'])
#             bags = (net_quantity + 59) // 60
            
#             try:
#                 batch_instance = ProductionData.objects.filter(sub_batch=request.data['batch_no']).first()
#                 print(batch_instance)
#             except ProductionData.DoesNotExist:
#                 batch_instance = None

#             production_process = ProductionProcess.objects.get(id=int(request.data['production_process']))

#             production_data = {
#                  'warehouse':request.data['warehouse'],
#                  'output_quantity':request.data['output_quantity'],
#                  'output_quality':request.data['output_quality'],
#                  'output_bags':bags,
#                  'coffetype_id':batch_instance.coffetype_id,
#                  'processtype':batch_instance.processtype,
#                  'batch_no':request.data['batch_no'],
#                  'lot_no':request.data['lot_no'],
#                  'production_process':production_process
#             }


#             production_instance = ProductionOutput.objects.create(**production_data)
#             serializer = ProductionOutputSerializer(production_instance)
#             response_data = {
#                 "message": "Successfully added new Item.",
#                 "data": serializer.data,
#             }
            
#             return Response(response_data, status=status.HTTP_201_CREATED)

#         except Exception as e:
#             return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR) 

class ProductionCompleteAPIView(APIView):
    def post(self, request, *args, **kwargs):
            try:
                ProductionData.objects.filter(sub_batch=request.data['batch_no']).update(
                    status=1,
                    mc_out=request.data['mc_out'],
                    completion_date=request.data['completion_date']
                )

                response_data = {
                    "message": "Successfully Completed Batch Processing.",
                    # "data": serializer.data,
                }

                return Response(response_data, status=status.HTTP_200_OK)

            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ProductionOutputBatchDetails(generics.ListAPIView):
    serializer_class = ProductionOutputSerializer

    def get(self, request, *args, **kwargs):
        batch_no = request.query_params.get('batch_no')
        production_process_=request.query_params.get('production_process_id')
        print(batch_no)

        if not batch_no:
            return Response({"detail": "Batch numbers are required"}, status=status.HTTP_400_BAD_REQUEST)

        production_output = ProductionOutput.objects.filter(batch_no=batch_no,production_process__id=production_process_)
        serializer = ProductionOutputSerializer(production_output, many=True) 

        return Response(serializer.data, status=status.HTTP_200_OK)   
    

# class ProductionOutputsListView(APIView):
#     def get(self, request):
#         with connection.cursor() as cursor:
#             cursor.execute("""
#                 SELECT
#                     o.id,
#                     o.warehouse,
#                     o.output_quantity,
#                     o.output_bags,
#                     o.coffetype_id,
#                     o.batch_no,
#                     o.created_at,
#                     o.processtype_id,
#                     pp.name,
#                     o.production_process_id,
#                     o.output_quality,
#                     o.lot_no,
#                     i.id,
#                     i.stock_quantity,
#                     i.net_quantity,
#                     i.bags,
#                     i.status,
#                     i.coffetype_id,
#                     i.created_at,
#                     i.cell_id,
#                     i.processtype_id,
#                     i.section_id,
#                     i.stock_id,
#                     i.warehouse_id,
#                     i.production_process_id,
#                     i.batch_no,
#                     i.wrn,
#                     i.cell_from,
#                     i.created_by,
#                     i.sub_batch,
#                     i.completion_date
#                 FROM
#                     production_output o  
#                 JOIN
#                     productiondata i ON i.sub_batch = o.batch_no
#                 JOIN
#                     production_process pp ON o.production_process_id = pp.id;
#             """)
#             rows = cursor.fetchall()

#         data = [
#             {
#                 "id": row[0],
#                 "warehouse": row[1],
#                 "output_quantity": row[2],
#                 "output_bags": row[3],
#                 "coffetype_id": row[4],
#                 "batch_no": row[5],
#                 "created_at": row[6],
#                 "processtype_id": row[7],
#                 "production_process_name": row[8],
#                 "production_process_id": row[9],
#                 "output_quality": row[10],
#                 "lot_no": row[11],
#                 "productiondata_id": row[12],
#                 "stock_quantity": row[13],
#                 "net_quantity": row[14],
#                 "bags": row[15],
#                 "status": row[16],
#                 "coffetype_id": row[17],
#                 "created_at": row[18],
#                 "cell_id": row[19],
#                 "processtype_id": row[20],
#                 "section_id": row[21],
#                 "stock_id": row[22],
#                 "warehouse_id": row[23],
#                 "production_process_id": row[24],
#                 "batch_no": row[25],
#                 "wrn": row[26],
#                 "cell_from": row[27],
#                 "created_by": row[28],
#                 "sub_batch": row[29],
#                 "completion_date": row[30]
#             }
#             for row in rows
#         ]

#         return Response(data, status=status.HTTP_200_OK)
    

class ProductionOutputsListView(APIView):
    def get(self, request):
     with connection.cursor() as cursor:
        cursor.execute("""
            SELECT
                o.batch_no,
                SUM(o.output_quantity) AS output_quantity,
                SUM(o.output_bags) AS total_output_bags,
                pp.name,
                i.net_quantity,
                i.bags,
                i.cell_id,
                i.processtype_id,
                i.section_id,
                i.production_process_id,
                i.batch_no AS productiondata_batch_no,
                i.sub_batch,
                i.completion_date,
                i.status,
                i.mc_in,
                i.mc_out,
                GROUP_CONCAT(CAST(o.lot_no AS CHAR) ORDER BY o.lot_no) AS lot_nos, 
                GROUP_CONCAT(CAST(o.output_quality AS CHAR) ORDER BY o.output_quality) AS output_qualities
            FROM
                production_output o
            JOIN
                productiondata i ON i.sub_batch = o.batch_no AND i.production_process_id = o.production_process_id
            JOIN
                production_process pp ON o.production_process_id = pp.id
            GROUP BY
                o.batch_no,
                i.net_quantity,
                i.bags,
                i.cell_id,
                i.processtype_id,
                i.section_id,
                i.production_process_id,
                i.batch_no,
                i.sub_batch,
                i.completion_date,
                pp.name,
                i.status,
                i.mc_in,
                i.mc_out;
        """)
        rows = cursor.fetchall()

        data = [
                {
                    "batch_no": row[0],
                    "output_quantity": row[1],
                    "output_bags": row[2],
                    "production_process_name": row[3],
                    "net_quantity": row[4],
                    "bags": row[5],
                    "cell_id": row[6],
                    "processtype_id": row[7],
                    "section_id": row[8],
                    "production_process_id": row[9],
                    "productiondata_batch_no": row[10],
                    "sub_batch": row[11],
                    "completion_date": row[12],
                    "status": row[13],
                    "mc_in": row[14],
                    "mc_out": row[15],
                    "lot_no": row[16],
                    "output_qualities": row[17]
                }
                for row in rows
            ]

        return Response(data, status=status.HTTP_200_OK)



class MaxBatchNoAPIView(APIView):
    def get(self, request, *args, **kwargs):
        try:
            # Find the maximum batch_no from ProductionData
            max_batch_no = ProductionData.objects.aggregate(Max('batch_no'))[
                'batch_no__max']

            if max_batch_no is not None:
                return Response({"max_batch_no": max_batch_no}, status=status.HTTP_200_OK)
            else:
                # Set default batch_no if no production data found
                default_batch_no = "00000"
                return Response({"max_batch_no": default_batch_no}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ProductionBatchDetails(generics.ListAPIView):
    serializer_class = ProductionDataSerializer

    def get(self, request, *args, **kwargs):
        batch_no = request.query_params.get('batch_no')
        production_process_=request.query_params.get('production_process_id')
        print(batch_no)

        if not batch_no:
            return Response({"detail": "Batch numbers are required"}, status=status.HTTP_400_BAD_REQUEST)

        production_data = ProductionData.objects.filter(sub_batch=batch_no,production_process__id=production_process_)
        serializer = ProductionDataSerializer(production_data, many=True) 

        return Response(serializer.data, status=status.HTTP_200_OK)

class ProductionBatchDetailsAfterCompletion(generics.ListAPIView):
    serializer_class=ProductionDataSerializer

    def get(self, request, *args, **kwargs):
        batch_no = request.query_params.get('batch_no')
        production_process_=request.query_params.get('production_process_id')
        print(batch_no)

        if not batch_no:
            return Response({"detail": "Batch numbers are required"}, status=status.HTTP_400_BAD_REQUEST)

        production_data = ProductionData.objects.filter(sub_batch=batch_no,production_process__id=production_process_).exclude(status=0)
        serializer = ProductionDataSerializer(production_data, many=True) 

        return Response(serializer.data, status=status.HTTP_200_OK)


class ProductionApprovalAPIView(generics.ListAPIView):
    serializer_class=ProductionDataSerializer

    def get(self, request, *args, **kwargs):
        is_approved = 0
        print(is_approved)
        production_data = ProductionData.objects.filter(is_approved=is_approved)
        serializer = ProductionDataSerializer(production_data, many=True) 

        return Response(serializer.data, status=status.HTTP_200_OK)


class ProductionDataListView(generics.ListAPIView):
    serializer_class = ProductionDataGroupedSerializer

    def get_queryset(self):
        queryset = (
            ProductionData.objects
            .values('production_process', 'production_process__name', 'batch_no') 
            .annotate(
                total_stock_quantity=Sum('stock_quantity'),
                total_net_quantity=Sum('net_quantity'),
                total_bags=Sum('bags'),
            )
            .order_by('-batch_no') 
        )

        queryset = queryset.exclude(
            total_stock_quantity=0,
            total_net_quantity=0,
            total_bags=0
        ).exclude(status=1).exclude(is_approved=0)

        return queryset



class ExportDataListView(generics.ListAPIView):
    # queryset = ProductionOutput.objects.exclude(lot_no__isnull=True)
    queryset = ProductionOutput.objects.exclude(lot_no="-").order_by("-id")
    serializer_class=ProductionOutputSerializer

class AllProductionDataListView(generics.ListAPIView):
    queryset = ProductionData.objects.all()
    serializer_class = ProductionDataSerializer


class ProductionDataByProcess(generics.ListAPIView):
    serializer_class = ProductionDataSerializer
    lookup_url_kwarg = 'processfrom'

    def get_queryset(self):
        process_from = self.kwargs.get(self.lookup_url_kwarg)
        queryset = ProductionData.objects.filter(
            production_process__id=process_from)
        return queryset


class ProductionProcessCreateAPIView(generics.CreateAPIView):
    queryset = ProductionProcess.objects.all()
    serializer_class = ProductionProcessSerializer


class ProductionProcessListView(generics.ListAPIView):
    queryset = ProductionProcess.objects.all()
    serializer_class = ProductionProcessSerializer

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

            production_instance = ProductionData.objects.get(
                batch_no=request.data['batch_no'], production_process=request.data['production_process_from'])
            production_process_from = ProductionProcess.objects.get(
                id=request.data['production_process_from'])
            production_process_to = ProductionProcess.objects.get(
                id=request.data['production_process_to'])

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
                coffetype_id=production_instance.coffetype_id,
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

        production_data = ProductionData.objects.filter(batch_no__in=batch_nos).exclude(status=1).exclude(is_approved=0)
    
        serializer = ProductionDataSerializer(production_data, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


class BatchCreateAPIView(generics.CreateAPIView):
    queryset = Batch.objects.all()
    serializer_class = BatchSerializer


class BatchListAPIView(generics.ListAPIView):
    queryset = Batch.objects.all()
    serializer_class = BatchSerializer


class LotCreateAPIView(generics.CreateAPIView):
    queryset = Lots.objects.all()
    serializer_class = LotsSerializer


class LotsListAPIView(generics.ListAPIView):
    queryset = Lots.objects.all()
    serializer_class = LotsSerializer
<<<<<<< HEAD


class ProductionRequestCreateAPIView(generics.CreateAPIView):
    queryset = ProductionRequest.objects.all()
    serializer_class = ProductionRequestSerializer


class ProductionRequestListAPIView(generics.ListAPIView):
    queryset = ProductionRequest.objects.all()
    serializer_class = ProductionRequestSerializer


class SourcingProcessCreateAPIView(generics.CreateAPIView):
    queryset = SourcingProcess.objects.all()
    serializer_class = SourcingProcessSerializer


class SourcingProcessListAPIView(generics.ListAPIView):
    queryset = SourcingProcess.objects.all()
    serializer_class = SourcingProcessSerializer
=======
>>>>>>> 7c60271 (changes)

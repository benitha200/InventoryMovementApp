from rest_framework.response import Response
from rest_framework.views import APIView
from stock.serializer import StockInListSerializer
from stock.models import StockIn
from django.db.models import Q
from datetime import datetime
from rest_framework import status
from django.db import connection

# Create your views here.
from rest_framework.views import APIView

# def get_bor_report(request):
#     try:
#         with connection.cursor() as cursor:
#             cursor.execute("""
#                 SELECT
#                     o.id,
#                     o.warehouse,
#                     o.output_quantity,
#                     o.output_bags,
#                     o.coffetype_id,
#                     o.batch_no,
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

#         # data = [
#         #     {
#         #         "id": row[0],
#         #         "warehouse": row[1],
#         #         "output_quantity": row[2],
#         #         "output_bags": row[3],
#         #         "coffetype_id": row[4],
#         #         "batch_no": row[5],
#         #         # "created_at": row[6],
#         #         "processtype_id": row[7],
#         #         "production_process_name": row[8],
#         #         "production_process_id": row[9],
#         #         "output_quality": row[10],
#         #         "lot_no": row[11],
#         #         "productiondata_id": row[12],
#         #         "stock_quantity": row[13],
#         #         "net_quantity": row[14],
#         #         "bags": row[15],
#         #         "status": row[16],
#         #         "coffetype_id": row[17],
#         #         "created_at": row[18],
#         #         "cell_id": row[19],
#         #         "processtype_id": row[20],
#         #         "section_id": row[21],
#         #         "stock_id": row[22],
#         #         "warehouse_id": row[23],
#         #         "production_process_id": row[24],
#         #         "batch_no": row[25],
#         #         "wrn": row[26],
#         #         "cell_from": row[27],
#         #         "created_by": row[28],
#         #         "sub_batch": row[29],
#         #         "completion_date": row[30]
#         #     }
#         #     for row in rows
#         # ]
#             data = [
#                 {
#                     "id": row[0],
#                     "warehouse": row[1],
#                     "output_quantity": row[2],
#                     "output_bags": row[3],
#                     "coffetype_id": row[4],
#                     "batch_no": row[5],
#                     "processtype_id": row[6],
#                     "production_process_name": row[7],
#                     "production_process_id": row[8],
#                     "output_quality": row[9],
#                     "lot_no": row[10],
#                     "productiondata_id": row[11],
#                     "stock_quantity": row[12],
#                     "net_quantity": row[13],
#                     "bags": row[14],
#                     "status": row[15],
#                     "coffetype_id": row[16],
#                     "created_at": row[17],
#                     "cell_id": row[18],
#                     "processtype_id": row[19],
#                     "section_id": row[20],
#                     "stock_id": row[21],
#                     "warehouse_id": row[22],
#                     "production_process_id": row[23],
#                     "batch_no": row[24],
#                     "wrn": row[25],
#                     "cell_from": row[26],
#                     "created_by": row[27],
#                     "sub_batch": row[28],
#                     "completion_date": row[29]
#                 }
#                 for row in rows
#             ]


#         return Response(data, status=status.HTTP_200_OK)
#     except Exception as e:
#         return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

def get_bor_report(request):
    try:
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
    except:
        return Response({"error":""}, status=status.HTTP_200_OK)


class GenerateReportAPIView(APIView):
    def post(self, request, *args, **kwargs):

        if(request.data.get('report')=='SIR'):
            try:
                print(request.data)
                start_date = request.data.get('start_date')
                end_date = request.data.get('end_date')

                # Validate start_date and end_date
                if not start_date or not end_date:
                    return Response({"error": "start_date and end_date are required."}, status=400)

                queryset = StockIn.objects.filter(
                    delivered_date__gte=start_date,
                    delivered_date__lte=end_date
                ).order_by("-id")


                # Serialize the queryset
                serializer = StockInListSerializer(queryset, many=True)

                return Response(serializer.data)

            except Exception as e:
                return Response({"error": str(e)}, status=500)
        elif request.data.get('report') == 'BOR':
            return get_bor_report(request)
        else:
            return Response({"error": "Invalid report type."}, status=400)
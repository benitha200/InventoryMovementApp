from rest_framework.response import Response
from rest_framework.views import APIView
from stock.serializer import StockInListSerializer
from stock.models import StockIn
from django.db.models import Q
from datetime import datetime

# Create your views here.
from rest_framework.views import APIView

class GenerateReportAPIView(APIView):
    def post(self, request, *args, **kwargs):
        try:
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

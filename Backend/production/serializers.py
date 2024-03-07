# serializers.py

from rest_framework import serializers
from .models import *
from stock.serializer import *

# class ProductionInSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = ProductionIn
#         fields = '__all__'

class ProductionInputSerializer(serializers.ModelSerializer):
    class Meta:
        model=ProductionInput
        fields='__all__'

class ProductionProcessSerializer(serializers.ModelSerializer):
    class Meta:
        model=ProductionProcess
        fields='__all__'

# class ProductionDataSerializer(serializers.ModelSerializer):
#     class Meta:
#         model=ProductionData
#         fields='__all__'

# class ProductionDataSerializer(serializers.ModelSerializer):
#     # stock = serializers.SerializerMethodField()
#     # warehouse = serializers.CharField(source='warehouse.name')
#     # section = serializers.CharField(source='section.name')
#     # cell = serializers.CharField(source='cell.name')
#     # processtype = serializers.CharField(source='processtype.type_name')
#     # production_process = serializers.CharField(source='production_process.name')

#     class Meta:
#         model = ProductionData
#         fields = '__all__'
        
class ProductionLogsSerializer(serializers.ModelSerializer):
    class Meta:
        model=ProductionLogs
        fields=['production','warehouse','section','cell','stock_quantity','net_quantity','bags','production_process_from','production_process_to','batch_no']
        
class ProductionDataGroupedSerializer(serializers.Serializer):
    production_process = serializers.CharField()
    production_process__name = serializers.CharField()
    total_stock_quantity = serializers.IntegerField()
    total_net_quantity = serializers.IntegerField()
    total_bags = serializers.IntegerField()
    batch_no=serializers.CharField()

class ProductionDataSerializer(serializers.ModelSerializer):
    production_process=ProductionProcessSerializer()
    class Meta:
        model = ProductionData
        fields = ['id','stock_quantity','net_quantity','bags','status','coffetype_id','batch_no','created_at','stock','warehouse','section','cell','processtype','production_process']

class ProductionLogsSerializer(serializers.ModelSerializer):
    production = ProductionDataSerializer()
    warehouse = WarehouseSerializer()
    section = SectionSerializer()
    cell = CellSerializer()
    production_process_from = ProductionProcessSerializer()
    production_process_to = ProductionProcessSerializer()

    class Meta:
        model = ProductionLogs
        fields = '__all__'

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
        model = ProductionInput
        fields = '__all__'


class ProductionProcessSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductionProcess
        fields = '__all__'


class BatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Batch
        fields = '__all__'


class LotsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lots
        fields = '__all__'

# class ProductionLogsSerializer(serializers.ModelSerializer):
#     class Meta:
#         model=ProductionLogs
#         fields=['production','warehouse','section','cell','stock_quantity','net_quantity','bags','production_process_from','production_process_to','batch_no']


class ProductionDataGroupedSerializer(serializers.Serializer):
    production_process = serializers.CharField()
    production_process__name = serializers.CharField()
    total_stock_quantity = serializers.IntegerField()
    total_net_quantity = serializers.IntegerField()
    total_bags = serializers.IntegerField()
    batch_no = serializers.CharField()


class ProductionDataSerializer(serializers.ModelSerializer):
    production_process = ProductionProcessSerializer()
    cell = CellSerializer()
    # cell=CellSerializer()

    class Meta:
        model = ProductionData
        fields = ['id', 'stock_quantity', 'net_quantity', 'bags', 'status', 'coffetype_id', 'batch_no', 'created_at', 'stock', 'warehouse', 'section',
                  'cell', 'processtype', 'production_process', 'wrn', 'sub_batch', 'cell_from']

    def __init__(self, *args, **kwargs):
        super(ProductionDataSerializer, self).__init__(*args, **kwargs)
        self.fields['wrn'].required = False


class ProductionOutputSerializer(serializers.ModelSerializer):
    production_process = ProductionProcessSerializer()

    class Meta:
        model = ProductionOutput
        fields = ['id', 'output_quantity', 'output_bags', 'batch_no', 'created_at',
                  'warehouse', 'processtype', 'production_process', 'output_quality', 'lot_no']


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


class ProductionRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductionRequest
        fields = '__all__'


class SourcingProcessSerializer(serializers.ModelSerializer):
    class Meta:
        model = SourcingProcess
        fields = ['id', 'name']

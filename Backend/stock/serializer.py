from rest_framework import serializers
from .models import *
from coffee.serializer import *

# class CellSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Cell
#         fields = '__all__'

class CellSerializer(serializers.ModelSerializer):
    section_name = serializers.ReadOnlyField(source='section.name')
    warehouse_name = serializers.ReadOnlyField(source='section.warehouse.name')

    class Meta:
        model = Cell
        fields = '__all__'


class SectionSerializer(serializers.ModelSerializer):
    cells = CellSerializer(many=True, read_only=True)

    class Meta:
        model = Section
        fields = '__all__'


class WarehouseSerializer(serializers.ModelSerializer):
    sections = SectionSerializer(many=True, read_only=True)

    class Meta:
        model = Warehouse
        fields = '__all__'

class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model= Cell
        fields= "__all__"

class StockInSerializer(serializers.ModelSerializer):
    class Meta:
        model=StockIn
        fields = ['warehouse', 'section', 'cell', 'coffetype', 'processtype', 'supplier', 'bags', 'quantity_kgs','moisture_content','delivered_date']
        
class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model=Stock
        fields="__all__"

class StockListSerializer(serializers.Serializer):
    warehouse__name = serializers.CharField()
    coffetype__name = serializers.CharField()
    processtype__type_name = serializers.CharField()
    total_quantity_kgs = serializers.IntegerField()
    total_bags_no = serializers.IntegerField()

    def create(self, validated_data):
        # This method is not required for a read-only serializer, but you can implement it if needed.
        pass

class StockInListSerializer(serializers.ModelSerializer):
    warehouse = serializers.SerializerMethodField()
    section = serializers.SerializerMethodField()
    cell = serializers.SerializerMethodField()
    coffetype = serializers.SerializerMethodField()
    processtype = serializers.SerializerMethodField()
    supplier = serializers.SerializerMethodField()

    class Meta:
        model = StockIn
        fields = '__all__'

    def get_warehouse(self, obj):
        return obj.warehouse.name

    def get_section(self, obj):
        return obj.section.name

    def get_cell(self, obj):
        return obj.cell.cell_label

    def get_coffetype(self, obj):
        return obj.coffetype.name

    def get_processtype(self, obj):
        return obj.processtype.type_name

    def get_supplier(self, obj):
        supplier = Supplier.objects.get(id=obj.supplier)
        return supplier.name  # Assuming Supplier model has a name field
    
class StockDataSerializer(serializers.ModelSerializer):
    supplier_name = serializers.SerializerMethodField()
    stock_in = StockInSerializer()
    warehouse = WarehouseSerializer()
    section = SectionSerializer()
    cell = CellSerializer()
    coffetype = CoffeeTypeSerializer()
    processtype = ProcessTypeSerializer()

    class Meta:
        model = Stock
        fields = ['id', 'stock_in', 'warehouse', 'section', 'cell', 'coffetype', 'processtype', 'wrn', 'supplier_name','quantity_kgs', 'bags_no', 'created_at', 'moved_to']
    

    def get_supplier_name(self, obj):
        # Fetch supplier name based on the supplier_id
        supplier_id = obj.stock_in.supplier if obj.stock_in else None
        supplier = Supplier.objects.get(id=supplier_id) if supplier_id else None
        return supplier.name if supplier else None
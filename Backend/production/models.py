from django.db import models
from stock.models import *
from django.db.models.signals import pre_save
from django.dispatch import receiver

# Create your models here.

# class ProductionIn(models.Model):
#     stock=models.ForeignKey(Stock,on_delete=models.CASCADE)
#     warehouse=models.ForeignKey(Warehouse,on_delete=models.CASCADE)
#     section=models.ForeignKey(Section,on_delete=models.CASCADE)
#     cell=models.ForeignKey(Cell,on_delete=models.CASCADE)
#     stock_quantity=models.IntegerField()
#     net_quantity=models.IntegerField()
#     bags=models.IntegerField()


#     class Meta:
#         db_table="production_in"
    


class ProductionInput(models.Model):
    stock = models.ForeignKey(Stock, on_delete=models.CASCADE)
    warehouse = models.ForeignKey(Warehouse, on_delete=models.CASCADE)
    section = models.ForeignKey(Section, on_delete=models.CASCADE)
    cell = models.ForeignKey(Cell, on_delete=models.CASCADE)
    # supplier_id = models.IntegerField()
    stock_quantity = models.IntegerField()
    production_quantity = models.IntegerField()
    bags = models.IntegerField()
    processtype = models.ForeignKey(ProcessType, on_delete=models.CASCADE)
    created_at = models.DateField(auto_now_add=True)

    class Meta:
        db_table = "production_input"

# class Production(models.Model):
#     stock=models.ForeignKey(Stock,on_delete=models.CASCADE)
#     warehouse=models.ForeignKey(Warehouse,on_delete=models.CASCADE)
#     section=models.ForeignKey(Section,on_delete=models.CASCADE)
#     cell=models.ForeignKey(Cell,on_delete=models.CASCADE)
#     stock_quantity=models.IntegerField()
#     net_quantity=models.IntegerField()
#     bags=models.IntegerField()
#     status=models.IntegerField(default=0)
#     coffetype_id=models.IntegerField()
#     processtype=models.ForeignKey(ProcessType,on_delete=models.CASCADE)
#     supplier_id=models.IntegerField()
#     created_at = models.DateField(auto_now_add=True)


#     class Meta:
#         db_table="production"

class ProductionProcess(models.Model):
    name=models.CharField(max_length=200)

    class Meta:
        db_table="production_process"

class ProductionData(models.Model):
    stock=models.ForeignKey(Stock,on_delete=models.CASCADE)
    warehouse=models.ForeignKey(Warehouse,on_delete=models.CASCADE)
    section=models.ForeignKey(Section,on_delete=models.CASCADE)
    cell=models.ForeignKey(Cell,on_delete=models.CASCADE)
    stock_quantity=models.IntegerField()
    net_quantity=models.IntegerField()
    bags=models.IntegerField()
    status=models.IntegerField(default=0)
    coffetype_id=models.IntegerField()
    processtype=models.ForeignKey(ProcessType,on_delete=models.CASCADE)
    batch_no = models.CharField(max_length=50, unique=False, editable=False)
    production_process=models.ForeignKey(ProductionProcess,on_delete=models.CASCADE)
    wrn=models.CharField(max_length=200)
    created_at = models.DateField(auto_now_add=True)


    class Meta:
        db_table="productiondata"

class ProductionOutput(models.Model):
    warehouse=models.CharField(max_length=200)
    output_quantity=models.IntegerField()
    output_quality=models.CharField(max_length=200)
    output_bags=models.IntegerField()
    coffetype_id=models.IntegerField()
    processtype=models.ForeignKey(ProcessType,on_delete=models.CASCADE)
    batch_no = models.CharField(max_length=50, unique=False, editable=False)
    production_process=models.ForeignKey(ProductionProcess,on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)



    class Meta:
        db_table="production_output"






class ProductionLogs(models.Model):
    production=models.ForeignKey(ProductionData,on_delete=models.CASCADE)
    warehouse=models.ForeignKey(Warehouse,on_delete=models.CASCADE)
    section=models.ForeignKey(Section,on_delete=models.CASCADE)
    cell=models.ForeignKey(Cell,on_delete=models.CASCADE)
    stock_quantity=models.IntegerField()
    net_quantity=models.IntegerField()
    moved_quantity=models.IntegerField()
    bags=models.IntegerField()
    status=models.IntegerField(default=0)
    coffetype_id=models.IntegerField()
    batch_no = models.CharField(max_length=5, unique=False, editable=False)
    production_process_from=models.ForeignKey(ProductionProcess,on_delete=models.CASCADE, related_name="production_process_from")
    production_process_to=models.ForeignKey(ProductionProcess,on_delete=models.CASCADE,related_name="production_process_to")
    created_at = models.DateField(auto_now_add=True)


    class Meta:
        db_table="productionlogs"

class Batch(models.Model):
    batch_no=models.CharField(max_length=200)
    quality=models.CharField(max_length=200)
    created_at = models.DateField(auto_now_add=True)

    class Meta:
        db_table="batches"
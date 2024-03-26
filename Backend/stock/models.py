from django.db import models
# from coffee.models import CoffeeGrades
from coffee.models import CoffeeType,ProcessType
from supplier.models import Supplier
# from production.models import ProductionOutput


# Create your models here.

class Warehouse(models.Model):
    warehouse_no=models.IntegerField()
    name=models.CharField(max_length=100)

    class Meta:
        db_table="warehouse"

    def __str__(self) -> str:
        return self.name
    
class Section(models.Model):
    warehouse=models.ForeignKey(Warehouse,on_delete=models.CASCADE,related_name='sections')
    name=models.CharField(max_length=200)

    class Meta:
        db_table="section"

    def __str__(self) -> str:
        return self.name

# class Cell(models.Model):
#     warehouse=models.ForeignKey(Warehouse,on_delete=models.CASCADE,related_name='cells')
#     section= models.ForeignKey(Section, on_delete=models.CASCADE)
#     cell_no=models.CharField(max_length=200)
#     cell_label=models.CharField(max_length=100)

#     class Meta:
#         db_table= "cell"
#     def __str__(self) -> str:
#         return self.name

class Cell(models.Model):
    warehouse = models.ForeignKey(Warehouse, on_delete=models.CASCADE, related_name='cells')
    section = models.ForeignKey(Section, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    cell_label = models.CharField(max_length=100, blank=True)  # Allow blank initially

    class Meta:
        db_table = "cell"

    def __str__(self) -> str:
        return self.name

    def save(self, *args, **kwargs):
        warehouse_no = str(self.warehouse.warehouse_no) if self.warehouse else ''
        section_name = str(self.section) if self.section else ''
        cell_name = str(self.name) if self.name else ''
        
        # Combine warehouse_no, section_name, and cell_name to create cell_label
        self.cell_label = warehouse_no + section_name + cell_name

        super(Cell, self).save(*args, **kwargs)

    
# class Supplier(models.Model):
#       cell= models.ForeignKey(Section, on_delete=models.CASCADE)
#       name=models.CharField(max_length=200)

#       class Meta:
#           db_table= "supplier"
    

class StockIn(models.Model):
    warehouse = models.ForeignKey(Warehouse, on_delete=models.CASCADE)
    section = models.ForeignKey(Section, on_delete=models.CASCADE, blank=True, null=True)
    cell = models.ForeignKey(Cell, on_delete=models.CASCADE)
    coffetype = models.ForeignKey(CoffeeType, on_delete=models.CASCADE)
    processtype = models.ForeignKey(ProcessType, on_delete=models.CASCADE)
    # supplier=models.ForeignKey(Supplier,on_deslete=models.CASCADE)
    supplier = models.IntegerField()
    wrn = models.CharField(max_length=200, default='')
    grn = models.CharField(max_length=200, default='')
    cstatus = models.CharField(max_length=200,null=True)
    bags = models.IntegerField()
    quantity_kgs = models.IntegerField()
    created_at = models.DateField(auto_now_add=True)
    moisture_content = models.IntegerField()
    delivered_date = models.DateField()

    class Meta:
        db_table = "stock_in"

    def save(self, *args, **kwargs):
        if not self.pk:
            latest_stock = StockIn.objects.order_by('-wrn').first()
            latest_stock_bt = StockIn.objects.order_by('-grn').first()

            if latest_stock and self.coffetype.id == 2:
                if latest_stock.wrn:
                    try:
                        wrn_prefix, wrn_number_part = latest_stock.wrn.split('-', 1)
                        if wrn_number_part[:4].isdigit():
                            current_wrn_number = int(wrn_number_part[:4])
                        else:
                            current_wrn_number = 0
                    except (ValueError, IndexError):
                        current_wrn_number = 0
                    self.wrn = f"WRN-{str(current_wrn_number + 1).zfill(4)}-{self.cstatus}"
                else:
                    self.wrn = f"WRN-0001-{self.cstatus}"

            elif latest_stock_bt and self.coffetype.id == 1:
                if latest_stock_bt.grn:
                    try:
                        grn_prefix, grn_number_part = latest_stock_bt.grn.split('-', 1)
                        if grn_number_part[:4].isdigit():
                            current_grn_number = int(grn_number_part[:4])
                        else:
                            current_grn_number = 0
                    except (ValueError, IndexError):
                        current_grn_number = 0
                    if self.processtype.type_name.startswith("F"):
                        self.grn = f"BT-{str(current_grn_number + 1).zfill(4)}-CF"
                    else:
                        self.grn = f"BT-{str(current_grn_number + 1).zfill(4)}-SW"
                else:
                    if self.processtype.type_name.startswith("F"):
                        self.grn = f"BT-0001-CF"
                    else:
                        self.grn = f"BT-0001-SW"
            else:
                pass

        super().save(*args, **kwargs)

    # def save(self, *args, **kwargs):
    #     if not self.pk:
    #         latest_stock = StockIn.objects.order_by('-wrn').first()
    #         latest_stock_bt = StockIn.objects.order_by('-grn').first()

    #         if latest_stock and self.coffetype.id == 2:
    #             if latest_stock.wrn:
    #                 current_wrn_number = int(latest_stock.wrn.split('-')[1])
    #                 self.wrn = f"WRN-{str(current_wrn_number + 1).zfill(4)}-{self.cstatus}"
    #             else:
    #                 self.wrn = f"WRN-0001-{self.cstatus}"

    #         elif latest_stock_bt and self.coffetype.id == 1:
    #             if latest_stock_bt.grn:
    #                 current_grn_number = int(latest_stock_bt.grn.split('-')[1])
    #                 if self.processtype.startswith("F"): 
    #                     self.grn = f"BT-{str(current_grn_number + 1).zfill(4)}-CF"
    #                 else:
    #                     self.grn = f"BT-{str(current_grn_number + 1).zfill(4)}-SW"
    #             else:
    #                 if self.processtype.type_name.startswith("F"): 
    #                     self.grn = f"BT-0001-CF"
    #                 else:
    #                     self.grn = f"BT-0001-SW"
    #         else:
    #             pass

    #     super().save(*args, **kwargs)


class Stock(models.Model):
    stock_in=models.ForeignKey(StockIn,on_delete=models.CASCADE,null=True,blank=True)
    production_out=models.DecimalField(max_digits=10,decimal_places=2,blank=True,null=True)
    warehouse=models.ForeignKey(Warehouse,on_delete=models.CASCADE)
    section=models.ForeignKey(Section,on_delete=models.CASCADE, blank=True,null=True)
    cell=models.ForeignKey(Cell,on_delete=models.CASCADE)
    coffetype=models.ForeignKey(CoffeeType,on_delete=models.CASCADE)
    processtype=models.ForeignKey(ProcessType,on_delete=models.CASCADE)
    wrn = models.CharField(max_length=200, default='', blank=True,null=True)
    grn = models.CharField(max_length=200, default='', blank=True,null=True)
    quantity_kgs=models.IntegerField()
    bags_no=models.IntegerField()
    created_at = models.DateField(auto_now_add=True)
    moved_to=models.IntegerField(default=0)
    moisture_content=models.IntegerField()
    cstatus=models.CharField(max_length=200,null=True)

    class Meta():
        db_table="stock"




    



      


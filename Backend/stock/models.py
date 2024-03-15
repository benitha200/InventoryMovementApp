from django.db import models
# from coffee.models import CoffeeGrades
from coffee.models import CoffeeType,ProcessType
from supplier.models import Supplier


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
    warehouse=models.ForeignKey(Warehouse,on_delete=models.CASCADE)
    section=models.ForeignKey(Section,on_delete=models.CASCADE, blank=True,null=True )
    cell=models.ForeignKey(Cell,on_delete=models.CASCADE)
    coffetype=models.ForeignKey(CoffeeType,on_delete=models.CASCADE)
    processtype=models.ForeignKey(ProcessType,on_delete=models.CASCADE)
    # supplier=models.ForeignKey(Supplier,on_deslete=models.CASCADE)
    supplier=models.IntegerField()
    wrn=models.CharField(max_length=200)
    bags=models.IntegerField()
    quantity_kgs=models.IntegerField()
    created_at = models.DateField(auto_now_add=True)
    moisture_content=models.IntegerField()
    delivered_date=models.DateField()

    class Meta:
        db_table="stock_in"

    def save(self, *args, **kwargs):
        if not self.pk:
            latest_stock = StockIn.objects.order_by('-wrn').first()

            if latest_stock:
                current_batch_number = int(latest_stock.wrn)
                self.wrn = str(current_batch_number + 1).zfill(4)
            else:
                self.wrn = '0001'

        super().save(*args, **kwargs)

class Stock(models.Model):
    stock_in=models.ForeignKey(StockIn,on_delete=models.CASCADE)
    warehouse=models.ForeignKey(Warehouse,on_delete=models.CASCADE)
    section=models.ForeignKey(Section,on_delete=models.CASCADE, blank=True,null=True)
    cell=models.ForeignKey(Cell,on_delete=models.CASCADE)
    coffetype=models.ForeignKey(CoffeeType,on_delete=models.CASCADE)
    processtype=models.ForeignKey(ProcessType,on_delete=models.CASCADE)
    wrn = models.CharField(max_length=4, default='0000', editable=False, null=True)
    quantity_kgs=models.IntegerField()
    bags_no=models.IntegerField()
    created_at = models.DateField(auto_now_add=True)
    moved_to=models.IntegerField(default=0)
    moisture_content=models.IntegerField()

    class Meta():
        db_table="stock"

    def save(self, *args, **kwargs):
        if not self.pk:
            latest_stock = StockIn.objects.order_by('-wrn').first()

            if latest_stock:
                current_wrn = int(latest_stock.wrn)
                self.wrn = str(current_wrn).zfill(4)
            else:
                self.wrn = '0001'

        super().save(*args, **kwargs)


    



      


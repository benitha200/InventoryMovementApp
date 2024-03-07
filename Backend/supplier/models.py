from django.db import models

# Create your models here.

class Supplier(models.Model):
    name=models.CharField(max_length=200)
    location=models.CharField(max_length=200)
     
    class Meta:
        db_table="suppliers"
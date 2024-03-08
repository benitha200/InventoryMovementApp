from django.db import models

# Create your models here.


class exportdata(models.Model):
    batch_no = models.CharField(max_length=200)
    lots = models.IntegerField()
    bags = models.IntegerField()

    class Meta:
        db_table = "export_data"

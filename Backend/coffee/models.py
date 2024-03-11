from django.db import models



class CoffeeType(models.Model):
    name=models.CharField(max_length=200)

    class Meta:
        db_table="coffee_types"

# class CoffeeGrades(models.Model):
#     coffee_type=models.ForeignKey(CoffeeType,on_delete=models.CASCADE)
#     type_name=models.CharField(max_length=200)

#     class Meta:
#         db_table="coffee_grades"

class ProcessType(models.Model):
    coffee_type=models.ForeignKey(CoffeeType,on_delete=models.CASCADE)
    type_name=models.CharField(max_length=200)
    description=models.CharField(max_length=250)

    class Meta:
        db_table="process_type"

    
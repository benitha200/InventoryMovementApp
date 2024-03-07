from rest_framework import serializers
from .models import *


class CoffeeTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model=CoffeeType
        fields="__all__"

class ProcessTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model=ProcessType
        fields="__all__"
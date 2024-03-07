from django.contrib import admin
from django.urls import path
from stock.views import WarehouseListView

urlpatterns = [
    path('/warehouse', WarehouseListView.as_view(),name="warehouse"),
]
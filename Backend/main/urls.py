"""
URL configuration for main project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from stock.views import *
from supplier.views import *
from production.views import *
from coffee.views import CoffeTypeListView, ProcessTypeAPIView
from report.views import *
from accounts.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/', LoginAPIView.as_view(),name="login"),
    path('register/', RegisterAPIView.as_view(),name="register"),
    # path('/',include("api.urls")),
    path('warehouse/', WarehouseListView.as_view(), name="warehouse"),
    path('warehouse-create/', WareHouseCreateView.as_view(),
         name="warehouse-create"),
    path('warehouse-info/', WarehouseListView.as_view(), name="warehouse"),

    path('section/create/', SectionCreateView.as_view(), name="section-create"),
    path('section/', SectionListView.as_view(), name="section"),
    path('section/<int:warehouse>/', SectionAPIView.as_view(), name='section'),

    path('cell/create/', CellCreateView.as_view(), name="cell-create"),
    path('cell/', CellListView.as_view(), name="cell"),
    path('cell/<int:warehouse>/', CellListViewPerWarehouse.as_view(), name="cell"),
    # path('cell/<int:section>/', CellAPIView.as_view(), name='cell'),


    path('supplier/create/', SupplierCreateView.as_view(), name="supplier-create"),
    path('supplier/', SupplierListView.as_view(), name="supplier"),


    path('coffetype/', CoffeTypeListView.as_view(), name="coffee-type"),
    path('processtype/<int:coffeetype>/',
         ProcessTypeAPIView.as_view(), name="process-type"),

    path('stockin/', StockInCreateView.as_view(), name="stock-in"),
    path('stockinhistory/', StockInListView.as_view(), name="stock-in-history"),

    path('stockdata/', StockDataAPIView.as_view(), name="stock-data-history"),
    path('stock/', StockListView.as_view(), name='stock'),

    path('production-process/create/', ProductionProcessCreateAPIView.as_view(),
         name='production-process-create'),
    path('production-process/', ProductionProcessListView.as_view(),
         name='production-process-create'),

    path('api/production/create/', ProductionInCreateAPIView.as_view(),
         name='production-create'),
    path('production/', ProductionDataListView.as_view(),
         name='production-process'),
    path('productiondata/', AllProductionDataListView.as_view(),
         name='production-data'),
    path('productiondata/<int:processfrom>/',
         ProductionDataByProcess.as_view(), name='production-data'),
    path('productionlogs/', ProductionLogsAPIView.as_view(), name='production-data'),
    path('productiondetails/', ProductionDataDetailsAPIView.as_view(),
         name='production-details'),
    path('productionbatchdetails/', ProductionBatchDetails.as_view(),
         name="production-batch-details"),
    path('productionoutput/', ProductionOutCreateAPIView.as_view(),
         name="production-out"),
    path('production-output-per-batch/', ProductionOutputBatchDetails.as_view(),
         name="Production Output Per Batch"),
    path('production-complete/', ProductionCompleteAPIView.as_view(),
         name='complete production'),

    path('exportdata/', ExportDataListView.as_view(), name="export-date"),

    path('batches/create/', BatchCreateAPIView.as_view(), name="create-batch"),
    path('batches/', BatchListAPIView.as_view(), name="get-batches"),

    path('lot/create/', LotCreateAPIView.as_view(), name="create-lot"),
    path('lots/', LotsListAPIView.as_view(), name="get-lots"),


    path('changeprocess/', ProductionLogsCreateAPIView.as_view(),
         name='change-process'),
    path('max-batch-no/', MaxBatchNoAPIView.as_view(), name='max-batch-no'),
    path('cellsectionwarehouse/', CellWithWarehouseSectionAPIView.as_view(),
         name='cell-section-warehouse'),

    path('production-request/create/', ProductionRequestCreateAPIView.as_view(),
         name='production-request-create'),
    path('production-request/list/', ProductionRequestListAPIView.as_view(),
         name='production-request-list'),


    path('api/sourcing-process/create/',
         SourcingProcessCreateAPIView.as_view(), name='sourcing-process-create'),
    path('api/sourcing-process', SourcingProcessListAPIView.as_view(),
         name='sourcing-process-list'),

    path('generate-report/', GenerateReportAPIView.as_view(), name="generate-report"),

]

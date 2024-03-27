import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import StockInPage from "./components/StockInPage";
import StockOutPage from "./components/StockOutPage";
import SectionForm from "./components/SectionForm";
import WarehouseForm from "./components/WarehouseForm";
import WarehouseLayout from "./components/WarehouseLayout";
import CurrentStock from "./components/CurrentStock";
import Supplier from "./components/Supplier/Supplier";
import Cell from "./components/Cell/Cell";
import Stock from "./components/Stock/Stock";
import './App.css'

// Import PrimeReact components
import { Menu } from 'primereact/menu';
import { Badge } from 'primereact/badge';
import ProductionRequestForm from "./components/Production/ProductionRequestForm"; // Import ProductionRequestForm component
import StockData from "./components/Stock/StockData";
import ProductionMovement from "./components/Stock/ProductionMovement";
import InProduction from "./components/Production/InProduction";
import InProductionMovementForm from "./components/Production/InProductionMovementForm";
import ProductionLogs from "./components/Production/ProductionLogs";
import InProductionDetails from "./components/Production/InProductionDetails";
import CreateBatchForm from "./components/Production/CreateBatchForm";
import InProductionComplete from "./components/Production/InProductionComplete";
import ExportData from "./components/Export/ExportData";
import Reports from "./components/Reports/Reports";
import CreateLotForm from "./components/Production/CreateLotForm";
// import ProductionOutputDetails from "./components/Production/ProductionOutputDetails";
import ProductionApproval from "./components/Production/ProductionApproval";
import Login from "./components/Login/Login";
import Cookies from "js-cookie";
import Dashboard from "./components/Dashboard";
import ProductionOutputDetails from "./components/Production/ProductionOutputDetails";
import ProductionApproval from "./components/Production/ProductionApproval";

const itemRenderer = (item) => (
  <div className='p-menuitem-content bg-cyan-700 text-slate-100'>
    <Link to={item.to} className="flex align-items-center p-menuitem-link">
      {/* Your SVG or icon */}
      <span className="mx-2">{item.label}</span>
      {item.badge && <Badge className="ml-auto" value={item.badge} />}
      {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
    </Link>
  </div>
);

const App = () => {

  const [token,setToken]=useState(Cookies.get('token'))
  // Your menu items
  const items = [
    {
      template: () => (
        <span className="inline-flex align-items-center gap-1 px-2 py-2 bg-cyan-700 text-slate-100">
          {/* Your SVG or icon */}
          <span className="mx-2 font-bold text-lg text-slate-0">Stock Activities</span>
        </span>
      )
    },
    {
      separator: true
    },
    {
      label: 'Stock',
      items: [
        {
          label: 'Dashboard',
          template: itemRenderer,
          to: '/dashboard'
        },
        {
          label: 'Stock Input',
          template: itemRenderer,
          to: '/stockInput'
        },
        {
          label: 'Create Batch',
          template: itemRenderer,
          to: '/create-batch'
        },
        {
          label: 'Create Lot',
          template: itemRenderer,
          to: '/create-lot'
        },
        {
          label: 'Stock Movement',
          template: itemRenderer,
          to: '/stockdata'
        },
        {
          label: 'Production Approval',
          template: itemRenderer,
          to: '/production-approval'
        },
        {
          label: 'In Production',
          template: itemRenderer,
          to: '/in-production'
        },
        {
          label: 'Production Logs',
          template: itemRenderer,
          to: '/production-logs'
        },
        {
          label: 'Production Request',
          template: itemRenderer,
          to: '/ProductionRequestForm'
        },
        {
          label: 'Track Batch',
          template: itemRenderer,
          to: '/in-production'
        },
        {
          label: 'Export',
          template: itemRenderer,
          to: '/export-data'
        },
        {
          label: 'Current Stock',
          template: itemRenderer,
          to: '/stock'
        },
        {
          label: 'Reports',
          template: itemRenderer,
          to: '/report'
        },
      ]
    },
    {
      label: 'Warehouse Info',
      items: [
        {
          label: 'Add Warehouse',
          template: itemRenderer,
          to: '/warehouseForm'
        },
        {
          label: 'Add Section',
          template: itemRenderer,
          to: '/sectionForm'
        },
        {
          label: 'Add Supplier',
          template: itemRenderer,
          to: '/supplier'
        },
        {
          label: 'Add Cell',
          template: itemRenderer,
          to: '/cell'
        }
      ]
    },
    {
      separator: true
    },
  ];

  if(Cookies.get){
      return (
    <Router>
      <div className="flex flex-col md:flex-row h-screen">
        {/* Sidebar */}
        <div className="bg-cyan-700 w-50 px-4 py-6 text-cyan-50 overflow-auto">
          <Menu model={items} className="w-full h-full bg-cyan-700 w-50 px-4 py-6 text-cyan-50" />
        </div>

        {/* Main content area */}
        <div className="flex-1 p-8 overflow-auto font-sans">
          <Routes>
            {/* Your existing routes */}
            <Route exact path="/" element={<SectionForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/stockInput" element={<StockInPage />} />
            <Route path="/stockOut" element={<StockOutPage />} /> 
            <Route path="/create-batch" element={<CreateBatchForm />} />
            <Route path="/create-lot" element={<CreateLotForm />} />
            <Route path="/stock" element={<Stock />} />
            <Route path="/stockdata" element={<StockData />} />
            <Route path="/sectionForm" element={<SectionForm />} />
            <Route path="/warehouseForm" element={<WarehouseForm />} />
            <Route path="/warehouseLayout" element={<WarehouseLayout />} />
            <Route path="/supplier" element={<Supplier />} />
            <Route path="/currentStock" element={<CurrentStock />} />
            <Route path="/cell" element={<Cell />} />
            <Route path="/production-movement-form" element={<ProductionMovement />} />
            <Route path="/production-approval" element={<ProductionApproval />} />
            <Route path="/in-production" element={<InProduction />} />
            <Route path="/in-production-details" element={<InProductionDetails />} />
            <Route path="/in-production-complete" element={<InProductionComplete />} />
            <Route path="/in-production-movement-form" element={<InProductionMovementForm />} />
            <Route path="/production-logs" element={<ProductionLogs />} />
            <Route path="/production-output-details" element={<ProductionOutputDetails />} />
            <Route path="/export-data" element={<ExportData />} />
            <Route path="/report" element={<Reports/>}/>
            <Route path="/ProductionRequestForm" element={<ProductionRequestForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
  }
  else{
    return(
      <div><Login/></div>
    );
  }


};

export default App;

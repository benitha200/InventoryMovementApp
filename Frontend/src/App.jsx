import React from "react";
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
          label: 'Stock Movement',
          template: itemRenderer,
          to: '/stockdata'
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
            <Route path="/stockInput" element={<StockInPage />} />
            <Route path="/stockOut" element={<StockOutPage />} />
            <Route path="/create-batch" element={<CreateBatchForm />} />
            <Route path="/stock" element={<Stock />} />
            <Route path="/stockdata" element={<StockData />} />
            <Route path="/sectionForm" element={<SectionForm />} />
            <Route path="/warehouseForm" element={<WarehouseForm />} />
            <Route path="/warehouseLayout" element={<WarehouseLayout />} />
            <Route path="/supplier" element={<Supplier />} />
            <Route path="/currentStock" element={<CurrentStock />} />
            <Route path="/cell" element={<Cell />} />
            <Route path="/production-movement-form" element={<ProductionMovement />} />
            <Route path="/in-production" element={<InProduction />} />
            <Route path="/in-production-details" element={<InProductionDetails />} />
            <Route path="/in-production-complete" element={<InProductionComplete />} />
            <Route path="/in-production-movement-form" element={<InProductionMovementForm />} />
            <Route path="/production-logs" element={<ProductionLogs />} />
            <Route path="/export-data" element={<ExportData />} />
            {/* Include ProductionRequestForm */}
            <Route path="/ProductionRequestForm" element={<ProductionRequestForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;

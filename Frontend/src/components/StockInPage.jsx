import React, { useState } from "react";
import StockInputForm from "./StockInputForm";
import StockInTable from "./StockInTable";

const StockManagementPage = () => {
    const [showInputForm, setShowInputForm] = useState(false);

    const toggleInputForm = () => {
        setShowInputForm(!showInputForm);
    };

    return (
        <div>
            <button
            onClick={toggleInputForm}
            className="bg-cyan-700 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
            {showInputForm ? 'Go to Stock In history' : 'Add New Items in stock'}
            </button>
            
            {showInputForm && <StockInputForm />}
            {!showInputForm && <StockInTable />}
        </div>
    );
};

export default StockManagementPage;

import React, { useState } from "react";
import StockInputForm from "./StockOutForm";
import StockInTable from "./StockOutTable";

const StockOutPage = () => {
    const [showInputForm, setShowInputForm] = useState(false);

    const toggleInputForm = () => {
        setShowInputForm(!showInputForm);
    };

    return (
        <div>
            <button onClick={toggleInputForm} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Record Stock Out
            </button>
            {showInputForm && <StockInputForm />}
            {!showInputForm && <StockInTable />}
        </div>
    );
};

export default StockOutPage;

import React, { useState } from "react";

const WarehouseLayout = () => {
    const [selectedWarehouse, setSelectedWarehouse] = useState("");

    // Function to handle warehouse selection change
    const handleWarehouseChange = (e) => {
        setSelectedWarehouse(e.target.value);
    };

    return (
        <div className="flex flex-col items-center">
            {/* Warehouse selection dropdown */}
            <div className="w-full md:w-1/2 mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="warehouse">
                    Select Warehouse
                </label>
                <select
                    className="block w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="warehouse"
                    value={selectedWarehouse}
                    onChange={handleWarehouseChange}
                >
                    <option value="">Select Warehouse</option>
                    <option value="1">Warehouse 1</option>
                    <option value="2">Warehouse 2</option>
                    <option value="3">Warehouse 3</option>
                </select>
            </div>

            {/* Warehouse layout diagram */}
            <div className="warehouse grid grid-cols-10 gap-2">
                {selectedWarehouse ? (
                    ['A', 'B', 'C', 'D', 'E'].map(row => (
                        Array.from({ length: 10 }, (_, i) => (
                            <div key={row + (i + 1)} className="section bg-gray-200 border border-gray-400 flex justify-center items-center">
                                {row + (i + 1)}
                            </div>
                        ))
                    ))
                ) : (
                    <p className="text-center text-xl text-green-700 mt-3">Please select a warehouse to view its layout.</p>
                )}
            </div>
        </div>
    );
};

export default WarehouseLayout;

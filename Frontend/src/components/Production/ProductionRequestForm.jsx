import React, { useState } from "react";
import { MultiSelect } from 'primereact/multiselect';
import { Dropdown } from "primereact/dropdown";

const ProductionRequestForm = () => {
    const [processType, setProcessType] = useState(null);
    const [suppliers, setSuppliers] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [grades, setGrades] = useState({});
    const [descriptions, setDescriptions] = useState({});

    // Options for process type
    const processTypeOptions = [
        { label: "Single Origin", value: "Single Origin" },
        { label: "Blend", value: "Blend" }
    ];

    // Options for suppliers based on process type
    const supplierOptions = [
        { label: "Musasa", value: "Musasa" },
        { label: "Mashesha", value: "Mashesha" },
        { label: "Musha", value: "Musha" }
    ];

    // Options for grades
    const gradeOptions = [
        { label: "A1", value: "A1" },
        { label: "A2", value: "A2" },
        { label: "Isimbi", value: "Isimbi" },
        { label: "Speciality", value: "Speciality" }
    ];

    const handleSubmit = () => {
        // Add your form submission logic here
        console.log("Form submitted!");
    };

    const handleProcessTypeChange = (e) => {
        setProcessType(e.value);
        setSuppliers([]);
        setQuantities({});
        setGrades({});
        setDescriptions({});
    };

    const handleSupplierChange = (e) => {
        const selectedSuppliers = e.value;
        const newQuantities = {};
        const newGrades = {};
        const newDescriptions = {};

        if (selectedSuppliers.length > 0) {
            selectedSuppliers.forEach(supplier => {
                newQuantities[supplier] = "";
                newGrades[supplier] = "";
                newDescriptions[supplier] = "";
            });
        }

        setSuppliers(selectedSuppliers);
        setQuantities(newQuantities);
        setGrades(newGrades);
        setDescriptions(newDescriptions);
    };

    return (
        <div className="bg-white shadow-md rounded px-4 pt-6 pb-8 mb-4 mx-auto max-w-md">
            <span className="text-cyan-700 text-3xl font-bold font-sans mb-4">
                Production Request
            </span>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Process type:</label>
                <Dropdown
                    value={processType}
                    options={processTypeOptions}
                    onChange={handleProcessTypeChange}
                    placeholder="Select Process Type"
                    className="w-full"
                />
            </div>

            {processType === "Blend" && (
                <>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Supplier:</label>
                        <MultiSelect
                            value={suppliers}
                            options={supplierOptions}
                            onChange={handleSupplierChange}
                            placeholder="Select Suppliers"
                            className="w-full"
                        />
                    </div>
                    {suppliers.map(supplier => (
                        <div className="mb-4" key={supplier}>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Quantity for {supplier}:</label>
                            <input
                                type="number"
                                value={quantities[supplier] || ""}
                                onChange={(e) => setQuantities({ ...quantities, [supplier]: e.target.value })}
                                className="w-full appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder={`Enter Quantity for ${supplier}`}
                            />
                            <label className="block text-gray-700 text-sm font-bold mb-2">Grade for {supplier}:</label>
                            <Dropdown
                                value={grades[supplier] || ""}
                                options={gradeOptions}
                                onChange={(e) => setGrades({ ...grades, [supplier]: e.value })}
                                placeholder={`Select Grade for ${supplier}`}
                                className="w-full"
                            />
                            <label className="block text-gray-700 text-sm font-bold mb-2">Description for {supplier}:</label>
                            <input
                                type="text"
                                value={descriptions[supplier] || ""}
                                onChange={(e) => setDescriptions({ ...descriptions, [supplier]: e.target.value })}
                                className="w-full appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder={`Enter Description for ${supplier}`}
                            />
                        </div>
                    ))}
                    {suppliers.length > 0 && (
                        <button onClick={handleSubmit} className="bg-cyan-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">Submit</button>
                    )}
                </>
            )}
            {processType === "Single Origin" && (
                <>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Supplier:</label>
                        <Dropdown
                            value={suppliers[0]}
                            options={supplierOptions}
                            onChange={handleSupplierChange}
                            placeholder="Select Supplier"
                            className="w-full"
                        />
                    </div>
                    {suppliers.map(supplier => (
                        <div className="mb-4" key={supplier}>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Quantity for {supplier}:</label>
                            <input
                                type="number"
                                value={quantities[supplier] || ""}
                                onChange={(e) => setQuantities({ ...quantities, [supplier]: e.target.value })}
                                className="w-full appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder={`Enter Quantity for ${supplier}`}
                            />
                            <label className="block text-gray-700 text-sm font-bold mb-2">Grade for {supplier}:</label>
                            <Dropdown
                                value={grades[supplier] || ""}
                                options={gradeOptions}
                                onChange={(e) => setGrades({ ...grades, [supplier]: e.value })}
                                placeholder={`Select Grade for ${supplier}`}
                                className="w-full"
                            />
                            <label className="block text-gray-700 text-sm font-bold mb-2">Description for {supplier}:</label>
                            <input
                                type="text"
                                value={descriptions[supplier] || ""}
                                onChange={(e) => setDescriptions({ ...descriptions, [supplier]: e.target.value })}
                                className="w-full appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder={`Enter Description for ${supplier}`}
                            />
                        </div>
                    ))}
                    {suppliers.length > 0 && (
                        <button onClick={handleSubmit} className="bg-cyan-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">Submit</button>
                    )}
                </>
            )}
        </div>
    );
};

export default ProductionRequestForm;

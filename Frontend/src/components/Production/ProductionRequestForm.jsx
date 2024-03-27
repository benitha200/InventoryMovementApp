import React, { useState, useEffect, useRef } from "react";
import { MultiSelect } from 'primereact/multiselect';
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";

const ProductionRequestForm = () => {
    const [processType, setProcessType] = useState(null);
    const [suppliers, setSuppliers] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [grades, setGrades] = useState({});
    const [descriptions, setDescriptions] = useState({});

    const [processTypeOptions, setProcessTypeOptions] = useState([]);
    const [supplierOptions, setSupplierOptions] = useState([]);
    const [gradeOptions, setGradeOptions] = useState([]); // Added gradeOptions state
    const [toastVisible, setToastVisible] = useState(false);

    const toast = useRef(null);

    useEffect(() => {
        // Fetch process type options
        fetchProcessTypeOptions();
        // Fetch initial supplier options
        fetchSupplierOptions();

        // Removed fetchGradeOptions() from here
    }, []);

    const fetchProcessTypeOptions = () => {
        fetch("http://127.0.0.1:8000/api/sourcing-process")
            .then(response => response.json())
            .then(data => {
                setProcessTypeOptions(data.map(item => ({ label: item.name, value: item.name })));
            })
            .catch(error => console.error("Error fetching process type options:", error));
    };

    const fetchSupplierOptions = () => {
        fetch("http://127.0.0.1:8000/supplier/")
            .then(response => response.json())
            .then(data => {
                setSupplierOptions(data.map(item => ({ label: item.name, value: item.name })));
            })
            .catch(error => console.error("Error fetching supplier options:", error));
    };

    const fetchGradeOptions = (processTypeId) => { // Updated fetchGradeOptions to accept processTypeId
        fetch(`http://127.0.0.1:8000/processtype/2/`)
            .then(response => response.json())
            .then(data => {
                const options = data.map(item => ({ label: item.type_name, value: item.type_name }));
                setGradeOptions(options);
            })
            .catch(error => console.error("Error fetching grade options:", error));
    };

    const handleSubmit = () => {
        let request_number_ = 2300
        let formData = [];

        if (processType === "Single Origin") {
            console.log("Supplier Options:", supplierOptions);

            const selectedSupplier = supplierOptions.find(option => option.value === suppliers[0]);
            console.log("Selected Supplier:", selectedSupplier);

            formData = [{
                process_type: processType,
                supplier: suppliers,
                quantity: quantities[suppliers[0]],
                grade: grades[suppliers[0]],
                description: descriptions[suppliers[0]],
                request_number: request_number_
            }];
            console.log("Form Data:", formData);
        }
        else if (processType === "Blend" && suppliers.length > 0) {
            formData = suppliers.map(supplier => ({
                process_type: processType,
                supplier: supplier,
                quantity: quantities[supplier],
                grade: grades[supplier],
                description: descriptions[supplier],
                request_number: request_number_
            }));
        }

        // Send form data to backend
        Promise.all(formData.map(data => {
            return fetch('http://127.0.0.1:8000/production-request/create/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then(response => {
                    if (response.ok) {
                        // Handle successful submission
                        console.log('Production request submitted successfully');
                        toast.current.show({ severity: 'success', summary: 'Success', detail: 'Production request submitted successfully' });
                    } else {
                        // Handle error response
                        console.error('Failed to submit production request');
                        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to submit production request' });
                    }
                })
                .catch(error => {
                    // Handle network error
                    console.error('Error:', error);
                    toast.current.show({ severity: 'error', summary: 'Error', detail: 'Network error occurred' });
                });
        }))
            .then(() => {
                // Handle completion if needed
            })
            .catch(error => {
                // Handle any errors
                console.error('Error:', error);
            });
    };


    const handleProcessTypeChange = (e) => {
        setProcessType(e.value);
        setSuppliers([]);
        setQuantities({});
        setGrades({});
        setDescriptions({});

        // Fetch grade options based on the selected process type
        fetchGradeOptions(e.value); // Pass the selected process type ID to fetchGradeOptions
    };

    const handleSupplierChange = (e) => {
        const selectedSuppliers = e.value;

        // // If process type is "Single Origin", set the supplier directly
        // if (processType === "Single Origin") {
        //     const selectedSupplier = selectedSuppliers.length > 0 ? selectedSuppliers[0] : "";
        //     setSuppliers([selectedSupplier]);
        // } else {
        //     // If process type is "Blend", set the suppliers array
        //     setSuppliers(selectedSuppliers);
        // }

        setSuppliers(selectedSuppliers);

        // Reset quantities, grades, and descriptions
        setQuantities({});
        setGrades({});
        setDescriptions({});
    };

    return (
        <div className="bg-white shadow-md rounded px-4 pt-6 pb-8 mb-4 mx-auto max-w-md">
            <span className="text-cyan-700 text-3xl font-bold font-sans mb-4">
                Production Order
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

            {processType === "Single" && (
                <>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Supplier:</label>
                        <Dropdown
                            value={suppliers}
                            options={supplierOptions}
                            onChange={handleSupplierChange}
                            placeholder="Select Supplier"
                            className="w-full"
                        />
                    </div>
                    {processType === "Single" && suppliers.length > 0 && (
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Quantity :</label>
                            <input
                                type="number"
                                value={quantities[suppliers[0]] || ""}
                                onChange={(e) => setQuantities({ ...quantities, [suppliers[0]]: e.target.value })}
                                className="w-full appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Enter Quantity"
                            />
                            <label className="block text-gray-700 text-sm font-bold mb-2">Grade :</label>
                            <Dropdown
                                value={grades[suppliers[0]] || ""}
                                options={gradeOptions}
                                onChange={(e) => setGrades({ ...grades, [suppliers[0]]: e.value })}
                                placeholder="Select Grade"
                                className="w-full"
                            />
                            <label className="block text-gray-700 text-sm font-bold mb-2">Description :</label>
                            <input
                                type="text"
                                value={descriptions[suppliers[0]] || ""}
                                onChange={(e) => setDescriptions({ ...descriptions, [suppliers[0]]: e.target.value })}
                                className="w-full appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Enter Description"
                            />
                        </div>
                    )}

                    {suppliers.length >= 0 && (
                        <button onClick={handleSubmit} className="bg-cyan-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">Submit</button>
                    )}
                </>
            )}

            <Toast ref={toast} />
        </div>

    )
}

export default ProductionRequestForm;


import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

export default function StockInHistory() {
    const [stockInData, setStockInData] = useState(null);
    const [globalFilterValue, setGlobalFilterValue] = useState('');

    useEffect(() => {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        fetch("http://127.0.0.1:8000/stockinhistory/", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                const formattedData = result.map(item => {
                    return {
                        id: item.id,
                        warehouse: item.warehouse,
                        section: item.section,
                        cell: item.cell,
                        coffetype: item.coffetype,
                        processtype: item.processtype,
                        supplier: item.supplier,
                        wrn: item.wrn,
                        bags: item.bags,
                        quantity_kgs: item.quantity_kgs,
                        created_at: item.created_at
                    };
                });
                setStockInData(formattedData);
            })
            .catch((error) => console.error(error));
    }, []);

    const onGlobalFilterChange = (e) => {
        setGlobalFilterValue(e.target.value);
    };

    const renderHeader = () => {
        return (
            <div className="flex justify-content-between">
                <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined onClick={clearFilter} />
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </span>
            </div>
        );
    };

    const clearFilter = () => {
        setGlobalFilterValue('');
    };

    const header = renderHeader();

    return (
        <div className="table-with-margin">
            <DataTable
                value={stockInData}
                paginator
                showGridlines
                rows={10}
                dataKey="id"
                globalFilter={globalFilterValue}
                emptyMessage="No stock in history found."
                header={header}
            >
                <Column field="warehouse" header="Warehouse" filter filterPlaceholder="Search by Warehouse" />
                <Column field="section" header="Section" filter filterPlaceholder="Search by Section" />
                <Column field="cell" header="Cell" filter filterPlaceholder="Search by Cell" />
                <Column field="coffetype" header="Coffee Type" filter filterPlaceholder="Search by Coffee Type" />
                <Column field="processtype" header="Process Type" filter filterPlaceholder="Search by Process Type" />
                <Column field="supplier" header="Supplier" filter filterPlaceholder="Search by Supplier" />
                <Column field="wrn" header="WRN/GRN" filter filterPlaceholder="Search by WRN" />
                <Column field="bags" header="Bags" filter filterPlaceholder="Search by Bags" />
                <Column field="quantity_kgs" header="Quantity (kgs)" filter filterPlaceholder="Search by Quantity (kgs)" />
                <Column field="created_at" header="Created At" filter filterPlaceholder="Search by Created At" />
            </DataTable>
        </div>
    );
}

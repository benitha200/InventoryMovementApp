import React, { useEffect, useState } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

const ExportData = () => {
  const [data,setData]=useState();

    function get_production_process() {
        const requestOptions = {
          method: "GET",
          redirect: "follow"
        };
    
        fetch("http://127.0.0.1:8000/exportdata/", requestOptions)
          .then((response) => response.json())
          .then((result) => {
            console.log(result)
            setData(result)
            // setProcesses(result)
          })
          .catch((error) => console.error(error));
      }
      useEffect(()=>{
        get_production_process();
      },[])

      const renderHeader = () => {
        return (
            <div className="flex justify-content-between">
                <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined />
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    {/* <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" /> */}
                </span>
            </div>
        );
      };
      const header = renderHeader();
  return (
    <div>
      <span className='text-cyan-700 text-3xl font-bold font-sans ...'>
                COFFEE IN EXPORTS
      </span>
      <DataTable
        value={data}
        paginator
        showGridlines
        rows={10}
        dataKey="id"
        // globalFilter={globalFilterValue}
        emptyMessage="No stock data found."
        header={header}
    >
    <Column field="warehouse" header="Warehouse(Cell)"/>
    <Column field="created_at" header="Moved Date" />
    <Column
    field="lot_no"
    header="Lot No"
    filter
    filterPlaceholder="Search by Lot No"
    body={(rowData) => (<div class="text-cyan-700 font-bold">{rowData.lot_no}</div>)}
    />


    <Column field="output_bags" header="Bags"/>
    <Column field="output_quality" header="Quality"/>
    <Column field="output_quantity" header="Quantity" />
    {/* <Column field="status" header="Status" filter filterPlaceholder="" body={(rowData) => (rowData.status === 1 ? "Completed" : "Pending")}/> */}
    {/* <Column
    header="Actions"
    body={renderActions}
    style={{ minWidth: '7rem' }} 
/> */}
</DataTable></div>
  )
}

export default ExportData
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import { Divider } from 'primereact/divider';

export default function ProductionLogs() {
    const [stockData, setStockData] = useState(null);
    const [globalFilterValue, setGlobalFilterValue] = useState('');

    // useEffect(() => {
    //     const requestOptions = {
    //         method: "GET",
    //         redirect: "follow"
    //     };

    //     fetch("http://127.0.0.1:8000/stockdata/", requestOptions)
    //         .then((response) => response.json())
    //         .then((result) => {
    //             const formattedData = result.map(item => {
    //                 return {
    //                     id: item.id,
    //                     warehouse: item.warehouse.name,
    //                     section: item.section.name,
    //                     cell: item.cell.name,
    //                     coffetype: item.coffetype.name,
    //                     processtype: item.processtype.type_name,
    //                     supplier: item.stock_in.supplier,
    //                     wrn: item.wrn,
    //                     bags: item.bags_no,
    //                     quantity_kgs: item.quantity_kgs,
    //                     created_at: item.created_at
    //                 };
    //             });
    //             setStockData(formattedData);
    //         })
    //         .catch((error) => console.error(error));
    // }, []);

    const onGlobalFilterChange = (e) => {
        setGlobalFilterValue(e.target.value);
    };

    // GROUP BY CELL
  //   useEffect(() => {
  //     const requestOptions = {
  //         method: "GET",
  //         redirect: "follow"
  //     };
  
  //     fetch("http://127.0.0.1:8000/stockdata/", requestOptions)
  //         .then((response) => response.json())
  //         .then((result) => {
  //             const groupedData = result.reduce((acc, item) => {
  //                 const key = `${item.warehouse.name}-${item.section.name}-${item.cell.name}`;
  //                 if (!acc[key]) {
  //                     acc[key] = {
  //                         id: item.id,
  //                         warehouse: item.warehouse.name,
  //                         section: item.section.name,
  //                         cell: item.cell.name,
  //                         coffetype: item.coffetype.name,
  //                         processtype: item.processtype.type_name,
  //                         supplier: item.stock_in.supplier,
  //                         wrn: item.wrn,
  //                         bags: item.bags_no,
  //                         quantity_kgs: item.quantity_kgs,
  //                         created_at: item.created_at
  //                     };
  //                 } else {
  //                     acc[key].bags += item.bags_no;
  //                     acc[key].quantity_kgs += item.quantity_kgs;
  //                     // You can aggregate other fields if needed
  //                 }
  
  //                 return acc;
  //             }, {});
  
  //             const formattedData = Object.values(groupedData);
  
  //             setStockData(formattedData);
  //         })
  //         .catch((error) => console.error(error));
  // }, []);
  useEffect(() => {
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    fetch("http://127.0.0.1:8000/productionlogs/", requestOptions)
        .then((response) => response.json())
        .then((result) => {
            const groupedData = result.reduce((acc, item) => {
                const key = `${item.batch_no}`;
                if (!acc[key]) {
                    acc[key] = {
                        id: item.id,
                        batch_no:item.batch_no,
                        net_quantity: item.net_quantity + item.moved_quantity,
                        starting_process:item.production.production_process.name,
                        coffetype: item.coffetype_id,
                        starting_date:item.created_at,
                        moved_quantity:item.moved_quantity,
                        bags: item.bags_no,
                        status:item.status,
                        production_process_from: item.production_process_from.name,
                        production_process_to: item.production_process_to.name
                    };
                } else {
                    // acc[key].processtypes.push(item.processtype.type_name);
                    // acc[key].suppliers.push(item.supplier_name);
                    // acc[key].wrns.push(item.wrn);
                    // acc[key].bags += item.bags_no;
                    // acc[key].quantity_kgs += item.quantity_kgs;
                }

                return acc;
            }, {});

            // Concatenate arrays into strings
            // Object.values(groupedData).forEach((group) => {
            //     group.suppliers = group.suppliers.join(', ');
            //     group.wrns = group.wrns.join(', ');
            // });

            const formattedData = Object.values(groupedData);
            console.log(formattedData)

            setStockData(formattedData);
        })
        .catch((error) => console.error(error));
}, []);


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

    // const renderActions = (rowData) => {
    //     return (
    //         <div className="flex gap-2">
    //             <Button label="Production" icon="pi pi-cog" className='bg-sky-500 text-cyan-50 p-2' onClick={() => handleProduction(rowData)} />
    //             <Button label="Export" icon="pi pi-external-link" className='bg-cyan-600 text-cyan-50 p-2' onClick={() => handleExport(rowData)} />
    //         </div>
    //     );
    // };

    const renderActions = (rowData) => {
        // Implement your Production action logic here
        // console.log("Production clicked for row with ID:", rowData.id);
        return (
            <div className='gap-2'>
              {/* <Link
                to={{
                  pathname: "/production-movement-form",
                  search: `?wrn=${rowData.wrn}&coffetype=${rowData.coffetype}&processtype=${rowData.processtype}
                              &quantity_kgs=${rowData.quantity_kgs}&bags=${rowData.bags_no}
                             `,
                  state: {
                    wrn: rowData.wrn,
                    coffetype: rowData.coffetype,
                    processtype: rowData.processtyoe,
                    quantity_kgs: rowData.quantity_kgs,
                    bags:rowData.bags_no,
                  },
                }}
                className='m-2'
              >
                <button className='bg-cyan-500 text-white p-2 rounded-md w-full'>
                  Details
                </button>
              </Link>
              <Link
                to={{
                  pathname: "/production-movement-form",
                  search: `?wrn=${rowData.wrn}&coffetype=${rowData.coffetype}&processtype=${rowData.processtype}
                              &quantity_kgs=${rowData.quantity_kgs}&bags=${rowData.bags_no}
                             `,
                  state: {
                    wrn: rowData.wrn,
                    coffetype: rowData.coffetype,
                    processtype: rowData.processtyoe,
                    quantity_kgs: rowData.quantity_kgs,
                    bags:rowData.bags_no,
                  },
                }}
              >
                <button className='bg-cyan-500 text-white p-2 rounded-md w-8'>
                  Details
                </button>
              </Link>
         */}
            </div>
          );
    };
  //   const renderContributions = (rowData) => {
  //     // Split the comma-separated strings into arrays
  //     const suppliers = rowData.suppliers.split(', ');
  //     const wrns = rowData.wrns.split(', ');
  
  //     return (
  //         <div>
  //             <div className='bg-gray-50 p-2'>
  //                 <strong>Suppliers:</strong> {suppliers.join(', ')}
  //             </div>
  //             {/* <hr/> */}
  //             <div className='bg-gray-50 p-2'>
  //                 <strong>WRNs:</strong> {wrns.join(', ')}
  //             </div>
  //         </div>
  //     );
  // };
  const renderContributions = (rowData) => {
    // Ensure that rowData is defined and has the expected properties
    if (!rowData || !rowData.suppliers || !rowData.wrns) {
        return null; // or handle it as needed
    }

    // Split the comma-separated strings into arrays
    const suppliers = rowData.suppliers.split(', ');
    const wrns = rowData.wrns.split(', ');

    return (
        <div>
            <div className='bg-gray-50 p-2'>
                <strong>Suppliers:</strong> {suppliers.join(', ')}
            </div>
            <div className='bg-gray-50 p-2'>
                <strong>WRNs:</strong> {wrns.join(', ')}
            </div>
        </div>
    );
};
    const header = renderHeader();

    return (
        <div>
            <div className='flex justify-between'>
                <span className='text-cyan-700 text-3xl font-bold font-sans ...'>
                PRODUCTION LOGS
            </span>
            <div className='flex gap-3'>
            {/* <Link
                to={{
                  pathname: "/production-movement-form",
                }}
              >
                <button className='bg-sky-500 text-white p-2 rounded-md'>
                  Move to Production
                </button>
              </Link> */}
              {/* <Link
                to={{
                  pathname: "/production-movement-form",
                //   search: `?wrn=${rowData.wrn}&coffetype=${rowData.coffetype}&processtype=${rowData.processtype}
                //               &quantity_kgs=${rowData.quantity_kgs}&bags=${rowData.bags_no}
                //              `,
                //   state: {
                //     wrn: rowData.wrn,
                //     coffetype: rowData.coffetype,
                //     processtype: rowData.processtyoe,
                //     quantity_kgs: rowData.quantity_kgs,
                //     bags:rowData.bags_no,
                //   },
                }}
              >
                <button className='bg-green-500 text-white p-2 rounded-md'>
                  Move to Export
                </button>
              </Link> */}
            </div>
            
            </div>
            
            <div className="table-with-margin">
        <DataTable
            value={stockData}
            paginator
            showGridlines
            rows={10}
            dataKey="id"
            globalFilter={globalFilterValue}
            emptyMessage="No stock data found."
            header={header}
        >
    <Column field="starting_date" header="Date"/>
    <Column field="batch_no" header="Batch No" />
    <Column
        field="coffetype"
        header="Coffee Type"
        filter
        filterPlaceholder="Search by Coffee Type"
        body={(rowData) => (rowData.coffetype === 1 ? "Green" : "Parchment")}
        />

    
    <Column field="production_process_from" header="Process From"/>
    <Column field="production_process_to" header="Process To"/>
    <Column field="net_quantity" header="Total Quantity" />
    <Column field="moved_quantity" header="Moved Quantity" />
    <Column field="status" header="Status" filter filterPlaceholder="" body={(rowData) => (rowData.status === 1 ? "Completed" : "Pending")}/>
    <Column
    header="Actions"
    body={renderActions}
    style={{ minWidth: '7rem' }} 
/>
</DataTable>
        </div>
        </div>
        
    );
}

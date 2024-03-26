import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
// import { CheckIcon, XIcon } from 'primereact/icons';
import 'primeicons/primeicons.css';
import { Loader, Loader2 } from 'lucide';
import { Link } from 'react-router-dom';

export default function ProductionLogs() {
    const [stockData, setStockData] = useState(null);
    const [globalFilterValue, setGlobalFilterValue] = useState('');

    useEffect(() => {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        fetch("http://127.0.0.1:8000/production-outputs/", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result)
            const formattedData = result.map(item => {
                const lossProfit = (parseInt(item.output_quantity, 10) || 0) - (parseInt(item.net_quantity, 10) || 0);
                return {
                    id: item.id,
                    warehouse: item.warehouse,
                    input_quantity: item.net_quantity,
                    input_bags: item.bags,
                    coffetype_id: item.coffetype_id,
                    production_process_name: item.production_process_name,
                    production_process_id: item.production_process_id,
                    output_quantity: item.output_quantity,
                    output_bags: item.output_bags,
                    sub_batch: item.sub_batch,
                    completion_date: item.completion_date,
                    // quantity_kg: item.quantity_kgs,
                    loss_profit: lossProfit,
                    lot_no: item.lot_no,
                    status: item.status,
                    mc_in: item.mc_in,
                    mc_out: item.mc_out,
                    output_qualities: item.output_qualities,
                    out_turn: parseFloat(((parseInt(item.output_quantity) / parseInt(item.net_quantity)) * 100)).toFixed(2)

                };
            });
            setStockData(formattedData);
        })
            .catch((error) => console.error(error));
    }, []);

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


//   useEffect(() => {
//     const requestOptions = {
//         method: "GET",
//         redirect: "follow"
//     };

//     fetch("http://127.0.0.1:8000/productionlogs/", requestOptions)
//         .then((response) => response.json())
//         .then((result) => {
//             const groupedData = result.reduce((acc, item) => {
//                 const key = `${item.batch_no}`;
//                 if (!acc[key]) {
//                     acc[key] = {
//                         id: item.id,
//                         batch_no:item.batch_no,
//                         net_quantity: item.net_quantity + item.moved_quantity,
//                         starting_process:item.production.production_process.name,
//                         coffetype: item.coffetype_id,
//                         starting_date:item.created_at,
//                         moved_quantity:item.moved_quantity,
//                         bags: item.bags_no,
//                         status:item.status,
//                         production_process_from: item.production_process_from.name,
//                         production_process_to: item.production_process_to.name
//                     };
//                 } else {
//                     // acc[key].processtypes.push(item.processtype.type_name);
//                     // acc[key].suppliers.push(item.supplier_name);
//                     // acc[key].wrns.push(item.wrn);
//                     // acc[key].bags += item.bags_no;
//                     // acc[key].quantity_kgs += item.quantity_kgs;
//                 }

//                 return acc;
//             }, {});

//             // Concatenate arrays into strings
//             // Object.values(groupedData).forEach((group) => {
//             //     group.suppliers = group.suppliers.join(', ');
//             //     group.wrns = group.wrns.join(', ');
//             // });

//             const formattedData = Object.values(groupedData);
//             console.log(formattedData)

//             setStockData(formattedData);
//         })
//         .catch((error) => console.error(error));
// }, []);


    const renderHeader = () => {
        return (
            <div className="flex justify-content-between">
                <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined onClick={clearFilter} />
                <span className="p-input-icon-left">
                    <i className="pi pi-search h-12" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" className='h-12 w-full pl-8 border-2 border-cyan-700'  />
                </span>
            </div>
        );
    };

    const clearFilter = () => {
        setGlobalFilterValue('');
    };

    const renderActions = (rowData) => {
      console.log("Production clicked for row with ID:", rowData.production_process_name);
      const productionProcessName = rowData.production_process_name ? rowData.production_process_name : '';
    
      return (
        <div className='gap-2'>
          <Link
            to={{
              pathname: "/production-output-details",
              search: `?production_process=${productionProcessName}&production_process_id=${rowData.production_process_id}&bags=${rowData.bags}&quantity=${rowData.net_quantity}
                          &created_at=${rowData.created_at}&batch_no=${rowData.sub_batch}&completion_date=${rowData.completion_date}
                          `,
            
            }}
            className='m-2'
          >
            <button className='bg-sky-500 text-white p-2 rounded-md w-full'>
              Details
            </button>
          </Link>
        </div>
      );
    };


    const header = renderHeader();

    return (
        <div>
            <div className='flex justify-between'>
                <span className='text-cyan-700 text-3xl font-bold font-sans ...'>
                PRODUCTION OUTPUTS
            </span>
            <div className='flex gap-3'>
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
    {/* <Column field="id" header="ID"/> */}
    <Column field="sub_batch" header="Batch No" style={{minWidth:"8rem"}}/>

    <Column
        field="output_qualities"
        header="Coffee Grade"
        filter
        filterPlaceholder="Search by Coffee Type"
        style={{minWidth:"8rem",fontWeight:"bold"}}
        // body={(rowData) => (rowData.coffetype === 1 ? "Green" : "Parchment")}
        />

    
    <Column field="input_quantity" header="Input Quantity" className='text-sky-600 font-bold text-lg'/>
    <Column field="input_bags" header="Input Bags" className='text-sky-600 font-bold text-lg'/>
    {/* <Column field="production_process_name" header="Production Activity"/> */}
    <Column
                    field="production_process_name"
                    header="Production Process"
                    filter
                    filterPlaceholder="Search by Status"
                    body={(rowData) => {
                        const productionProcessText = rowData.production_process_name;
                        // const bgColor = generateColor(productionProcessText);
                        if(rowData.production_process_name === "processing"){
                          return <span style={{ backgroundColor: "#ca8a04", padding: '5px', borderRadius: '5px', color: '#f8fafc', width: '5rem' }}>{productionProcessText}</span>;
                        }
                        if(rowData.production_process === "hulling"){
                          return <span style={{ backgroundColor: "#059669", padding: '5px', borderRadius: '5px', color: '#f8fafc', width: '5rem' }}>{productionProcessText}</span>;
                        }
                        if(rowData.production_process === "sorting"){
                          return <span style={{ backgroundColor: "#0284c7", padding: '5px', borderRadius: '5px', color: '#f8fafc', width: '5rem' }}>{productionProcessText}</span>;
                        }
                        if(rowData.production_process === "repass"){
                          return <span style={{ backgroundColor: "#84cc16", padding: '5px', borderRadius: '5px', color: '#f8fafc', width: '5rem' }}>{productionProcessText}</span>;
                        }
                        if(rowData.production_process === "handpicking"){
                          return <span style={{ backgroundColor: "#92400e", padding: '5px', borderRadius: '5px', color: '#f8fafc', width: '5rem' }}>{productionProcessText}</span>;
                        }
                        if(rowData.production_process === "grading"){
                          return <span style={{ backgroundColor: "#047857", padding: '5px', borderRadius: '5px', color: '#f8fafc', width: '5rem' }}>{productionProcessText}</span>;
                        }
                        else {
                          return <span style={{ backgroundColor: "#14b8a6", padding: '5px', borderRadius: '5px', color: '#f8fafc', width: '5rem' }}>{productionProcessText}</span>;
                        }

                        
                    }}
                    />
    <Column field="output_quantity" header="Output Quantity" className='text-emerald-600 font-bold text-lg' />
    <Column field="output_bags" header="Output Bags" className='text-emerald-600 font-bold text-lg' />
    <Column 
      field="out_turn" 
      header="OutTurn" 
      className='text-emerald-600 font-bold text-lg' 
      body={(rowData)=>(<span>{rowData.out_turn}%</span>)}
      />
    <Column field="mc_in" header="MC IN" className='text-slate-600 font-bold text-lg' />
    <Column field="mc_out" header="MC OUT" className='text-slate-600 font-bold text-lg' />
    <Column
      field="loss_profit"
      header="Loss/profit"
      className="text-lime-600 font-bold text-lg"
      body={(rowData) =>
        rowData.loss_profit < 0 ? (
          <span className='text-slate-700'>{rowData.loss_profit}<i className="pi pi-arrow-down text-red-500" style={{ fontSize: '0.8rem' }}></i></span>
        ) : (
          <span className='text-slate-700'>{rowData.loss_profit}<i className="pi pi-arrow-up text-green-500" style={{ fontSize: '0.8rem' }}></i></span>
        )
      }
    />

    <Column field="lot_no" header="Lot No" />
    <Column field="completion_date" header="Completion Date" />
    {/* <Column field="status" header="Status" filter filterPlaceholder="" body={(rowData) => (rowData.status === 1 ? "Completed" : "Pending")}/> */}
    <Column
      field="status"
      header="Status"
      body={(rowData) =>
        rowData.status === 1 ? (
          <i className="pi pi-check" title='Completed' style={{ fontSize: '1.1rem',fontWeight:'bold', color:'#16a34a' }}></i>
        ) : (
          <i className="pi pi-fast-forward" title='Pending' style={{ fontSize: '1.1rem',fontWeight:'bold', color:'#0e7490' }}></i>
          // <Loader/>
        )
      }
    />
    <Column header="Actions" body={renderActions} />
</DataTable>
        </div>
        </div>
        
    );
}

import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';

export default function InProduction() {
    const [inproduction, setInproduction] = useState(null);
    const [globalFilterValue, setGlobalFilterValue] = useState('');

    // useEffect(() => {
    //     const requestOptions = {
    //         method: "GET",
    //         redirect: "follow"
    //     };

    //     fetch("http://127.0.0.1:8000/production/", requestOptions)
    //         .then((response) => response.json())
    //         .then((result) => {
    //             const formattedData = result.map(item => {
    //                 return {
    //                     id: item.id,
    //                     warehouse: item.warehouse,
    //                     section: item.section,
    //                     cell: item.cell,
    //                     coffetype: item.coffetype_id,
    //                     processtype: item.processtype,
    //                     production_process: item.production_process__name,
    //                     net_quantity: item.total_net_quantity,
    //                     batch_no:item.batch_no,
    //                     status: item.status,
    //                     total_bags: item.total_bags,
    //                     created_at: item.created_at
    //                 };
    //             });
    //             console.log(formattedData)
    //             setInproduction(formattedData);
    //         })
    //         .catch((error) => console.error(error));
    // }, []);

    useEffect(() => {
      const requestOptions = {
          method: "GET",
          redirect: "follow"
      };
  
      fetch("http://127.0.0.1:8000/production/", requestOptions)
          .then((response) => response.json())
          .then((result) => {
              const groupedData = result.reduce((acc, item) => {
                  const key = item.production_process__name;
                  if (!acc[key]) {
                      acc[key] = {
                          production_process: item.production_process__name,
                          total_net_quantity: parseInt(item.total_net_quantity),
                          status: item.status,
                          total_bags: item.total_bags,
                          created_at: item.created_at,
                          batch_nos: [item.batch_no]
                      };
                  } else {
                      acc[key].total_net_quantity += item.total_net_quantity;
                      acc[key].total_bags += item.total_bags;
                      acc[key].batch_nos.push(item.batch_no);
                      // You can aggregate other fields if needed
                  }
  
                  return acc;
              }, {});
  
              const formattedData = Object.values(groupedData);
              console.log(formattedData);
  
              setInproduction(formattedData);
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

    const renderActions = (rowData) => {
        // Implement your Production action logic here
        // console.log("Production clicked for row with ID:", rowData.id);
        return (
            <div className='gap-2'>
              <Link
                to={{
                  pathname: "/in-production-details",
                  search: `?wrn=${rowData.wrn}&coffetype=${rowData.coffetype}&processtype=${rowData.processtype}
                              &quantity_kgs=${rowData.quantity_kgs}&bags=${rowData.bags_no}&batch_nos=${rowData.batch_nos}
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
                <button className='bg-cyan-500 text-white p-2 rounded-md'>
                  Details
                </button>
              </Link>
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
              >
                <button className='bg-cyan-500 text-white p-2 rounded-md w-8'>
                  Exp
                </button>
              </Link> */}
        
            </div>
          );
    };

    const handleExport = (rowData) => {
        // Implement your Export action logic here
        console.log("Export clicked for row with ID:", rowData.id);
    };

    const renderBatchNos = (rowData) => {
      return (
          <div className="flex flex-wrap gap-2">
              {rowData.batch_nos.map((batch_no, index) => (
                  <span key={index} className="mb-2">
                      {index > 0 && <span> </span>}
                      <span className='bg-slate-100 text-cyan-900 p-2 m-1 rounded'>{batch_no}</span>
                  </span>
              ))}
          </div>
      );
  };
  
  

    function generateColor(inputString) {
        const predefinedColors = {
          'blue': '#0891b2',
          'green': '#059669',
          'orange': '#d97706',
        };
      
        // Simple hash function to generate a color from a string
        let hash = 0;
        for (let i = 0; i < inputString.length; i++) {
          hash = inputString.charCodeAt(i) + ((hash << 5) - hash);
        }
      
        // Convert the hash to an index to choose from predefined colors
        const index = Math.abs(hash) % Object.keys(predefinedColors).length;
      
        return predefinedColors[Object.keys(predefinedColors)[index]];
      }
      

    const header = renderHeader();

    return (
        <div>
            <div className='flex justify-between'>
                <span className='text-cyan-700 text-3xl font-bold font-sans ...'>
                COFFEE IN PRODUCTION
            </span>
            <div className='flex gap-3'>
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
                <button className='bg-sky-500 text-white p-2 rounded-md'>
                  Move To Export
                </button>
              </Link>  */}
              <Link
                to={{
                  pathname: "/in-production-movement-form",
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
                  Move to Another process
                </button>
              </Link>
            </div>
            
            </div>
            
            <div className="table-with-margin">
            <DataTable
                value={inproduction}
                paginator
                showGridlines
                rows={10}
                dataKey="id"
                globalFilter={globalFilterValue}
                emptyMessage="No Coffe In processing data found."
                header={header}
            >
              <Column
                field="batch_nos"
                header="Batch"
                filter
                filterPlaceholder="Search by Batch No"
                filterMatchMode="custom"
                filterFunction={(value, filter) => {
                    return value.some(batch_no => batch_no.includes(filter));
                }}
                body={renderBatchNos}
                style={{ maxWidth: '15rem' }} // Adjust the maximum width as needed
            />

                 <Column
                    field="production_process__name"
                    header="Production Process"
                    filter
                    filterPlaceholder="Search by Status"
                    body={(rowData) => {
                        const productionProcessText = rowData.production_process;
                        // const bgColor = generateColor(productionProcessText);
                        if(rowData.production_process === "processing"){
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
                          return <span style={{ backgroundColor: "#14b8a6", padding: '5px', borderRadius: '5px', color: '#f8fafc', width: '5rem' }}>{productionProcessText}</span>;
                        }
                        else {
                          return <span style={{ backgroundColor: "#047857", padding: '5px', borderRadius: '5px', color: '#f8fafc', width: '5rem' }}>{productionProcessText}</span>;
                        }

                        
                    }}
                    />
                <Column field="total_bags" header="Total Bags" filter filterPlaceholder="Search by Process Type" />
                
                {/* <Column field="batch_no" header="batch no" filter filterPlaceholder="Search by batch no " /> */}
                <Column field="total_net_quantity" header="net_quantity" filter filterPlaceholder="Search by WRN " />
                
                <Column
                    field="status"
                    header="Status"
                    filter
                    filterPlaceholder="Search by Status"
                    body={(rowData) => {
                        const statusText = rowData.status === 0 ? "Completed" : "On-going";
                        const bgColor = rowData.status === 0 ? "#059669" : "#0ea5e9";
                        const color="#f8fafc"

                        return <span style={{ backgroundColor: bgColor, padding: '5px', borderRadius: '5px',color:color,width:'5rem' }}>{statusText}</span>;
                    }}
                    />
                {/* <Column field="wrn" header="WRN" filter filterPlaceholder="Search by WRN" /> */}
                {/* <Column field="created_at" header="Date" filter filterPlaceholder="Search by Created At" /> */}
                <Column header="Actions" body={renderActions} />
            </DataTable>
        </div>
        </div>
        
    );
}

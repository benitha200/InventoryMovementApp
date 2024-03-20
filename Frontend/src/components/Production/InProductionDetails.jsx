import React, { useEffect, useState,useRef } from 'react';
import { MultiSelect } from 'primereact/multiselect';
import { Toast } from "primereact/toast";
import { Message } from "primereact/message";
import { useLocation } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Column } from 'primereact/column';
import { Link } from 'react-router-dom';

const InProductionDetails = () => {
  const [productionData, setproductionData] = useState([]);
  const [selectedBatchNos, setselectedBatchNos] = useState([]);
  const [formData, setFormData] = useState([]);
  const [process,setProcess]=useState([]);
  const [processFrom,setProcessFrom]=useState();
  const toast=useRef(null)
  const toast2 = useRef(null);
  const location = useLocation();
  const [stockData, setStockData] = useState(null);
  const [globalFilterValue, setGlobalFilterValue] = useState('');


  useEffect(() => {
    const batchNosArray = new URLSearchParams(location.search).getAll('batch_nos');
    const batchNosString = batchNosArray[0];

    // Splitting the string into individual batch numbers
    const batchNos = batchNosString.split(',');

    // Constructing the query parameters
    const queryParams = batchNos.map(batchNo => `batch_nos=${encodeURIComponent(batchNo)}`).join('&');

    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
};

const apiUrl = `http://127.0.0.1:8000/productiondetails/?${queryParams}`;

fetch(apiUrl, requestOptions)
  .then(response => response.json())
  .then(result =>{
     console.log(result);
     setStockData(result);
    
    })
  .catch(error => console.error(error));
    
    // get_production_process()
  }, []);

  const handleWRNChange = (e) => {
    setselectedBatchNos(e.value);
    // Reset form data when WRNs change
    setFormData([]);
  };


const handleInputChange = (index, name, value,selectedBatchNo) => {
    const newFormData = [...formData];

    if (name === 'quantity' && value > selectedBatchNo.net_quantity) {
        if (toast2.current) {
            toast2.current.show({ severity: 'error', summary: 'Error Message', detail: 'Entered quantity is greater than Total quantity. Please enter a valid quantity.' });
        }

        // Remove the entered quantity immediately from newFormData
        newFormData[index] = { ...newFormData[index], [name]: '' };
    } else {
        newFormData[index] = { ...newFormData[index], [name]: value };
    }

    setFormData(newFormData);
};

  const handleSubmit = async () => {
    // Send each WRN with its corresponding quantity one by one
    for (let index = 0; index < selectedBatchNos.length; index++) {
      const selectedBatchNo = selectedBatchNos[index];
      const data = {
        batch_no: selectedBatchNo.batch_no,
        moved_quantity: formData[index]?.quantity || 0,
        production_process_from:parseInt(selectedBatchNo.production_process.id),
        production_process_to:parseInt(process),
        net_quantity:selectedBatchNo.net_quantity,
      };

      try {
        const response = await fetch("http://127.0.0.1:8000/changeprocess/", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
      
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
      
        const responseData = await response.json(); // Parse the JSON data
      
        console.log(responseData);
      
        toast.current.show({ 
          severity: 'success', 
          summary: 'Success', 
          detail: `${responseData.message} \n `
        });
      
        // selectedBatchNo
        setselectedBatchNos([]);
      
        console.log(`WRN: ${selectedBatchNo.wrn}, Quantity: ${data.quantity}`);
        console.log(`WRN: ${selectedBatchNo.quantity_kgs}, Quantity: ${data.quantity}`);
      } catch (error) {
        console.error('Error submitting data:', error);
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Oops! Error occurred in submission' });
      }
      
    }
  };
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
  const renderActions = (rowData) => {
    console.log(rowData.bags);
    return (
        <div className='gap-2'>
          <Link
            to={{
              pathname: "/in-production-complete",
              search: `?production_process=${rowData.production_process.name}&production_process_id=${rowData.production_process.id}&bags=${rowData.bags}&quantity=${rowData.net_quantity}
                          &created_at=${rowData.created_at}&batch_no=${rowData.sub_batch}
                          `,
            
            }}
            className='m-2'
          >
            <button className='bg-green-500 text-white p-2 rounded-md w-full'>
              Complete
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
  const header = renderHeader();
  return (
    <div>
        <div className='text-3xl text-cyan-700 font-bold font-sans'>PRODUCTION DETAILS</div>
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
        <Column field="created_on" header="Date"/>
        <Column field="sub_batch" header="Batch No" filter />
        <Column
            field="coffetype"
            header="Coffee Type"
            filter
            filterPlaceholder="Search by Coffee Type"
            body={(rowData) => (rowData.coffetype === 1 ? "Green" : "Parchment")}
            />

        
        {/* <Column field="production_process_from" header="Process From"/>
        <Column field="production_process_to" header="Process To"/> */}
        <Column field="net_quantity" header="Total Quantity" />
        {/* <Column field="moved_quantity" header="Moved Quantity" /> */}
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
};

export default InProductionDetails;

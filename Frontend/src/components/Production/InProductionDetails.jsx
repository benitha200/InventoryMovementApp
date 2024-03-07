import React, { useEffect, useState,useRef } from 'react';
import { MultiSelect } from 'primereact/multiselect';
import { Toast } from "primereact/toast";
import { Message } from "primereact/message";
import { useLocation } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Column } from 'primereact/column';

const InProductionDetails = () => {
  const [productionData, setproductionData] = useState([]);
  const [selectedBatchNos, setselectedBatchNos] = useState([]);
  const [formData, setFormData] = useState([]);
  const [processes,setProcesses]=useState([]);
  const [process,setProcess]=useState([]);
  const [processFrom,setProcessFrom]=useState();
  const toast=useRef(null)
  const toast2 = useRef(null);
  const location = useLocation();
  const [stockData, setStockData] = useState(null);
  const [globalFilterValue, setGlobalFilterValue] = useState('');

  // function get_production_process(){
  //   const requestOptions = {
  //     method: "GET",
  //     redirect: "follow"
  //   };
    
  //   fetch("http://127.0.0.1:8000/production-process/", requestOptions)
  //     .then((response) => response.json())
  //     .then((result) => {
  //       console.log(result)
  //       setProcesses(result)
  //     })
  //     .catch((error) => console.error(error));
  // }

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

  const handleProcessFromChange = (e)=>{
    setProcessFrom(e.target.value)
    const fetchData = async () => {
        try {
          const response = await fetch(`http://127.0.0.1:8000/productiondata/${e.target.value}/`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const result = await response.json();
          setproductionData(result);
        } catch (error) {
          console.error('Error fetching stock data:', error);
        }
      };
      
  
      fetchData();

  }

//   const handleInputChange = (index, name, value,selectedBatchNo) => {
//     const newFormData = [...formData];
//     newFormData[index] = { ...newFormData[index], [name]: value };
//     if (name === 'quantity' && value > selectedBatchNo.net_quantity) {
//         // Display error message
//         messagesRef.current.show({
//             severity: 'error',
//             summary: 'Error Message',
//             detail: 'Entered quantity is greater than net_quantity. Please enter a valid quantity.',
//         });

//         // Remove the entered quantity immediately
//         value = '';
//     }
//     setFormData(newFormData);
//   };

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
        // body={renderActions}
        style={{ minWidth: '7rem' }} 
    />
    </DataTable>
    </div>
    </div>

  );
};

export default InProductionDetails;

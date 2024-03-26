import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { Inplace, InplaceDisplay, InplaceContent } from 'primereact/inplace';
import { Calendar } from 'primereact/calendar';

const ProductionOutputDetails = () => {
    const [searchParams] = useSearchParams();
    const [visible, setVisible] = useState(false);
    const [batchdetails,setBatchdetails]=useState();
    const [batchOutput, setBatchOutput] = useState();
    const [quantitykgs,setQuantityKgs]=useState();
    const [selectedCell,setSelectedCell]=useState();
    const [completiondate, setCompletiondate] = useState(null);

    const [stockQuantityTotal, setStockQuantityTotal] = useState(0);
    const [bagsTotal, setBagsTotal] = useState(0);
    const [outputQuantity, setOutputQuantity] = useState(0);
    const [outputBags, setOutputBags] = useState(0);
    // const [outputbags,setOutputbags]=useState();
    const [cells,setCells]=useState();

    // bagging off 
    const [lotNo,setLotNo]=useState();
    const [selectedQuality, setSelectedQuantity] = useState(null);

    const qualities = [
        // { name: 'C1', label: 'C1' },
        // { name: 'C2', label: 'C2' },
        // { name: 'ISIMBI', label: 'ISIMBI' },
        // { name: 'SPECIALITY', label: 'SPECIALITY' },
        { name: 'F.SC.15', label: 'F.SC.15' },
        { name: 'F.SC.13', label: 'F.SC.13' },
        { name: 'F.CSR.15', label: 'F.CSR.15' },
        { name: 'F.GTR.15', label: 'F.GTR.15' },
        { name: 'FW.TRI', label: 'FW.TRI' },
        { name: 'F.HPC.15', label: 'F.HPC.15' },
        { name: 'F.UNG', label: 'F.UNG' },
        { name: 'F.ORD', label: 'F.ORD' },
        { name: 'FW.TT', label: 'FW.TT' },
        { name: 'SC.15', label: 'SC.15' },
        { name: 'SC.13', label: 'SC.13' },
        { name: 'CSR.15', label: 'CSR.15' }
    ];
    


    


    const batch_no = searchParams.get('batch_no');
    const production_process=searchParams.get('production_process')
    const production_process_id=searchParams.get('production_process_id')
    const inputbags=searchParams.get('bags')
    const inputquantity=searchParams.get('quantity')
    const completion_date=searchParams.get('completion_date')

    function get_cells(){
        const requestOptions = {
          method: "GET",
          redirect: "follow"
        };
        
        fetch(`http://127.0.0.1:8000/cell/`, requestOptions)
          .then((response) => response.json())
          .then((result) =>{ 
            console.log("cells")
            console.log(result)
            setCells(result)
          })
          .catch((error) => console.error(error));
      }
      
    useEffect(()=>{

        function fetchbatchdetails() {
            const requestOptions = {
                method: "GET",
                redirect: "follow",
            };
        
            fetch(`http://127.0.0.1:8000/production-batch-details-after-completion/?batch_no=${batch_no}&production_process_id=${production_process_id}`, requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    console.log(result);
        
                    // Calculate totals
                    let stockQuantityTotal = 0;
                    let netQuantityTotal = 0;
                    let bagsTotal = 0;
        
                    result.forEach((item) => {
                        stockQuantityTotal += item.net_quantity || 0;
                        bagsTotal += item.bags || 0;
                    });
                    setStockQuantityTotal(stockQuantityTotal);
                    setBagsTotal(bagsTotal);
                    setBatchdetails(result);
                })
                .catch((error) => console.error(error));
        }
        
        function fetchbatchoutputdetails() {
            const requestOptions = {
                method: "GET",
                redirect: "follow"
            };
        
            fetch(`http://127.0.0.1:8000/production-output-per-batch/?batch_no=${batch_no}&production_process_id=${production_process_id}`, requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    console.log(result);
        
                    let outputQuantity = 0;
                    let outputBags = 0;
        
                    // Ensure result is an array before iterating
                    if (Array.isArray(result)) {
                        result.forEach((item) => {
                            outputQuantity += item.output_quantity || 0;
                            outputBags += item.output_bags || 0;
                        });
                    }
        
                    setOutputQuantity(outputQuantity);
                    setOutputBags(outputBags);
        
                    setBatchOutput(result);
                })
                .catch((error) => console.error(error));
        }
        
        fetchbatchoutputdetails();
        // "production-output-per-batch/"
        fetchbatchdetails();
        get_cells();
    },[])
    
    
    const handleComplete = async (e) => {
        
        e.preventDefault();
        console.log('Form submitted!');
        console.log(completiondate);
    
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        try {
            const response = await fetch("http://127.0.0.1:8000/production-complete/", {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify({
                    batch_no: batch_no,
                    completion_date: completiondate.toISOString().split('T')[0], 
                }),
                redirect: "follow",
            });
    
            const result = await response.json();
    
            if (response.ok) {
                if (result.batch_no) {
                    toast.current.show({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'You have successfully added a new item.',
                    });
                } else {
                    // Handle other cases if needed
                }
            } else {
                console.error('Error:', result);
            }
        } catch (error) {
            // Handle fetch or other errors
            console.error('Error:', error);
        }
    
        // fetchbatchoutputdetails();
  
    };

    const handleSubmit = async (e) => {
        
        e.preventDefault();
        setVisible(false);
        console.log('Form submitted!');
        console.log(selectedCell);
    
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        try {
            const response = await fetch("http://127.0.0.1:8000/productionoutput/", {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify({
                    batch_no: batch_no,
                    warehouse: selectedCell, 
                    output_quality: selectedQuality?.name,
                    output_quantity: quantitykgs,
                    production_process: production_process_id,
                    lot_no:lotNo || "-",
                }),
                redirect: "follow",
            });
    
            const result = await response.json();
    
            if (response.ok) {
                if (result.batch_no) {
                    toast.current.show({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'You have successfully added a new item.',
                    });
                } else {
                    // Handle other cases if needed
                }
                setVisible(false);
            } else {
                console.error('Error:', result);
            }
        } catch (error) {
            // Handle fetch or other errors
            console.error('Error:', error);
        }
    
        fetchbatchoutputdetails();
  
    };
    
  return (
    <div>
            <div className='flex flex-row justify-between'>
                <div className='flex flex-col m-2 gap-2 pb-3 text-slate-700'>
                    <span className='uppercase text-2xl font-bold'>COMPLETED ON {completion_date}  </span>
                    <span className='text-xl'>BATCH NO: {batch_no} </span>
                </div>
            <div>
            
            </div>
            </div>
            
            {production_process === 'Processing' || 'procesing' && (
               <div className='gap-2 m-2 p-2'>
                
                <div className="card bg-gray-50 mt-4 shadow-none">
                <span className='text-xl m-2 font-bold pb-5'>INPUT </span>
                    <DataTable value={batchdetails} tableStyle={{ minWidth: '50rem' }}>
                        <Column field="processtype.type_name" header="Grade"></Column>
                        <Column field="cell.cell_label" header="Warehouse"></Column>
                        <Column field="wrn" header="WRN"></Column>
                        <Column field="net_quantity" header="Quantity"></Column>
                        
                    </DataTable>
                    <div className="flex gap-10 text-center mt-4 text-slate-600">
                        <span className="font-bold ita">TOTAL STOCK QUANTITY: <span className='text-green-600 text-xl'>{stockQuantityTotal} KGS</span></span>
                        
                        <span className="font-bold">TOTAL BAGS: <span className='text-green-600 text-xl'>{bagsTotal} Bags</span> </span>
                    </div>
                </div>

                <div className="card bg-gray-50 mt-4 shadow-none">
                {/* <div className='flex flex-row justify-between'> */}
                    <span className='text-xl m-2 font-bold pb-5'>OUTPUT</span>

                    <DataTable value={batchOutput} tableStyle={{ minWidth: '50rem' }} className='mt-2'>
                        <Column field="output_quality" header="Output"></Column>
                        <Column field="output_quantity" header="Output Quantity"></Column>
                        <Column field="output_bags" header="Output Bags"></Column>
                        <Column field="warehouse" header="Warehouse"></Column>
                    </DataTable>
                    <div className="flex gap-8 text-left mt-4 text-slate-600">
                        <span className="font-bold">TOTAL STOCK QUANTITY: <span className='text-green-600 text-xl'>{outputQuantity} KGS</span></span>
                        <br />
                        <span className="font-bold">TOTAL BAGS: <span className='text-green-600 text-xl'>{outputBags} Bags</span> </span>
                    </div>
                </div>
            </div> 
            )}

            {production_process === 'bagging off' && (
               <div className='gap-2 m-2 p-2'>
                
                <div className="card bg-gray-100">
                <span className='text-xl m-2 font-bold pb-5'>INPUT BATCH</span>
                    <DataTable value={batchdetails} tableStyle={{ minWidth: '50rem' }}>
                        {/* <Column field="warehouse" header="Warehouse"></Column> */}
                        {/* <Column field="section" header="Section"></Column> */}
                        <Column field="cell.cell_label" header="Warehouse"></Column>
                        <Column field="sub_batch" header="Batch No"></Column>
                        <Column field="bags" header="Bags"></Column>
                        <Column field="net_quantity" header="Quantity"></Column>

                        
                    </DataTable>
                    <div className="flex gap-2 text-center mt-4">
                        <span className="font-bold">Total Stock Quantity: {stockQuantityTotal}</span>
                        
                        <span className="font-bold">Total Bags: {bagsTotal}</span>
                    </div>
                    
                </div>

                <div className="card bg-gray-100 mt-3 flex flex-col">
                {/* <div className='flex flex-row justify-between'> */}
                    <span className='text-xl m-2 font-bold pb-5'>OUTPUT</span>

                    <DataTable value={batchOutput} tableStyle={{ minWidth: '50rem' }}>
                        <Column field="output_quality" header="Output"></Column>
                        <Column field="output_quantity" header="Output Quantity"></Column>
                        <Column field="output_bags" header="Output Bags"></Column>
                        <Column field="warehouse" header="Warehouse"></Column>
                    </DataTable>
                    <div className="mt-4">
                        <span className="font-bold">Total Stock Quantity: <span className='text-green-600 text-xl'>{outputQuantity}</span></span>
                        <br />
                        <span className="font-bold">Total Bags: <span className='text-green-600 text-xl'>{outputBags}</span></span>
                    </div>
                    
                </div>
            </div> 
            )}

            
    </div>
  )
}

export default ProductionOutputDetails
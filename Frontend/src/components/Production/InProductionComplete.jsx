import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { Inplace, InplaceDisplay, InplaceContent } from 'primereact/inplace';
import { Calendar } from 'primereact/calendar';

const InProductionComplete = () => {
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
    const [mcOut,setMcOut]=useState();
    const [cells,setCells]=useState();

    // bagging off 
    const [lotNos,setLotNos]=useState();
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
    
      function get_lots(){
        const requestOptions = {
          method: "GET",
          redirect: "follow"
        };
        
        fetch(`http://127.0.0.1:8000/lots/`, requestOptions)
          .then((response) => response.json())
          .then((result) =>{ 
            console.log("lots")
            console.log(result)
            setLotNos(result)
          })
          .catch((error) => console.error(error));
      }
      
    useEffect(()=>{

        function fetchbatchdetails() {
            const requestOptions = {
                method: "GET",
                redirect: "follow",
            };
        
            fetch(`http://127.0.0.1:8000/productionbatchdetails/?batch_no=${batch_no}&production_process_id=${production_process_id}`, requestOptions)
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
        
        function fetchbatchoutputdetails(){
            const requestOptions = {
            method: "GET",
            redirect: "follow"
            };

            fetch(`http://127.0.0.1:8000/production-output-per-batch/?batch_no=${batch_no}&production_process_id=${production_process_id}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result)
                // console.log(result);
        

                let outputQuantity = 0;
                let outputBags = 0;
        
                result.forEach((item) => {
                    outputQuantity += item.output_quantity || 0;
                    outputBags += item.output_bags || 0;
                });
                setOutputQuantity(outputQuantity);
                setOutputBags(outputBags);

                setBatchOutput(result)
            })
            .catch((error) => console.error(error));
            
        }
        fetchbatchoutputdetails();
        // "production-output-per-batch/"
        fetchbatchdetails();
        get_cells();
        get_lots();
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
                    mc_out:mcOut
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
                <div className='flex flex-col m-2 gap-2 pb-3 text-cyan-900'>
                    <span className='uppercase text-xl font-bold text-u'>COMPLETE " {production_process} " </span>
                    <span className='text-xl'>BATCH NO: {batch_no} </span>
                </div>
            <div>
            <form onSubmit={handleComplete} className='flex gap-2'>
                <Calendar value={completiondate} 
                    placeholder='Completion Date' 
                    onChange={(e) => setCompletiondate(e.value)} 
                    required 
                    className='w-full border-2 border-gray-200 h-12 rounded py-2'
                    // dateFormat='yy-mm-dd'
                    />
                <div className="mb-4">
                  <input
                    type="text"
                    value={mcOut}
                    onChange={(e) => setMcOut(e.target.value)}
                    placeholder="Enter Moisture content"
                    required
                    className="md:w-14rem h-12  bg-gray-200 appearance-none border-2 border-gray-200 rounded py-1 px-1 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-50"
                  />
            </div>
            {batchOutput && (
                <button
                    type="submit"
                    className="mx-auto pl-5 h-12 shadow bg-cyan-500 hover:bg-cyan-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                >
                    Complete
                </button>
            )}

            {!batchOutput && (
                <button
                    type="submit"
                    hidden
                    className="mx-auto pl-5 h-12 shadow bg-cyan-500 hover:bg-cyan-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                >
                    Complete
                </button>
            )}

                
            </form>
            
            </div>
            </div>
            
            {production_process === 'processing' && (
               <div className='gap-2 m-2 p-2'>
                
                <div className="flex flex-col card bg-gray-100">
                <span className='text-xl m-2 font-bold pb-5'>INPUT WRNs</span>
                    <DataTable value={batchdetails} tableStyle={{ minWidth: '50rem' }}>
                        <Column field="processtype.type_name" header="Grade"></Column>
                        <Column field="cell.cell_label" header="Warehouse"></Column>
                        <Column field="wrn" header="WRN"></Column>
                        <Column field="net_quantity" header="Quantity"></Column>
                        <Column field="bags" header="Bags"></Column>
                        
                    </DataTable>
                    <div className="flex gap-2 text-center mt-4">
                        <span className="font-bold">Total Stock Quantity: {stockQuantityTotal}</span>
                        
                        <span className="font-bold">Total Bags: {bagsTotal}</span>
                    </div>
                </div>

                <div className="flex flex-col card bg-gray-100 mt-3">
                {/* <div className='flex flex-row justify-between'> */}
                    <span className='text-xl m-2 font-bold pb-5'>OUTPUT</span>

                <Inplace className='mb-3 '>
                    <InplaceDisplay>
                        <button className='bg-emerald-500 p-3 text-gray-50 mt-2 rounded' onClick={() => setVisible(true)}>
                            <span >Add New Output</span>
                        </button>
                    </InplaceDisplay>
                    <InplaceContent>
                        <div className='w-full bg-white shadow-sm rounded-md pt-2 '>
                            <span className='text-xl m-2 font-bold pb-5'>ADD OUTPUT</span>
                            <form onSubmit={handleSubmit}>
                                <div className="w-full flex flex-row gap-3 p-4  rounded-md">
                                    <div className='flex flex-col'>
                                    <label className='p-2'>Warehouse</label>
                                    <Dropdown
                                        value={selectedCell}
                                        onChange={(e) => setSelectedCell(e.value)}
                                        options={cells && cells.map((cell) => ({ name: cell.cell_label, value: cell.cell_label }))}
                                        optionLabel="name"
                                        placeholder="Select Cell"
                                        filter
                                        className="w-80 md:w-14rem h-12  border-2 border-gray-200"
                                    />
                                    </div>
                                    <div className='flex flex-col'>
                                    <span className='p-2'>Quantity</span>
                                    <input
                                        type="text"
                                        name="quantity"
                                        value={quantitykgs}
                                        onChange={(e) => setQuantityKgs(e.target.value)}
                                        placeholder='Quantity'
                                        className="w-70 h-12 mt- bg-gray-200 appearance-none border-2 border-gray-00 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-50"
                                    />
                                    </div>
                                    <div className='flex flex-col flex-wrap'>
                                    <span className='p-2'>Grade</span>
                                    <Dropdown
                                        value={selectedQuality}
                                        onChange={(e) => setSelectedQuantity(e.value)}
                                        options={qualities}
                                        optionLabel="name"
                                        placeholder="Select a Grade"
                                        className="w-80 md:w-14rem h-12  bg-gray-200 appearance-none border-2 border-gray-200 rounded text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-50"
                                    />
                                    </div>

                                    <button
                                        type="submit"
                                        className="mx-auto p-2 shadow w-40 mt-10 md:w-14rem h-12 bg-cyan-500 hover:bg-cyan-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </InplaceContent>
                </Inplace>
                    <DataTable value={batchOutput} tableStyle={{ minWidth: '50rem' }}>
                        <Column field="output_quality" header="Output Grade"></Column>
                        <Column field="warehouse" header="Warehouse"></Column>
                        <Column field="batch_no" header="Batch no"></Column>
                        <Column field="output_quantity" header="Output Quantity"></Column>
                        <Column field="output_bags" header="Output Bags"></Column>
                        
                    </DataTable>
                    <div className="text-left mt-4">
                        <span className="font-bold">Total Stock Quantity: {outputQuantity}</span>
                        
                        <span className="font-bold ml-5">Total Bags: {outputBags}</span>
                    </div>
                </div>
            </div> 
            )}

            {production_process === 'Bagging Off' && (
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

                <div className="card bg-gray-100 mt-3">
                {/* <div className='flex flex-row justify-between'> */}
                    <span className='text-xl m-2 font-bold pb-5'>OUTPUT</span>

                <Inplace className='mb-3 '>
                    <InplaceDisplay>
                        <button className='bg-emerald-500 p-3 text-gray-50 mt-2 rounded' onClick={() => setVisible(true)}>
                            <span >Add New Output</span>
                        </button>
                    </InplaceDisplay>
                    <InplaceContent>
                        <div className='w-full bg-white shadow-sm rounded-md pt-2 '>
                            <span className='text-xl m-2 font-bold pb-5'>ADD OUTPUT</span>
                            <form onSubmit={handleSubmit}>
                                <div className="w-full flex flex-row gap-3 p-4  rounded-md">
                                    <label className='p-2'>Warehouse</label>
                                    <Dropdown
                                        value={selectedCell}
                                        onChange={(e) => setSelectedCell(e.value)}
                                        options={cells && cells.map((cell) => ({ name: cell.cell_label, value: cell.cell_label }))}
                                        optionLabel="name"
                                        placeholder="Select Cell"
                                        filter
                                        className="w-full md:w-14rem h-12  border-2 border-gray-200"
                                    />
                                    <span className='p-2'>Quantity</span>
                                    <input
                                        type="text"
                                        name="quantity"
                                        value={quantitykgs}
                                        onChange={(e) => setQuantityKgs(e.target.value)}
                                        placeholder='Quantity'
                                        className="w-full h-12 mt- bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-50"
                                    />
                                    <span className='p-2'>Quality</span>
                                    <Dropdown
                                        value={selectedQuality}
                                        onChange={(e) => setSelectedQuantity(e.value)}
                                        options={qualities}
                                        optionLabel="name"
                                        placeholder="Select a Quality"
                                        className="w-full md:w-14rem h-12  bg-gray-200 appearance-none border-2 border-gray-200 rounded text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-50"
                                    />
                                    <span className='p-2'>Lot No</span>
                                    <Dropdown
                                        value={lotNo}
                                        onChange={(e) => setLotNo(e.value)}
                                        options={lotNos && lotNos.map((lot) => ({ name: lot.lot_no, value: lot.lot_no }))}
                                        optionLabel="name"
                                        placeholder="Select Lot No"
                                        filter
                                        className="w-80 md:w-14rem h-12  border-2 border-gray-200"
                                    />
                                    {/* <input
                                        type="text"
                                        name="quantity"
                                        value={lotNo}
                                        onChange={(e) => setLotNo(e.target.value)}
                                        placeholder='Lot No'
                                        className="w-full h-12 mt- bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-50"
                                    /> */}

                                    <button
                                        type="submit"
                                        className="mx-auto p-2 h-12 shadow w-2/4 bg-cyan-500 hover:bg-cyan-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </InplaceContent>
                </Inplace>
                    <DataTable value={batchOutput} tableStyle={{ minWidth: '50rem' }}>
                        <Column field="output_quality" header="Output"></Column>
                        <Column field="output_quantity" header="Output Quantity"></Column>
                        <Column field="output_bags" header="Output Bags"></Column>
                        <Column field="warehouse" header="Warehouse"></Column>
                    </DataTable>
                    <div className="text-right mt-4">
                        <span className="font-bold">Total Stock Quantity: {outputQuantity}</span>
                        <br />
                        <span className="font-bold">Total Bags: {outputBags}</span>
                    </div>
                </div>
            </div> 
            )}

            
    </div>
  )
}

export default InProductionComplete
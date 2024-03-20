import React, { useEffect, useState, useRef } from 'react';
import { MultiSelect } from 'primereact/multiselect';
import { Toast } from "primereact/toast";
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';

const ProductionMovement = () => {
  const [stockData, setStockData] = useState([]);
  const [selectedWRNs, setSelectedWRNs] = useState([]);
  const [formData, setFormData] = useState([]);
  const [batches, setBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState();
  const [processes, setProcesses] = useState([]);
  const [process, setProcess] = useState();
  const [batchNo, setBatchNo] = useState();
  const [lotNumber, setLotNumber] = useState('');
  const [grn, setGRN] = useState('');
  const [cells,setCells]=useState('');
  const [selectedCell,setSelectedCell]=useState();

  //bagging off 
  const[quantity,setQuantity]=useState(); 

  const [newBatch,setNewBatch]=useState();

  const toast = useRef(null)
  const toast2 = useRef(null)

  const originCellOptions = [
    { label: 'A1', value: 'A1' },
    { label: 'A2', value: 'A2' },
    { label: 'B1', value: 'B1' },
    { label: 'B2', value: 'B2' },
    // Add more origin cell options as needed
  ];

  function get_production_process() {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };

    fetch("http://127.0.0.1:8000/production-process/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        setProcesses(result)
      })
      .catch((error) => console.error(error));
  }

  function get_batch() {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };

    fetch("http://127.0.0.1:8000/batches/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        setBatches(result)
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/stockdata/");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setStockData(result);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };
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
    get_cells();
    get_batch();
    fetchData();
    get_production_process()
  }, []);

  // const handleBatchInputChange = (e) => {
  //   // setBatchNo(e.target.value);
  //   setNewBatch(e.target.value);
  //   // setSelectedBatch(null); // Clear the selection when the input changes
  // };

  const handleBatchDropdownChange = (e) => {
    setBatchNo(e.value);
    setSelectedBatch(e.value);
  };

  const handleBatchInputChange = (e) => {
    setNewBatch(e.target.value);
    // Clear the selection when the input changes
    setSelectedBatch(null);
  };
  

  const handleWRNChange = (e) => {
    setSelectedWRNs(e.value);
    setFormData([]);
  };

  const handleInputChange = (index, name, value, selectedWRN) => {
    const newFormData = [...formData];

    if (name === 'quantity' && value > selectedWRN.quantity_kgs) {
      if (toast2.current) {
        toast2.current.show({ severity: 'error', summary: 'Error Message', detail: 'Entered quantity is greater than Total quantity. Please enter a valid quantity.' });
      }

      newFormData[index] = { ...newFormData[index], [name]: '' };
    } else {
      newFormData[index] = { ...newFormData[index], [name]: value };
    }

    setFormData(newFormData);
  };

  const handleOriginCellChange = (selectedCells) => {
    const newFormData = [...formData];
    newFormData[index] = { ...newFormData[index], originCell: selectedCells };
    setSelectedCell(selectedCells)
    setFormData(newFormData);
  };

  const handleSubmit = async () => {
    console.log(process)
    if(selectedWRNs.length >0){
      for (let index = 0; index < selectedWRNs.length; index++) {
      const selectedWRN = selectedWRNs[index];
      const data = {
        wrn: selectedWRN.wrn || 0,
        quantity: parseInt(formData[index]?.quantity || 0),
        production_process: process,
        batchno: batchNo,
        lotNumber: process === 'Rebagging' ? lotNumber : "",
        grn: process === 'Repassing' ? grn : "",
        cell_from: selectedCell,
        sub_batch:newBatch
      };

      try {
        const response = await fetch("http://127.0.0.1:8000/api/production/create/", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const responseData = await response.json();

        toast.current.show({
          severity: 'success',
          summary: 'Success',
          detail: `${responseData.message} \n "Batch No:" ${newBatch}`
        });

        setSelectedWRNs([]);
      } catch (error) {
        console.error('Error submitting data:', error);
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Oops! Error occurred in submission' });
      }

    }
    }
    else{
      console.log(newBatch)
      const data = {
        wrn: selectedWRNs.wrn || 0,
        quantity: quantity,
        production_process: process,
        batchno: batchNo,
        lotNumber: process === 'Rebagging' ? lotNumber : "",
        grn: process === 'Repassing' ? grn : "",
        cell_from: selectedCell,
        sub_batch:newBatch
      };
      try {
        const response = await fetch("http://127.0.0.1:8000/api/production/create/", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const responseData = await response.json();

        toast.current.show({
          severity: 'success',
          summary: 'Success',
          detail: `${responseData.message} \n "Batch No:" ${newBatch}`
        });
      } catch (error) {
        console.error('Error submitting data:', error);
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Oops! Error occurred in submission' });
      }

    }
    
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-2/4 p-4 bg-white shadow-md rounded-md">
        <span className="text-cyan-700 text-3xl font-bold font-sans mb-4">
          MOVE TO PRODUCTION
        </span>
        <div className="mb-4 mt-4">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="warehouse">
            Process
          </label>
          <Dropdown
            value={process}
            onChange={(e) => setProcess(e.value)}
            options={processes.map((process_) => ({ label: process_.name, value: process_.name }))}
            optionLabel="label"
            placeholder="Select Activity"
            className="w-full md:w-14rem  bg-gray-200 appearance-none border-2 border-gray-200 rounded py-1 px-1 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-50"
          />
        </div>
        {process === 'Rebagging' && (
          <div className="mb-4">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="warehouse">
              Lot Number
            </label>
            <input
              type="text"
              value={lotNumber}
              onChange={(e) => setLotNumber(e.target.value)}
              placeholder="Enter Lot Number"
              className="w-full md:w-14rem  bg-gray-200 appearance-none border-2 border-gray-200 rounded py-1 px-1 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-50"
            />
          </div>
        )}
        {process === 'Repassing' && (
          <div className="mb-4">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="warehouse">
              GRN
            </label>
            <input
              type="text"
              value={grn}
              onChange={(e) => setGRN(e.target.value)}
              placeholder="Enter GRN"
              className="w-full md:w-14rem  bg-gray-200 appearance-none border-2 border-gray-200 rounded py-1 px-1 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-50"
            />
          </div>
        )}
        <div className="mb-4">
        {/* <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="warehouse">
            Select Batch No
          </label>
          <Dropdown
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.value)}
            options={batches.map((batch) => ({ label: batch.batch_no, value: batch.batch_no }))}
            optionLabel="label"
            placeholder="Select a Batch No"
            className="w-full md:w-14rem  bg-gray-200 appearance-none border-2 border-gray-200 rounded py-1 px-1 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-50"
          />  */}

          {/* <div className="flex items-center w-full gap-2">
            <Dropdown
                      value={selectedBatch}
                      options={batches.map((batch) => ({ label: batch.batch_no, value: batch.batch_no }))}
                      onChange={handleBatchDropdownChange}
                      placeholder="Select Batch No"
                      className="ml-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded py-1 px-1 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-50"
                    />
            <InputText
              value={selectedBatch}
              onChange={handleBatchInputChange}
              defaultValue={selectedBatch}
              placeholder="Enter Batch No"
              className="w-full md:w-14rem bg-gray-200 appearance-none border-2 border-gray-200 rounded py-1 px-1 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-50"
            />
          
          </div> */}
          <div className="flex items-center w-full gap-2">
            <Dropdown
              value={selectedBatch}
              options={batches.map((batch) => ({ label: batch.batch_no, value: batch.batch_no }))}
              onChange={handleBatchDropdownChange}
              placeholder="Select Batch No"
              className="bg-gray-200 h-14 appearance-none border-2 border-gray-200 rounded py-1 px-1 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-50"
            />
            <input
              type="text"
              value={selectedBatch}
              onChange={handleBatchInputChange}
              placeholder="Enter Batch No"
              className="w-full md:w-14rem h-14 bg-gray-200 appearance-none border-2 border-gray-200 rounded py-1 px-1 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-50"
            />
          </div>


        </div>
        
        {process === 'Processing' && (
          <>
          
          <div className="flex justify-center p-2">
            <MultiSelect
              value={selectedWRNs}
              onChange={handleWRNChange}
              options={stockData}
              optionLabel="wrn"
              filter
              placeholder="Select WRNs"
              maxSelectedLabels={3}
              className="w-full border-solid border-2 border-slate-400 md:w-10rem"
            />
          </div>
        

        {selectedWRNs.map((selectedWRN, index) => (
          <>
          <div key={index} className="mb-4">
            <span className='font-sans'>
              WRN: <strong className='font-sans'>{selectedWRN.wrn}</strong> |
              Quantity In Stock <strong className='font-sans'>{selectedWRN.quantity_kgs}</strong> |
              Bags No <strong className='font-sans'>{selectedWRN.bags_no}</strong>
            </span>
            <input
              type="number"
              name={`quantity_${index}`}
              value={formData[index]?.quantity || ''}
              onChange={(e) => handleInputChange(index, 'quantity', e.target.value, selectedWRN)}
              placeholder='Moved Quantity'
              className="w-full bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-50"
            />
          </div>
          <input
              type="number"
              name={`moved_bags_${index}`}
              value={formData[index]?.movedBags || ''}
              onChange={(e) => handleInputChange(index, 'movedBags', e.target.value, selectedWRN)}
              placeholder='Moved Bags'
              className="w-full bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-50 mt-2"
            />
            {/* <MultiSelect
              value={formData[index]?.originCell || []}
              onChange={(e) => handleOriginCellChange(index, e.value)}
              options={originCellOptions}
              optionLabel="label"
              placeholder="Select Origin Cell"
              maxSelectedLabels={3}
              className="w-full border-solid border-2 border-slate-400 md:w-10rem mt-2"
            /> */}
          </>
          
        ))}
        
            
        {/* <Dropdown
            value={selectedCell}
            onChange={(e) => setSelectedCell(e.target.value)}
            options={cells && cells.map((cell) => ({ name: cell.cell_label, value: cell.cell_label }))}
            optionLabel="name"
            placeholder="Select Cell"
            filter
            className="w-full md:w-14rem h-12  border-2 border-gray-200 mt-2"
             />             */}
            <Toast ref={toast2} />
          
          </>
      )} 

      {process === 'Bagging Off' && (
        <>
      
                <div className="mb-4">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="warehouse">
                    Quantity
                  </label>
                  <input
                    type="text"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="Enter Quantity"
                    className="w-full md:w-14rem h-12  bg-gray-200 appearance-none border-2 border-gray-200 rounded py-1 px-1 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-50"
                  />
                </div>
                <Dropdown
                value={selectedCell}
                onChange={(e) => setSelectedCell(e.target.value)}
                options={cells && cells.map((cell) => ({ name: cell.cell_label, value: cell.cell_label }))}
                optionLabel="name"
                placeholder="Select Cell From"
                filter
                className="w-full md:w-14rem h-12 mb-2  border-2 border-gray-200 mt-2"
                 />            
                <Toast ref={toast2} />
              
              </>
              )}
        
        <button
          className="mx-auto shadow w-2/4 bg-cyan-500 hover:bg-cyan-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded mt-2"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
      <Toast ref={toast} />
    </div>
  );
};

export default ProductionMovement;

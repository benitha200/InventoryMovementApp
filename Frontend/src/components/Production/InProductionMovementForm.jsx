import React, { useEffect, useState, useRef } from 'react';
import { MultiSelect } from 'primereact/multiselect';
import { Toast } from "primereact/toast";
import { Message } from "primereact/message";

const InProductionMovementForm = () => {
  const [productionData, setproductionData] = useState([]);
  const [selectedBatchNos, setselectedBatchNos] = useState([]);
  const [formData, setFormData] = useState([]);
  const [processes, setProcesses] = useState([]);
  const [process, setProcess] = useState([]);
  const [processFrom, setProcessFrom] = useState();
  const toast = useRef(null)
  const toast2 = useRef(null);

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

  useEffect(() => {

    get_production_process()
  }, []);

  const handleWRNChange = (e) => {
    setselectedBatchNos(e.value);
    // Reset form data when WRNs change
    setFormData([]);
  };

  const handleProcessFromChange = (e) => {
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



  const handleInputChange = (index, name, value, selectedBatchNo) => {
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
        production_process_from: parseInt(selectedBatchNo.production_process.id),
        production_process_to: parseInt(process),
        net_quantity: selectedBatchNo.net_quantity,
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

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-2/4 p-4 bg-white shadow-md rounded-md">
        <span className="text-cyan-700 text-3xl font-bold font-sans mb-4">
          MOVE TO ANOTHER PROCESS
        </span>

        <div className="mb-4">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 font-sans" htmlFor="warehouse">
            Process From
          </label>
          <select
            value={processFrom}
            // onChange={(e) => setProcessFrom(e.target.value)}
            onChange={handleProcessFromChange}
            className="w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="process"
            required
          >
            <option>Select Process</option>
            {processes && processes.map((process) => (
              <option key={process.id} value={process.id}>
                {process.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-center p-2">
          <MultiSelect
            value={selectedBatchNos}
            onChange={handleWRNChange}
            options={productionData}
            optionLabel="batch_no"
            filter
            placeholder="Select Batch No"
            maxSelectedLabels={3}
            className="w-full border-solid border-2 border-slate-400 md:w-10rem"
          />
        </div>

        {selectedBatchNos.map((selectedBatchNo, index) => (
          <div key={index} className="mb-4">
            <label className="block mb-1">
              <span className='font-sans'>
                Batch: <strong className='font-sans'>{selectedBatchNo.batch_no}</strong> |
                Quantity In Stock <strong className='font-sans'>{selectedBatchNo.net_quantity}</strong> |
                Bags No <strong className='font-sans'>{selectedBatchNo.bags}</strong> |
                Production Process <strong className='font-sans'>{selectedBatchNo.production_process.name}</strong>
              </span>
            </label>
            <input
              type="number"
              name={`quantity_${index}`}
              value={formData[index]?.quantity || ''}
              onChange={(e) => handleInputChange(index, 'quantity', e.target.value, selectedBatchNo)}
              placeholder='Moved Quantity'
              className="w-full bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-50"
            />
            <Toast ref={toast2} />
          </div>

        ))}

        <div className="mb-4">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 font-sans" htmlFor="warehouse">
            Process To
          </label>
          <select
            value={process}
            onChange={(e) => setProcess(e.target.value)}
            className="w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="process"
            required
          >
            <option>Select Process</option>
            {processes && processes.map((process) => (
              <option key={process.id} value={process.id}>
                {process.name}
              </option>
            ))}
          </select>
        </div>

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

export default InProductionMovementForm;

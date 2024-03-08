import React, { useEffect, useState, useRef } from 'react';
import { MultiSelect } from 'primereact/multiselect';
import { Toast } from "primereact/toast";

const ProductionMovement = () => {
  const [stockData, setStockData] = useState([]);
  const [selectedWRNs, setSelectedWRNs] = useState([]);
  const [formData, setFormData] = useState([]);
  const [processes, setProcesses] = useState([]);
  const [process, setProcess] = useState([]);
  const [batchNo, setBatchNo] = useState();

  const toast = useRef(null)
  const toast2 = useRef(null)

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
    const fetchMaxBatchNo = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/max-batch-no/");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        console.log(result);

        let newBatchNo;

        if (Object.keys(result).length === 0) {
          newBatchNo = "00001";
        } else {
          let numericBatchNo = parseInt(result.max_batch_no, 10);
          numericBatchNo++;

          newBatchNo = String(numericBatchNo).padStart(result.max_batch_no.length, '0');
        }

        console.log(newBatchNo);
        setBatchNo(newBatchNo);
        //   console.log(result);
        //   setBatchNo(result.batch_no);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    fetchMaxBatchNo();

    fetchData();
    get_production_process()
  }, []);

  const handleWRNChange = (e) => {
    setSelectedWRNs(e.value);
    // Reset form data when WRNs change
    setFormData([]);
  };

  const handleInputChange = (index, name, value, selectedWRN) => {
    const newFormData = [...formData];

    if (name === 'quantity' && value > selectedWRN.quantity_kgs) {
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
    for (let index = 0; index < selectedWRNs.length; index++) {
      const selectedWRN = selectedWRNs[index];
      const data = {
        wrn: selectedWRN.wrn,
        quantity: parseInt(formData[index]?.quantity || 0),
        production_process: parseInt(process),
        batchno: batchNo
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

        const responseData = await response.json(); // Parse the JSON data

        console.log(responseData);

        toast.current.show({
          severity: 'success',
          summary: 'Success',
          detail: `${responseData.message} \n "Batch No:" ${batchNo}`
        });

        // selectedWRN
        setSelectedWRNs([]);

        console.log(`WRN: ${selectedWRN.wrn}, Quantity: ${data.quantity}`);
        console.log(`WRN: ${selectedWRN.quantity_kgs}, Quantity: ${data.quantity}`);
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
          <div key={index} className="mb-4">
            <label className="block mb-1">
              <span>WRN: <strong>{selectedWRN.wrn} </strong></span><br /><span>Quantity In Stock <strong>{selectedWRN.quantity_kgs}</strong></span>
              <br /><span>Bags No <strong>{selectedWRN.bags_no}</strong></span>
            </label>
            <input
              type="number"
              name={`quantity_${index}`}
              value={formData[index]?.quantity || ''}
              onChange={(e) => handleInputChange(index, 'quantity', e.target.value, selectedWRN)}
              placeholder='Moved Quantity'
              className="w-full bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-50"
            />
            <Toast ref={toast2} />
          </div>

        ))}



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

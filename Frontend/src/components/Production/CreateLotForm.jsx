import { InputText } from 'primereact/inputtext'
import React, { useRef } from 'react'
import { useState } from 'react'
import { Dropdown } from 'primereact/dropdown';
import { Toast } from "primereact/toast";

const CreateLotForm = () => {
    const [lot,setLot]=useState();
    const [selectedQuality, setSelectedQuantity] = useState(null);
    const toast=useRef(null)
    const qualities = [
        { name: 'Fully Wached C', code: 'FW C' },
        { name: 'Fully Washed NC', code: 'FW NC' },
        { name: 'Semi Wached C', code: 'SW C' },
        { name: 'Semi Washed NC', code: 'SW NC' },
    ];

    const handleSubmit = () =>{
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
        "lot_no": lot,
        "quality": selectedQuality.code
        });

        const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
        };

        fetch("http://127.0.0.1:8000/lot/create/", requestOptions)
        .then((response) => response.json())
        .then((result) => {
            if(result.lot_no){
                toast.current.show({ severity: 'success', summary: 'Success', detail: 'You have successfully created a Lot' });
            }
        })
        .catch((error) => console.error(error));
    }
  return (
    <div className="flex justify-center items-center h-screen">
    <div className="w-full sm:w-2/4 p-4 bg-white shadow-md rounded-md">
      <span className="text-cyan-700 text-3xl font-bold font-sans ml-9">
        CREATE LOT
      </span>
    <br/>

        <input
            type="text"
            name="lot"
            value={lot}
            onChange={(e) => setLot(e.target.value)}
            placeholder='lot No'
            className="w-full mt-10 bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-50"
          />
          <Dropdown value={selectedQuality} onChange={(e) => setSelectedQuantity(e.value)} options={qualities} optionLabel="name" 
                placeholder="Select a Quality" className="w-full md:w-14rem mt-8 mb-7  bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-50" />


      <button
        className="mx-auto shadow w-2/4 bg-cyan-500 hover:bg-cyan-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded mt-2"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
    <Toast ref={toast} />
  </div>
  )
}

export default CreateLotForm
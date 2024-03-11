import React, { useEffect, useRef, useState } from "react";
import { Toast } from 'primereact/toast';

const Cell = () => {
  const [options,setOptions]=useState()
  const [warehouse,setWarehouse]=useState(1)
  const [section,setSection]=useState([])
  const [cell,setCell]=useState()
  const [selectedSection,setSelectedSection]=useState()
  const toast = useRef(null);
//   const [section,setSection]=useState([])

  console.log(warehouse)

  function get_warehouses(){
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    
    fetch("http://127.0.0.1:8000/warehouse/", requestOptions)
      .then((response) => response.json())
      .then((result) =>{ 
        
        console.log(result)
        setOptions(result)
      })
      .catch((error) => console.error(error));
  }

  function handlewarehousechange(e){
    setWarehouse(e.target.value)
    console.log(e.target.value)

    function get_sections(){
        const requestOptions = {
          method: "GET",
          redirect: "follow"
        };
        
        fetch(`http://127.0.0.1:8000/section/${e.target.value}/`, requestOptions)
          .then((response) => response.json())
          .then((result) =>{ 
            
            console.log(result)
            setSection(result)
          })
          .catch((error) => console.error(error));
      }
      get_sections()
}


  function handleSubmit(e){
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    console.log(warehouse)
    console.log(selectedSection)
    console.log(cell)

    const raw = JSON.stringify({
      "warehouse": warehouse,
      "section":selectedSection,
      "name": cell
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("http://127.0.0.1:8000/cell/create/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        toast.current.show({ severity: 'success', summary: 'Success', detail: 'Cell added successfully' });
    })
      .catch((error) => {
        console.error(error)
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Oops! Error occured' });
    });
  }

  useEffect(() => {
    get_warehouses();
  }, []);
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card w-full max-w-lg">
      <form className="w-full" onSubmit={handleSubmit}>
  <h2 className="text-2xl mb-4 text-center">Add Cell</h2>

  <div className="mb-6">
    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="sectionName">
      Warehouse
    </label>
    <select
      value={warehouse}
      onChange={handlewarehousechange}
      id="warehouse"
      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
    >
      <option>Select Warehouse</option>
      {options && options.map(option => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
  </div>

  <div className="mb-6">
    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="sectionName">
      Section
    </label>

    <select
      value={selectedSection}
      onChange={(e) => setSelectedSection(e.target.value)}
      id="warehouse"
      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
    >
      <option>Select Section</option>
      {section && section.map(option => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
  </div>

  <div className="mb-6">
    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="sectionName">
      Cell name
    </label>
    <input
      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
      value={cell}
      onChange={(e) => setCell(e.target.value)}
      id="section"
      type="text"
      placeholder="cell"
    />
  </div>

  {/* Number of Sections input goes here */}
  
  <div className="flex flex-wrap -mx-3 mb-2">
    <div className="w-full px-3">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
        Submit
      </button>
    </div>
  </div>
</form>

        <Toast ref={toast} />
      </div>
    </div>
  );
};

export default Cell;

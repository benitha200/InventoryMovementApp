import React, { useEffect, useState } from "react";

const SectionForm = () => {
  const [options,setOptions]=useState()
  const [warehouse,setWarehouse]=useState(1)
  const [section,setSection]=useState()

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

  function handleSubmit(e){
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "warehouse": warehouse,
      "name": section
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("http://127.0.0.1:8000/section/create/", requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    get_warehouses();
  }, []);
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card w-full max-w-lg">
        <form className="w-full" onSubmit={handleSubmit}>
          <h2 className="text-2xl mb-4 text-center">Section</h2>
          <div className="mb-6 w-full">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="sectionName">
                        Warehouse
                      </label>
                      <select
                        value={warehouse}
                        onChange={(e) => setWarehouse(e.target.value)}
                        id="warehouse"
                        c className="appearance-none block w-100 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
              Section Name
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" value={section} onChange={(e)=>setSection(e.target.value)} id="section" type="text" placeholder="Section" />
          </div>
          {/* Number of Sections input goes here */}
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full px-3">
              <button className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SectionForm;

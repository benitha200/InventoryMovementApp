import React, { useState,useRef } from "react";
import { Toast } from 'primereact/toast';

const Supplier = () => {
    const [name,setName]=useState()
    const [location,setLocation]=useState()

    const toast = useRef(null);

    function handleSubmit(e){
        e.preventDefault()

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
        "name": name,
        "location":location
        });

        const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
        };

        fetch("http://127.0.0.1:8000/supplier/create/", requestOptions)
        .then((response) => response.json())
        .then((result) => {
            console.log(result)
            toast.current.show({ severity: 'success', summary: 'Success', detail: 'Supplier added successfully' });
            setName('')
            setLocation('')
        })
        .catch((error) => {
            console.error(error)
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Adding supplier Failed' });
        });

    }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card w-full max-w-lg">
        <form className="w-full" onSubmit={handleSubmit}>
          <h2 className="text-2xl mb-4 text-center">Add Supplier</h2>
          {/* Warehouse Name dropdown goes here */}
          <div className="mb-6">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="sectionName">
              Name 
            </label>
            <input value={name} onChange={(e)=>setName(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="section" type="text" placeholder="name" />
          </div>
          <div className="mb-6">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="sectionName">
              Location
            </label>
            <input value={location} onChange={(e)=>setLocation(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="section" type="text" placeholder="location" />
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

export default Supplier;

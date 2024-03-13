import React, { useEffect, useState,useRef } from "react";
import { Toast } from "primereact/toast";

const StockInForm = () => {

    const [options,setOptions]=useState()
    const [suppliers,setSuppliers]=useState()
    const [selectedSupplier,setSelectedsupplier]=useState()
    const [wrn,setWrno]=useState()
    const [section,setSection]=useState([])
    const [selectedWarehouse,setSelectedWarehouse]=useState()
    const [selectedSection,setSelectedSection]=useState()
    const [cells,setCells]=useState([])
    const [selectedCell,setSelectedCell]=useState(1)
    const [coffetypes,setCoffeetypes]=useState()
    const [selectedCoffeetype,setelectedCoffeetype]=useState()
    const [processtypes,setProcesstypes]=useState()
    const [selectedProcesstype,setSelectedProcesstype]=useState()
    // const [selectedCell,setSelectedCell]=useState()
    const [bags,setBags]=useState()
    const [quantity, setQuantity] = useState('');
    const [moisturecontent,setMoisturecontent]=useState()

    const toast=useRef(null);


    const handleQuantityChange = (e) => {
        const enteredQuantity = e.target.value;
        setQuantity(enteredQuantity);
    
        // Calculate the number of bags based on quantity (assuming each bag is equivalent to 60)
        const calculatedBags = Math.ceil(enteredQuantity / 60);
        setBags(calculatedBags);
      };

    function handlewarehousechange(e){
        setSelectedWarehouse(e.target.value)
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

    function handlecoffeetypechange(e){
        setelectedCoffeetype(e.target.value)
        console.log(e.target.value)

        function get_processtypes(){

            const requestOptions = {
                method: "GET",
                redirect: "follow"
              };
              
              fetch(`http://127.0.0.1:8000/processtype/${e.target.value}/`, requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    console.log(result)
                    setProcesstypes(result)
                })
                .catch((error) => console.error(error));
          }
          get_processtypes()
    }

    function handlesectionchange(e){
        // setSection(e.target.value)
        setSelectedSection(e.target.value)

        function get_cells(){
            const requestOptions = {
              method: "GET",
              redirect: "follow"
            };
            
            fetch(`http://127.0.0.1:8000/cell/${e.target.value}/`, requestOptions)
              .then((response) => response.json())
              .then((result) =>{ 
                console.log("cells")
                console.log(result)
                setCells(result)
              })
              .catch((error) => console.error(error));
          }
          get_cells()

    }


    function get_coffeetypes(){
        const requestOptions = {
            method: "GET",
            redirect: "follow"
          };
          
          fetch("http://127.0.0.1:8000/coffetype/", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result)
                setCoffeetypes(result)
            })
            .catch((error) => console.error(error));
      }

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
      
      function get_suppliers(){
        const requestOptions = {
            method: "GET",
            redirect: "follow"
          };
          
          fetch("http://127.0.0.1:8000/supplier/", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result)
                setSuppliers(result)
            })
            .catch((error) => console.error(error));
      }

      function handleSubmit(e){
        e.preventDefault()
        console.log(selectedWarehouse,selectedSupplier,selectedCell,selectedSection,selectedProcesstype,selectedCoffeetype,bags,quantity,wrn,moisturecontent)

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
        "warehouse": selectedWarehouse,
        "section": selectedSection,
        "cell": selectedCell,
        "coffetype": selectedCoffeetype,
        "processtype": selectedProcesstype,
        "supplier": selectedSupplier,
        "wrn": wrn,
        "bags": bags,
        "quantity_kgs": quantity,
        "moisture_content":parseInt(moisturecontent)
        });

        const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
        };

        fetch("http://127.0.0.1:8000/stockin/", requestOptions)
        .then((response) => response.json())
        .then((result) => {
            console.log(result)
            toast.current.show({ severity: 'success', summary: 'Success', detail: 'New Items was added to stock successfully' });
        })
        .catch((error) => {
            console.error(error)
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Oops! Error occured in submission' });
        });
      }

      useEffect(()=>{
        get_suppliers();
        get_warehouses();
        get_coffeetypes();
      },[])


    return (
        <div className="container flex justify-center items-center h-screen">
            <div className="card">
                <form className="max-w-lg" onSubmit={handleSubmit}>
                    <h2 className="text-2xl mb-4 text-center">Stock In</h2>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="warehouse">
                                Warehouse
                            </label>
                            <select value={selectedWarehouse} onChange={handlewarehousechange} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="warehouse" required>
                            <option>Select Warehouse</option>
                            {options && options.map(option => (
                                <option key={option.id} value={option.id}>
                                    {option.name}
                                </option>
                                ))}
                            </select>
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="warehouse">
                                Section
                            </label>

                            <select value={selectedSection} onChange={handlesectionchange} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="warehouse" required>
                            <option>Select Section</option>
                            {section && section.map(option => (
                                <option key={option.id} value={option.id}>
                                    {option.name}
                                </option>
                                ))}
                            </select>
                        </div>
                        
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="warehouse">
                                Cell
                            </label>
                            <select value={selectedCell} onChange={(e)=>setSelectedCell(e.target.value)} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="warehouse" required>
                            <option>Select Cell</option>
                            {cells && cells.map(option => (
                                <option key={option.id} value={option.id}>
                                    {option.name}
                                </option>
                                ))}
                            </select>
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="warehouse">
                                Supplier
                            </label>
                            <select value={selectedSupplier} onChange={(e)=>setSelectedsupplier(e.target.value)} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="warehouse" required>
                            <option>Select Supplier</option>
                            {suppliers && suppliers.map(supplier => (
                                <option key={supplier.id} value={supplier.id}>
                                    {supplier.name}
                                </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="warehouse">
                                Coffe Type
                            </label>
                            <select value={selectedCoffeetype} onChange={handlecoffeetypechange} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="warehouse" required>
                            <option>Select Coffee Type</option>
                            {coffetypes && coffetypes.map(option => (
                                <option key={option.id} value={option.id}>
                                    {option.name}
                                </option>
                                ))}
                            </select>
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="warehouse">
                                Grade
                            </label>
                            <select value={selectedProcesstype} onChange={(e)=>setSelectedProcesstype(e.target.value)} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="warehouse" required>
                            <option>Select Grade</option>
                            {processtypes && processtypes.map(option => (
                                <option key={option.id} value={option.id}>
                                    {option.description}
                                </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="quantity">
                        Quantity
                        </label>
                        <input
                        value={quantity}
                        onChange={handleQuantityChange}
                        // readOnly // Make the input read-only as it will be calculated
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="quantity"
                        type="number"
                        placeholder="Quantity"
                        required
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="numberOfBags">
                        Number of Bags
                        </label>
                        <input
                        value={bags}
                        // onChange={handleBagsChange}
                        readOnly
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="numberOfBags"
                        type="number"
                        placeholder="Number of Bags"
                        required
                        />
                    </div>
                    
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="quantity">
                        Moisture Content
                        </label>
                        <input
                        value={moisturecontent}
                        onChange={(e)=>setMoisturecontent(e.target.value)}
                        // readOnly // Make the input read-only as it will be calculated
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="quantity"
                        type="number"
                        placeholder="Moisture Content"
                        required
                        />
                    </div>
                    {/* <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="numberOfBags">
                        Number of Bags
                        </label>
                        <input
                        value={bags}
                        // onChange={handleBagsChange}
                        readOnly
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="numberOfBags"
                        type="number"
                        placeholder="Number of Bags"
                        required
                        />
                    </div> */}
                    
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                  
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-2">
                        <div className="w-full px-3">
                            <button className="bg-cyan-500 hover:bg-cyan-700 min-w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
                
            </div>
            <Toast ref={toast} />
        </div>
    );
};

export default StockInForm;

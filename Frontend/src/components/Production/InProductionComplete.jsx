import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';

const InProductionComplete = () => {
    const [searchParams] = useSearchParams();
    const [batchdetails,setBatchdetails]=useState();
    const [visible, setVisible] = useState(false);
    const [quantitykgs,setQuantityKgs]=useState();
    const [selectedCell,setSelectedCell]=useState();
    const [outputbags,setOutputbags]=useState();
    const [cells,setCells]=useState();
    const [selectedQuality, setSelectedQuantity] = useState(null);
    const qualities = [
        { name: 'F.SC.15.HP', code: 'F.SC.15.HP' },
        { name: 'F.CSR.15', code: 'F.CSR.15' },
        { name: 'F.SC.17', code: 'F.SC.17' },
        { name: 'N.SC.15', code: 'N.SC.15' },
        { name: 'N.SC.17', code: 'N.SC.17' },
        { name: 'N.CSR.15', code: 'N.CSR.15' },
        { name: 'F.SC.17.FQ', code: 'F.SC.17.FQ' },
        { name: 'F.SC.15.FQ', code: 'F.SC.15.FQ' },
    ];

    


    const batch_no = searchParams.get('batch_no');
    const production_process=searchParams.get('production_process')
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
      
    useEffect(()=>{
        function fetchbatchdetails(){
            const requestOptions = {
            method: "GET",
            redirect: "follow"
            };

            fetch(`http://127.0.0.1:8000/productionbatchdetails/?batch_no=${batch_no}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result)
                setBatchdetails(result)
            })
            .catch((error) => console.error(error));
            
        }
        fetchbatchdetails();
        get_cells();
    },[])



    function handleSubmit(){

    }

  return (
    <div>
        <div className='flex flex-col m-2 pb-3 text-cyan-900'>
            <span className='uppercase text-xl font-bold text-u'>COMPLETE " {production_process} " </span>
            <span className='text-xl'>BATCH NO: {batch_no} </span>
            </div>

            <div className='gap-2 m-2 p-2'>
                
                <div className="card bg-gray-200">
                <span className='text-xl m-2 font-bold pb-5'>INPUT WRNs</span>
                    <DataTable value={batchdetails} tableStyle={{ minWidth: '50rem' }}>
                        <Column field="warehouse" header="Warehouse"></Column>
                        <Column field="section" header="Section"></Column>
                        <Column field="cell" header="Cell"></Column>
                        <Column field="wrn" header="WRN"></Column>
                        <Column field="net_quantity" header="Quantity"></Column>
                        
                    </DataTable>
                </div>

                <div className="card bg-gray-200 mt-2">
                <div className='flex flex-row justify-between'><span className='text-xl m-2 font-bold pb-5'>INPUT WRNs</span>
                 {/* <Button className='bg-cyan-600 pl-2 pr-2 text-gray-50 mb-2'>Add New Input</Button> */}

                 <Button className='bg-cyan-600 pl-2 pr-2 text-gray-50 mb-2' label="Add New Output" icon="pi pi-external-link" onClick={() => setVisible(true)} />
                <Dialog header="ADD OUTPUT" visible={visible} onHide={() => setVisible(false)}
                    style={{ width: '50vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
                        <div className="w-full p-4 bg-white shadow-md rounded-md">
                            <label>Warehouse</label>
                        <Dropdown
                            value={selectedCell}
                            onChange={(e) => setSelectedCell(e.value)}
                            options={cells.map((cell) => ({ name: cell.cell_label, value: cell.cell_label }))}
                            optionLabel="name"
                            placeholder="Select Cell"
                            filter
                            className="w-full md:w-14rem"
                            />
                            <span>Quantity</span>
                                <input
                                    type="text"
                                    name="quantity"
                                    value={quantitykgs}
                                    onChange={(e) => setQuantityKgs(e.target.value)}
                                    placeholder='Quantity'
                                    className="w-full mt- bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-50"
                                />
                                <span>Quality</span>
                                <Dropdown value={selectedQuality} onChange={(e) => setSelectedQuantity(e.value)} options={qualities} optionLabel="name" 
                                        placeholder="Select a Quality" className="w-full md:w-14rem mt-5 mb-7  bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-50" />


                            <button
                                className="mx-auto shadow w-2/4 bg-cyan-500 hover:bg-cyan-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded mt-2"
                                onClick={handleSubmit}
                            >
                                Submit
                            </button>
                            </div>
                </Dialog>
                 
                 </div> 
                    <DataTable value={batchdetails} tableStyle={{ minWidth: '50rem' }}>
                        <Column field="warehouse" header="Warehouse"></Column>
                        <Column field="section" header="Section"></Column>
                        <Column field="cell" header="Cell"></Column>
                        <Column field="wrn" header="WRN"></Column>
                        <Column field="net_quantity" header="Quantity"></Column>
                        
                    </DataTable>
                </div>
            </div>
    </div>
  )
}

export default InProductionComplete
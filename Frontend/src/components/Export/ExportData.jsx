import React, { useEffect } from 'react'

const ExportData = () => {

    function get_production_process() {
        const requestOptions = {
          method: "GET",
          redirect: "follow"
        };
    
        fetch("http://127.0.0.1:8000/exportdata/", requestOptions)
          .then((response) => response.json())
          .then((result) => {
            console.log(result)
            // setProcesses(result)
          })
          .catch((error) => console.error(error));
      }
      useEffect(()=>{
        get_production_process();
      })
  return (
    <div>ExportData</div>
  )
}

export default ExportData
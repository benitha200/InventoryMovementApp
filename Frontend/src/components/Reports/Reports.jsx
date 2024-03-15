import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import React, { useState } from 'react';
import { CSVLink } from 'react-csv';

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endtDate, setEndDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status,setStatus]=useState(false);
  const [report,setReport]=useState();

  const [exportData, setExportData] = useState(null);

  const exportCSV = () => {
      setExportData(report);
  };

  // const csvHeaders = [
  //   { label: 'Date', key: 'delivered_date' },
  //   { label: 'Warehouse', key: 'warehouse' },
  //   { label: 'Cell', key: 'cell' },
  //   { label: 'Coffee Type', key: 'coffetype' },
  //   { label: 'Grade', key: 'processtype' },
  //   { label: 'WRN', key: 'wrn' },
  //   { label: 'Quantity', key: 'quantity_kgs' },
  //   { label: 'Bags', key: 'bags' },
  //   { label: 'Supplier', key: 'supplier' },
  //   { label: 'Moisture Content', key: 'moisture_content' },
  // ];
    const csvHeaders = [
      { label: 'Date', key: 'delivered_date', style: { fontWeight: 'bold' } },
      { label: 'Warehouse', key: 'warehouse', style: { fontWeight: 'bold' } },
      { label: 'Cell', key: 'cell', style: { fontWeight: 'bold' } },
      { label: 'Coffee Type', key: 'coffetype', style: { fontWeight: 'bold' } },
      { label: 'Grade', key: 'processtype', style: { fontWeight: 'bold' } },
      { label: 'WRN/GRN', key: 'wrn', style: { fontWeight: 'bold' } },
      { label: 'Quantity', key: 'quantity_kgs', style: { fontWeight: 'bold' } },
      { label: 'Bags', key: 'bags', style: { fontWeight: 'bold' } },
      { label: 'Supplier', key: 'supplier', style: { fontWeight: 'bold' } },
      { label: 'Moisture Content', key: 'moisture_content', style: { fontWeight: 'bold' } },
  ];


  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "start_date": startDate.toISOString().split('T')[0],
      "end_date": endtDate.toISOString().split('T')[0],
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://127.0.0.1:8000/generate-report/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setReport(result)
        if (result.batch_no) {
            setStatus(true)
            
          // Show success message or handle as needed
        }
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };




  const reports = [
    { name: 'Stock Input Report', code: 'SIR' },
    { name: 'Batch Outturn Report', code: 'BOR' },
  ];

  return (
    <div className='w-full container'>
      <form onSubmit={handleSubmit} className='card w-2/4 justify-items-center justify-center mx-auto'>
        <span className='text-cyan-700 text-2xl font-bold font-sans mb-5'>
          <center>GENERATE REPORT </center>
        </span>
        <div className="flex flex-col items-center justify-center mt-2">
          <Dropdown
            value={selectedReport}
            onChange={(e) => setSelectedReport(e.value)}
            options={reports}
            optionLabel="name"
            placeholder="Select a Report"
            className="w-full h-10 md:w-14rem border-2 border-s-orange-200 mb-2"
            required
          />

          <div className="flex flex-col w-full ">
            <label htmlFor="buttondisplay" className="font-bold block mt-2">
              Start Date
            </label>
            <Calendar
              id="buttondisplay"
              value={startDate}
              onChange={(e) => setStartDate(e.value)}
              showIcon
              className="w-full md:w-14rem h-10 border-2 border-s-orange-200 rounded"
            />
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="buttondisplay" className="font-bold block mt-2 ">
              End Date
            </label>
            <Calendar
              id="buttondisplay"
              value={endtDate}
              onChange={(e) => setEndDate(e.value)}
              showIcon
              className="w-full md:w-14rem h-10 border-2 border-s-orange-200 rounded"
            />
          </div>
          <div className="flex flex-col w-full items-center">
            <Button
              label="Generate"
              icon="pi pi-check"
              loading={loading}
              type='submit'
              className="bg-orange-300 mt-3 w-2/4 h-12 text-cyan-900 text-lg"
            />
          </div>
          <div className="flex justify-content-end m-3">
                {report && (
                <CSVLink data={report} headers={csvHeaders} filename="StockInReport.csv">
                    <Button type="button" icon="pi pi-file-excel" label="Download Excel" className="bg-teal-400 text-gray-100 p-3" onClick={exportCSV} />
                </CSVLink>
                )}
            </div>
        </div>
      </form>
    </div>
  );
}

export default Reports;

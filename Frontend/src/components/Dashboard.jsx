import React,{useEffect,useState} from 'react';
import { Card } from 'primereact/card';
import { Panel } from 'primereact/panel';
import { Chart } from 'primereact/chart';

const Dashboard = () => {
    const [stockData, setStockData] = useState([]);
    const [totalQuantityGreen, setTotalQuantityGreen] = useState(0);
    const [totalQuantityParch, setTotalQuantityParch] = useState(0);


    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch("http://127.0.0.1:8000/stockdata/");
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setStockData(data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };

        fetchData();
      }, []);

      useEffect(() => {
        // Calculate total quantity where coffeetype.id is 1
        const totalgreen = stockData.reduce((acc, item) => {
          if (item.coffetype.id === 1) {
            return acc + item.quantity_kgs;
          }
          return acc;
        }, 0);
        const totalparch = stockData.reduce((acc, item) => {
            if (item.coffetype.id === 2) {
              return acc + item.quantity_kgs;
            }
            return acc;
          }, 0);
        setTotalQuantityParch(totalparch);
        setTotalQuantityGreen(totalgreen);
      }, [stockData]);
    

    // function get_stockdata(){
    //     const requestOptions = {
    //         method: "GET",
    //         redirect: "follow"
    //       };
          
    //       fetch("http://127.0.0.1:8000/stockdata/", requestOptions)
    //         .then((response) => response.json())
    //         .then((result) => console.log(result))
    //         .catch((error) => console.error(error));
    // }
    const lineData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Parchment',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                borderColor: '#4bc0c0'
            },
            {
                label: 'Green',
                data: [28, 48, 40, 19, 86, 27, 90],
                fill: false,
                borderColor: '#36A2EB'
            },
            {
                label: 'Triage',
                data: [45, 55, 60, 70, 50, 45, 30],
                fill: false,
                borderColor: '#FFA500' // Orange color for Triage
            }
        ]
    };

    const pieData = {
        labels: ['Parch', 'Green', 'Triage'],
        datasets: [
            {
                data: [300, 50, 100],
                backgroundColor: ['#4bc0c0', '#36A2EB', '#FFCE56'],
                hoverBackgroundColor: ['#4bc0c0', '#36A2EB', '#FFCE56']
            }
        ]
    };

    const PiechartOptions = {
        maintainAspectRatio: false, // Prevent the chart from adjusting its aspect ratio
        responsive: true, // Prevent the chart from being responsive
        width: 200, // Set a fixed width for the chart
        height: 200, // Set a fixed height for the chart
        aspectRatio: 1
    };

    const LinechartOptions = {
        maintainAspectRatio: false, // Prevent the chart from adjusting its aspect ratio
        responsive: true, // Prevent the chart from being responsive
        // width: 1800, // Set a fixed width for the chart
        // height: 600, // Set a fixed height for the chart
        aspectRatio: 1
    };

    return (
        <div>
            <div className="card-container flex flex-wrap mx-auto">
                <Card className="w-2/12 relative m-2 flex flex-col rounded-xl bg-emerald-100 bg-clip-border text-black shadow-md">
                    <i className="pi pi-shopping-bag" style={{ fontSize: '2em', alignSelf: 'center' }}></i>
                    <h2 className='text-2xl font-serif font-bold'>Parchment</h2>
                    <p className="m-0 text-xl font-serif font-bold">Qty: {totalQuantityParch} Kgs</p>
                </Card>

                <Card className=" w-2/12 relative m-2 flex flex-col rounded-xl bg-yellow-100 bg-clip-border text-black shadow-md" >
                    <i className="pi pi-briefcase" style={{ fontSize: '2em', alignSelf: 'center' }}></i>
                    <h2 className='text-2xl font-bold font-serif'>Green</h2>
                    <p className="m-0 text-xl font-serif font-bold">Qty: {totalQuantityGreen} Kgs</p>
                </Card>
                <Card className="w-2/12 relative m-2 flex flex-col rounded-xl bg-teal-100 bg-clip-border text-black shadow-md" >
                        <i className="pi pi-shopping-bag" style={{ fontSize: '2em', alignSelf: 'center' }}></i>
                        <h2 className='text-2xl font-bold font-serif'>Export</h2>
                        <p className="m-0 text-xl font-serif font-bold ">300 Kgs</p>
                 </Card>

                <Card className="w-2/12 relative m-2 flex flex-col rounded-xl bg-blue-100 bg-clip-border text-black shadow-md">
                    <i className="pi pi-shopping-bag" style={{ fontSize: '2em', alignSelf: 'center' }}></i>
                    <h2 className='text-2xl font-bold font-serif'>GTRs + CSR</h2>
                    <p className="m-0 text-xl font-serif font-bold">Qty: 200 Kgs</p>
                </Card>
                
           

            </div>
            <div className="chart-container flex w-full">
                <Card className="relative m-2 flex flex-col rounded-xl bg-white bg-clip-border text-cyan-700" style={{ width: '900px' }}>
                    <Panel header={<div className="text-cyan-700">Monthly Supplied Coffee</div>} style={{ background: 'transparent' }}>
                        <Chart type="line" data={lineData} options={LinechartOptions} />
                    </Panel>
                </Card>
                <Card className="relative m-2 flex flex-col rounded-xl bg-white bg-clip-border text-cyan-700" style={{ width: '300px' }}>
                    <Panel header={<div className="text-cyan-700 ">Coffee Ratio</div>} style={{ background: 'transparent' }}>
                        <Chart type="pie" data={pieData} options={PiechartOptions} />
                    </Panel>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;

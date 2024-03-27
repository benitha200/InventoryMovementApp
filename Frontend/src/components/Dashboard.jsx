import React from 'react';
import { Card } from 'primereact/card';
import { Panel } from 'primereact/panel';
import { Chart } from 'primereact/chart';

const Dashboard = () => {
    // Define your data and options for the charts here
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
            <div className="card-container flex flex-wrap">
                <Card title="Parchment" className="relative m-2 flex flex-col rounded-xl bg-white bg-clip-border text-cyan-700 shadow-md" style={{ width: '20%' }}>
                    <p className="m-0">Qty: 5000 Kgs</p>
                </Card>
                <Card title="Green" className="relative m-2 flex flex-col rounded-xl bg-white bg-clip-border text-cyan-700 shadow-md" style={{ width: '18%' }}>
                    <p className="m-0">Qty: 5000 Kgs</p>
                </Card>
                <Card title="GTRs" className="relative m-2 flex flex-col rounded-xl bg-white bg-clip-border text-cyan-700 shadow-md" style={{ width: '17%' }}>
                    <p className="m-0">Qty: 200 Kgs</p>
                </Card>
                <Card title="CSRs" className="relative m-2 flex flex-col rounded-xl bg-white bg-clip-border text-cyan-700 shadow-md" style={{ width: '17%' }}>
                    <p className="m-0">Qty: 100 Kgs</p>
                </Card>
                <Card title="Triage" className="relative m-2 flex flex-col rounded-xl bg-white bg-clip-border text-cyan-700 shadow-md" style={{ width: '20%' }}>
                    <p className="m-0">Qty: 300 Kgs</p>
                </Card>
            </div>
            <div className="chart-container flex">
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

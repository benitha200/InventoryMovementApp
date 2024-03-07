import React, { useState, useEffect } from 'react';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';

const Stock = () => {
    const [data, setData] = useState([]);
    const [layout, setLayout] = useState('grid');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/stock/");
                const result = await response.json();
                setData(groupByWarehouseAndCoffeeType(result));
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    // Helper function to group data by warehouse and coffee type
    const groupByWarehouseAndCoffeeType = (dataArray) => {
        const groupedData = {};

        dataArray.forEach(item => {
            const { warehouse__name, coffetype__name } = item;
            
            if (!groupedData[warehouse__name]) {
                groupedData[warehouse__name] = {};
            }

            if (!groupedData[warehouse__name][coffetype__name]) {
                groupedData[warehouse__name][coffetype__name] = [];
            }

            groupedData[warehouse__name][coffetype__name].push(item);
        });

        return Object.keys(groupedData).map(warehouse__name => ({
            warehouse__name,
            coffetypes: Object.keys(groupedData[warehouse__name]).map(coffetype__name => ({
                coffetype__name,
                items: groupedData[warehouse__name][coffetype__name]
            }))
        }));
    };

    const listItem = (warehouseData, index) => {
        const { warehouse__name, coffetypes } = warehouseData;
        const randomKey = `warehouse_${index}_${Math.random()}`;
        return (
            <div className="card mr-3 w-50 min-h-max" key={randomKey}>
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <div className="card-header text-xl font-bold  text-cyan-50 p-2 rounded">{warehouse__name}</div>
                    {coffetypes.map((coffetype, coffetypeIndex) => (
                        <div key={coffetypeIndex}>
                            <div className="text-lg font-bold">{coffetype.coffetype__name}</div>
                            {coffetype.items.map((item, itemIndex) => (
                                <div className={classNames(' w-50 flex flex-row xl:flex-column xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': itemIndex !== 0 })} key={itemIndex}>
                                    <div className="">
                                        <div className="text-xl font-bold text-900">{item.processtype__type_name}</div>
                                        <div className="">
                                            <div className="text-cyan-900">
                                                <span>Total Quantity (kgs): {item.total_quantity_kgs}</span><br/>
                                                <span>Total Bags Number: {item.total_bags_no}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        );
    };
    
    const itemTemplate = (warehouseData) => {
        if (!warehouseData || !warehouseData.coffetypes || warehouseData.coffetypes.length === 0) {
            return null;
        }

        return listItem(warehouseData);
    };

    const listTemplate = (warehouseData) => {
        return <div className="flex flex-row">{warehouseData.map((warehouse, index) => itemTemplate(warehouse))}</div>;
    };

    const header = () => {
        return (
            <div className="flex justify-content-end">
                <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
            </div>
        );
    };

    return (
        <div className="card-2">
            <span className='text-cyan-700 text-3xl font-bold font-sans ...'>
                WAREHOUSE
            </span>
            <DataView
                value={data}
                layout={layout}
                itemTemplate={(warehouseData) => itemTemplate(warehouseData)}
                // header={header()}
            />
        </div>
    );
}

export default Stock;

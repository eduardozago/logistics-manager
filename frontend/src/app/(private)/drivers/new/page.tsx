'use client'

import { useState } from "react";

const vehicles = [
    {
        id: '1',
        model: "Volvo FH16",
        type: "Truck",
        plate: "ABC1234",
        year: 2019
    },
    {
        id: '2',
        model: "Ford Transit",
        type: "Van",
        plate: "XYZ9878",
        year: 2021
    },
    {
        id: '3',
        model: "Scania R-series",
        type: "Truck",
        plate: "NYC8765H",
        year: 2016
    },
    {
        id: '4',
        model: "Renault Master",
        type: "Van",
        plate: "XYZ9A99",
        year: 2017
    },
]

export default function Page() {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(`Select the vehicle`);

    const [ vehicle, setVehicle ] = useState<string | null>(null)

    function handleOpenClick(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        setIsOpen(!isOpen);
    }


    return (
        <div className="w-[50%] pr-[2rem]">
            <h1 className="font-[600] text-[1.25rem]">Add Driver</h1>
            <form className="flex flex-col w-[60%] mt-[1rem] mb-[1rem]">
                <label className="mb-[0.5rem]">Name:</label>
                <input 
                    type="text"
                    className="border border-gray-400 rounded-lg px-[0.875rem] py-[0.25rem] focus:outline-none focus:ring-1 focus:ring-gray-400 transition-all duration-200"
                    placeholder="Enter driver name"
                />
                <label className="mb-[0.5rem] mt-[1rem]">License Number:</label>
                <input 
                    type="text"
                    className="border border-gray-400 rounded-lg px-[0.875rem] py-[0.25rem] focus:outline-none focus:ring-1 focus:ring-gray-400 transition-all duration-200"
                    placeholder="Enter the license number"
                />
                <label className="mb-[0.5rem] mt-[1rem]">Vehicle:</label>

                <div className="relative w-64 w-full">
                    <button
                        onClick={handleOpenClick}
                        className="w-full py-[0.25rem] text-green-700 border border-gray-300 rounded-md shadow-sm focus:border-green-700"
                    >
                        {selected}
                    </button>

                    { isOpen && (
                        <ul className="absolute w-full bg-gray-700 border border-gray-300 rounded-md mt-1 shadow-lg">
                            <li
                                onClick={() => {
                                    setSelected('No vehicle');
                                    setIsOpen(false);
                                }}
                                className="py-[0.25rem] px-[1rem] hover:bg-gray-200 text-green-700 cursor-pointer transition-colors"
                            >No vehicle</li>
                            {vehicles.map((vehicle, index) => (
                            <li
                                key={index}
                                onClick={() => {
                                    setSelected(`${vehicle.model} - ${vehicle.plate}`);
                                    setIsOpen(false);
                                    setVehicle(vehicle.id)
                                }}
                                className="py-[0.25rem] px-[1rem] hover:bg-gray-200 text-green-700 cursor-pointer transition-colors"
                            >
                                {`${vehicle.model} - ${vehicle.plate}`}
                            </li>
                            ))}
                        </ul>
                        )
                    }    
                </div>                
            </form>
            <button className="p-[0.5rem] bg-blue-500 hover:bg-blue-400 mt-[1rem] rounded-lg font-[500] cursor-pointer w-[8rem] transition-all duration-400">
                Add
            </button>
        </div>
    )
}
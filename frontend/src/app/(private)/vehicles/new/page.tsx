'use client'

import { useState } from "react";

export default function Page() {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(`Select the vehicle type`);

    function handleOpenClick(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        setIsOpen(!isOpen);
    }

    return (
        <div className="w-[50%] pr-[2rem]">
            <h1 className="font-[600] text-[1.25rem]">Add Vehicle</h1>
            <form className="flex flex-col w-[60%] mt-[1rem] mb-[1rem]">
                <label className="mb-[0.5rem]">Plate:</label>
                <input 
                    type="text"
                    className="border border-gray-400 rounded-lg px-[0.875rem] py-[0.25rem] focus:outline-none focus:ring-1 focus:ring-gray-400 transition-all duration-200"
                    placeholder="Enter vehicle plate"
                    maxLength={8}
                />
                <label className="mb-[0.5rem] mt-[1rem]">Model:</label>
                <input 
                    type="text"
                    className="border border-gray-400 rounded-lg px-[0.875rem] py-[0.25rem] focus:outline-none focus:ring-1 focus:ring-gray-400 transition-all duration-200"
                    placeholder="Enter the vehicle model"
                />
                <label className="mb-[0.5rem] mt-[1rem]">Year:</label>
                <input 
                    type="text"
                    className="border border-gray-400 rounded-lg px-[0.875rem] py-[0.25rem] focus:outline-none focus:ring-1 focus:ring-gray-400 transition-all duration-200"
                    placeholder="Enter the vehicle year"
                    maxLength={4}
                />

                <label className="mb-[0.5rem] mt-[1rem]">Type:</label>
                <div className="relative w-64 w-full">
                    <button
                        onClick={handleOpenClick}
                        className="w-full py-[0.25rem] text-green-700 border border-gray-300 rounded-md shadow-sm focus:border-green-700 cursor-pointer"
                    >
                        {selected}
                    </button>

                    { isOpen && (
                        <ul className="absolute w-full bg-gray-700 border border-gray-300 rounded-md mt-1 shadow-lg">
                            <li
                                onClick={() => {
                                    setSelected('Car');
                                    setIsOpen(false);
                                }}
                                className="py-[0.25rem] px-[1rem] hover:bg-gray-200 text-green-700 cursor-pointer transition-colors"
                            >Car</li>
                            <li
                                onClick={() => {
                                    setSelected('Truck');
                                    setIsOpen(false);
                                }}
                                className="py-[0.25rem] px-[1rem] hover:bg-gray-200 text-green-700 cursor-pointer transition-colors"
                            >Truck</li>
                            <li
                                onClick={() => {
                                    setSelected('Van');
                                    setIsOpen(false);
                                }}
                                className="py-[0.25rem] px-[1rem] hover:bg-gray-200 text-green-700 cursor-pointer transition-colors"
                            >Van</li>
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
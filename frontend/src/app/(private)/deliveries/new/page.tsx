'use client'

import { CaretDown, Plus } from "@phosphor-icons/react";
import { useState } from "react";

const drivers = [
    {
        id: '1',
        name: "John Doe",
        license: "123",
    },
    {
        id: '2',
        name: "Bob Johnson",
        license: "456",
    },
]

export default function Page() {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(`Select the driver`);

    function handleOpenClick(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        setIsOpen(!isOpen);
    }

    return (
        <div className="w-[50%] pr-[2rem]">
            <h1 className="font-[600] text-[1.25rem]">Add Delivery</h1>
            <form className="flex flex-col w-[60%] mt-[1rem] mb-[2rem]">
                <label className="mb-[0.5rem]">From:</label>
                <input 
                    type="text"
                    className="border border-gray-400 rounded-lg px-[0.875rem] py-[0.25rem] focus:outline-none focus:ring-1 focus:ring-gray-400 transition-all duration-200"
                    placeholder="Enter delivery origin"
                />
                <label className="mb-[0.5rem] mt-[1rem]">To:</label>
                <input 
                    type="text"
                    className="border border-gray-400 rounded-lg px-[0.875rem] py-[0.25rem] focus:outline-none focus:ring-1 focus:ring-gray-400 transition-all duration-200"
                    placeholder="Enter delivery destiny"
                />

                <label className="mb-[0.5rem] mt-[1rem]">Driver:</label>
                <div className="relative w-64 w-full">
                    <button
                        onClick={handleOpenClick}
                        className="flex justify-between items-center px-[1rem] w-full py-[0.25rem] text-gray-100 border border-gray-400 rounded-md shadow-sm focus:border-green-700 cursor-pointer"
                    >
                        {selected}
                        <CaretDown size={16} />
                    </button>

                    { isOpen && (
                        <ul className="absolute w-full bg-gray-700 border border-gray-300 rounded-md mt-1 shadow-lg">
                            {drivers.map((driver, index) => (
                            <li
                                key={index}
                                onClick={() => {
                                    setSelected(driver.name);
                                    setIsOpen(false);
                                }}
                                className="py-[0.25rem] px-[1rem] rounded-lg hover:bg-gray-600 text-gray-100 cursor-pointer transition-colors"
                            >
                                {driver.name}
                            </li>
                            ))}
                        </ul>
                        )
                    }    
                </div>                
            </form>
            <button className="flex items-center justify-center gap-2 p-[0.5rem] bg-blue-500 hover:bg-blue-400 mt-[1rem] rounded-lg font-[500] cursor-pointer w-[8rem] transition-all duration-400">
                <Plus size={18} />
                Add
            </button>
        </div>
    )
}
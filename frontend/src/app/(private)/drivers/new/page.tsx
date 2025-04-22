'use client'

import { CaretDown, Plus } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

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

interface FormData {
    name: string
    license: string
    vehicle: {
        id: string
        model: string
        type: string
        year: number
    }
}

export default function Page() {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(`Select the vehicle`);

    const { register, formState: { errors }, clearErrors, handleSubmit, setValue, watch } = useForm<FormData>()

    // Watch the selected value
    watch('vehicle');

    useEffect(() => {
        register('vehicle')
    }, [register])

    const router = useRouter()
    
    function handleOpenClick(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        setIsOpen(!isOpen);
    }

    function onSubmit(data: FormData) {
        console.log(data)

        router.push('/drivers')
    }

    return (
        <div className="w-[50%] pr-[2rem]">
            <h1 className="font-[600] text-[1.25rem]">Add Driver</h1>
            <form className="flex flex-col w-[60%] mt-[1rem] mb-[1rem]" onSubmit={handleSubmit(onSubmit)}>
                <label className="mb-[0.5rem]">Name:</label>
                <input 
                    type="text"
                    className="border border-gray-400 rounded-lg px-[0.875rem] py-[0.25rem] focus:outline-none focus:ring-1 focus:ring-gray-400 transition-all duration-200"
                    placeholder="Enter driver name"
                    {...register("name", 
                        { 
                            required: "Please, insert the driver name",
                            minLength: { value: 2, message: "The name requires almost 2 characters"},
                            maxLength: { value: 200, message: "The name must be no more than 200 characters"}
                        }
                    )}
                    onChange={() => clearErrors()}
                />
                { errors.name && <p className="text-red-500">{ errors.name.message }</p> }
                <label className="mb-[0.5rem] mt-[1rem]">License:</label>
                <input 
                    type="text"
                    className="border border-gray-400 rounded-lg px-[0.875rem] py-[0.25rem] focus:outline-none focus:ring-1 focus:ring-gray-400 transition-all duration-200"
                    placeholder="Enter the license"
                    {...register("license", 
                        { 
                            required: "Please, insert the license",
                            minLength: { value: 5, message: "The license requires almost 5 characters"},
                            maxLength: { value: 20, message: "The license must be no more than 20 characters"},
                            pattern: {
                                value: /^[A-Za-z0-9]{5,20}$/,
                                message: "Insert a valid license"
                            }
                        }
                    )}
                    maxLength={20}
                    onChange={() => clearErrors()}
                />
                { errors.license && <p className="text-red-500">{ errors.license.message }</p> }
                <label className="mb-[0.5rem] mt-[1rem]">Vehicle:</label>

                <div className="relative w-64 w-full">
                    <button
                        onClick={handleOpenClick}
                        className="flex justify-between items-center px-[1rem] w-full py-[0.25rem] text-green-700 border border-gray-300 rounded-md shadow-sm focus:border-green-700 cursor-pointer"
                    >
                        {selected}
                        <CaretDown size={16} />
                    </button>

                    { isOpen && (
                        <ul className="absolute w-full bg-gray-700 border border-gray-300 rounded-md mt-1 shadow-lg">
                            <li
                                onClick={() => {
                                    setSelected('No vehicle');
                                    setIsOpen(false);
                                }}
                                className="py-[0.25rem] px-[1rem] rounded-lg hover:bg-gray-600 text-gray-100 cursor-pointer transition-colors"
                            >No vehicle</li>
                            {vehicles.map((vehicle, index) => (
                            <li
                                key={index}
                                onClick={() => {
                                    setSelected(`${vehicle.model} - ${vehicle.plate}`);
                                    setValue("vehicle", vehicle)
                                    setIsOpen(false);
                                }}
                                className="py-[0.25rem] px-[1rem] rounded-lg hover:bg-gray-600 text-gray-100 cursor-pointer transition-colors"
                            >
                                {`${vehicle.model} - ${vehicle.plate}`}
                            </li>
                            ))}
                        </ul>
                        )
                    }    
                </div>                
                <button 
                    className="flex items-center justify-center gap-2 p-[0.5rem] bg-blue-500 hover:bg-blue-400 mt-[2rem] rounded-lg font-[500] cursor-pointer w-[8rem] transition-all duration-400"
                    type="submit"    
                >
                    <Plus size={18} />
                    Add
                </button>
            </form>
        </div>
    )
}
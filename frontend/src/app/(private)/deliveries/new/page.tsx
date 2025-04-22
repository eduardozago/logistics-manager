'use client'

import { CaretDown, Plus } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

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

interface FormData {
    origin: string
    destination: string
    driver: {
        id: string
        name: string
        license: string
    }
}

export default function Page() {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(`Select the driver`);
    
    const [ origin, setOrigin ] = useState('')
    const [ destination, setDestination ] = useState('')

    const { register, formState: { errors }, clearErrors, handleSubmit, setValue, watch } = useForm<FormData>()

    // Watch the selected value
    watch('driver');

    useEffect(() => {
        register('driver', { required: 'Please, select a driver' })
    }, [register])

    const router = useRouter()

    function handleOpenClick(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        setIsOpen(!isOpen);
    }

    function handleOriginChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value

        setOrigin(value)

        clearErrors()
    }

    function handlDestinationChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value

        setDestination(value)

        clearErrors()
    }

    function onSubmit(data: FormData) {
        console.log(data)

        router.push('/deliveries')
    }


    return (
        <div className="w-[50%] pr-[2rem]">
            <h1 className="font-[600] text-[1.25rem]">Add Delivery</h1>
            <form className="flex flex-col w-[60%] mt-[1rem] mb-[2rem]" onSubmit={handleSubmit(onSubmit)}>
                <label className="mb-[0.5rem]">Origin:</label>
                <input 
                    type="text"
                    className="border border-gray-400 rounded-lg px-[0.875rem] py-[0.25rem] mb-[0.5rem] focus:outline-none focus:ring-1 focus:ring-gray-400 transition-all duration-200"
                    placeholder="Enter delivery origin"
                    {...register("origin", 
                        { 
                            required: "Please, insert an origin to delivery",
                            minLength: { value: 2, message: "The origin requires almost 2 characters"},
                            maxLength: { value: 200, message: "The origin must be no more than 200 characters"}
                        }
                    )}
                    value={origin}
                    onChange={handleOriginChange}
                />
                { errors.origin && <p className="text-red-500">{ errors.origin.message }</p> }
                <label className="mb-[0.5rem] mt-[1rem]">Destination:</label>
                <input 
                    type="text"
                    className="border border-gray-400 rounded-lg px-[0.875rem] py-[0.25rem] mb-[0.5rem] focus:outline-none focus:ring-1 focus:ring-gray-400 transition-all duration-200"
                    placeholder="Enter delivery destiny"
                    {...register("destination", 
                        { 
                            required: "Please, insert an destination to delivery",
                            minLength: { value: 2, message: "The destination requires almost 2 characters"},
                            maxLength: { value: 200, message: "The destination must be no more than 200 characters"}
                        }
                    )}
                    value={destination}
                    onChange={handlDestinationChange}
                />
                { errors.destination && <p className="text-red-500">{ errors.destination.message }</p> }
                <label className="mb-[0.5rem] mt-[1rem]">Driver:</label>
                <div className="relative w-64 w-full">
                    <button
                        onClick={handleOpenClick}
                        className="flex justify-between items-center px-[1rem] w-full py-[0.25rem] text-gray-100 border border-gray-400 rounded-md shadow-sm focus:border-green-700 cursor-pointer"
                    >
                        {selected || "Please, select a driver"}
                        <CaretDown size={16} />
                    </button>

                    { isOpen && (
                        <ul className="absolute w-full bg-gray-700 border border-gray-300 rounded-md mt-1 shadow-lg">
                            {drivers.map((driver) => (
                            <li
                                key={driver.id}
                                onClick={() => {
                                    setSelected(driver.name);
                                    setValue("driver", driver)
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
                {errors.driver && ( <p className="text-red-500 text-sm mt-1">{errors.driver.message}</p> )}             
                <button className="flex items-center justify-center gap-2 p-[0.5rem] bg-blue-500 hover:bg-blue-400 mt-[2rem] rounded-lg font-[500] cursor-pointer w-[8rem] transition-all duration-400">
                    <Plus size={18} />
                    Add
                </button>
            </form>
        </div>
    )
}
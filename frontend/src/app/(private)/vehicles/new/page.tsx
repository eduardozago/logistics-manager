'use client'

import { CaretDown, Plus } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

enum VehicleType {
    CAR = 'Car',
    TRUCK = 'Truck',
    VAN = 'Van'
}

interface FormData { 
    plate: string
    model: string
    year: string
    type: VehicleType
}

export default function Page() {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(`Select the vehicle type`);

    const { register, formState: { errors }, clearErrors, handleSubmit, setValue, watch } = useForm<FormData>()

    // Watch the selected value
    watch('type');

    useEffect(() => {
        register('type', { required: 'Please, select the vehicle type' })
    }, [register])

    const router = useRouter()

    function handleOpenClick(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        setIsOpen(!isOpen);
    }

    function onSubmit(data: FormData) {
        console.log(data)

        router.push('/vehicles')
    }

    return (
        <div className="w-[50%] pr-[2rem]">
            <h1 className="font-[600] text-[1.25rem]">Add Vehicle</h1>
            <form className="flex flex-col w-[60%] mt-[1rem] mb-[1rem]" onSubmit={handleSubmit(onSubmit)}>
                <label className="mb-[0.5rem]">Plate:</label>
                <input 
                    type="text"
                    className="border border-gray-400 rounded-lg px-[0.875rem] py-[0.25rem] focus:outline-none focus:ring-1 focus:ring-gray-400 transition-all duration-200"
                    placeholder="Enter vehicle plate"
                    {...register("plate", 
                        { 
                            required: "Please, insert the vehicle plate",
                            minLength: { value: 7, message: "The plate requires almost 7 characters"},
                            maxLength: { value: 8, message: "The plate must be no more than 8 characters"}
                        }
                    )}
                    maxLength={8}
                    onChange={() => clearErrors()}
                />
                { errors.plate && <p className="text-red-500">{ errors.plate.message }</p> }
                <label className="mb-[0.5rem] mt-[1rem]">Model:</label>
                <input 
                    type="text"
                    className="border border-gray-400 rounded-lg px-[0.875rem] py-[0.25rem] focus:outline-none focus:ring-1 focus:ring-gray-400 transition-all duration-200"
                    placeholder="Enter the vehicle model"
                    {...register("model", 
                        { 
                            required: "Please, insert the vehicle model",
                            minLength: { value: 2, message: "The model requires almost 2 characters"},
                            maxLength: { value: 200, message: "The model must be no more than 200 characters"}
                        }
                    )}
                    onChange={() => clearErrors()}
                />
                { errors.model && <p className="text-red-500">{ errors.model.message }</p> }
                <label className="mb-[0.5rem] mt-[1rem]">Year:</label>
                <input 
                    type="text"
                    className="border border-gray-400 rounded-lg px-[0.875rem] py-[0.25rem] focus:outline-none focus:ring-1 focus:ring-gray-400 transition-all duration-200"
                    placeholder="Enter the vehicle year"
                    {...register("year", 
                        { 
                            required: "Please, insert the vehicle year",
                            minLength: { value: 2, message: "The year requires almost 2 characters"},
                            maxLength: { value: 4, message: "The year must be no more than 4 characters"},
                            pattern: {
                                value: /^\d{2,4}$/,
                                message: "Insert a valid year"
                            }
                        }
                    )}
                    maxLength={4}
                    onChange={(e) => {
                        const onlyNumbers = e.target.value.replace(/[^0-9]/g, "");
                        e.target.value = onlyNumbers;
                        clearErrors()}
                    }
                />
                { errors.year && <p className="text-red-500">{ errors.year.message }</p> }
                <label className="mb-[0.5rem] mt-[1rem]">Type:</label>
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
                            {Object.values(VehicleType).map((type) => (
                                <li
                                    onClick={() => {
                                        setSelected(type);
                                        setIsOpen(false);
                                        setValue("type", type as VehicleType)
                                        clearErrors("type")
                                    }}
                                    key={type}
                                    className="py-[0.25rem] px-[1rem] rounded-lg hover:bg-gray-600 text-gray-100 cursor-pointer transition-colors"
                                >
                                    {type}
                                </li>
                            ))}
                        </ul>
                        )
                    }    
                </div>
                {errors.type && ( <p className="text-red-500 text-sm mt-1">{errors.type.message}</p> )}                
                <button className="flex items-center justify-center gap-2 p-[0.5rem] bg-blue-500 hover:bg-blue-400 mt-[1rem] rounded-lg font-[500] cursor-pointer w-[8rem] transition-all duration-400">
                    <Plus size={18} />
                    Add
                </button>
            </form>
        </div>
    )
}
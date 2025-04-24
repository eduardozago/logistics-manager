'use client'

import { Plus, Truck, Van } from "@phosphor-icons/react";
import Link from "next/link";

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
    return (
        <div className="flex flex-col w-full items-center">
            <div className="flex justify-between w-full">
                <h1 className="font-[600] text-[1.25rem]">Vehicles</h1>
                <div>
                    <Link href='vehicles/new' className="flex items-center gap-3 bg-blue-500 px-[2rem] py-[0.25rem] rounded-lg cursor-pointer hover:bg-blue-400 transition-all duration-400">
                        <Plus size={18} />
                        New vehicle
                    </Link>
                </div>
            </div>
            <div className="overflow-auto mt-[1rem] w-full">
                <table className="w-full min-w-[36rem] border-collpse leading-6 mt-[1rem]">
                    <thead className="bg-gray-500 border-b-2 border-gray-600">
                        <tr className="rounded-t-lg font-[400]">
                            <th className="p-2 text-left leaging-6 first:pl-6 first:rounded-tl-[8px]">
                                Plate
                            </th>
                            <th className="p-2 text-left leaging-6">
                                Type
                            </th>
                            <th className="p-2 text-left leaging-6">
                                Model
                            </th>
                            <th className="p-2 text-left leaging-6 last:rounded-tr-[8px]">
                                Year
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehicles.map((row) => (
                            <tr className="border-b border-gray-500 first:pl-6 last:pr-6" key={row.id}>
                                <td className="p-2 first:pl-6 last:pr-6 w-[20%]">{row.plate}</td>
                                <td className="p-2">
                                    <div className="flex items-center gap-3">
                                        {row.type === 'Truck' ? (
                                            <>
                                                Truck
                                                <Truck size={18} />
                                            </>
                                        ) : (
                                            <>
                                                Van
                                                <Van size={18} />
                                            </>
                                        )
                                        }
                                    </div>
                                </td>
                                <td className="p-2">{row.model}</td>
                                <td className="p-2">{row.year}</td>
                            </tr>
                        ))}
                    </tbody>    
                </table>           
            </div>
            <button className="p-[0.5rem] mt-[1rem] text-gray-200 font-[500] cursor-pointer w-[8rem] hover:text-gray-100 transition-all duration-400">
                Show More
            </button>
        </div>
    )
}
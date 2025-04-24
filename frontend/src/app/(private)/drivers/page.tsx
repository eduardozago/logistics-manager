'use client'

import { ArrowSquareOut, Bed, Plus } from "@phosphor-icons/react";
import Link from "next/link";

export default function Page() {
    return (
        <div className="flex flex-col w-full items-center">
            <div className="flex justify-between w-full">
                <h1 className="font-[600] text-[1.25rem]">Drivers</h1>
                <div>
                    <Link href='drivers/new' className="flex items-center gap-3 bg-blue-500 px-[2rem] py-[0.25rem] rounded-lg cursor-pointer hover:bg-blue-400 transition-all duration-400">
                        <Plus size={18} />
                        New driver
                    </Link>
                </div>
            </div>
            <div className="overflow-auto mt-[1rem] w-full">
                <table className="w-full min-w-[36rem] border-collpse leading-6 mt-[1rem]">
                    <thead className="bg-gray-500 border-b-2 border-gray-600">
                        <tr className="rounded-t-lg font-[400]">
                            <th className="p-2 text-left leaging-6 first:pl-6 first:rounded-tl-[8px]">
                                License number
                            </th>
                            <th className="p-2 text-left leaging-6">
                                Name
                            </th>
                            <th className="p-2 text-left leaging-6 last:rounded-tr-[8px]">
                                Current delivery
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-gray-500 first:pl-6 last:pr-6">
                            <td className="p-2 first:pl-6 last:pr-6 w-[20%]">1</td>
                            <td className="p-2">John Doe</td>
                            <td className="p-2 first:pl-6 last:pr-6 w-[35%]">
                                <div className="flex gap-2 items-center bg-gray-500 pl-[1rem] rounded-lg cursor-pointer hover:bg-gray-400 transition-all duration-400">
                                    Chicago (IL) to Miami (FL)
                                    <ArrowSquareOut size={18} />
                                </div>
                            </td>
                        </tr>
                        <tr className="border-b border-gray-500 first:pl-6 last:pr-6">
                            <td className="p-2 first:pl-6 last:pr-6">2</td>
                            <td className="p-2">Bob Johnson</td>
                            <td className="p-2 first:pl-6 last:pr-6">
                                <div className="flex gap-2 items-center pl-[1rem]">
                                    Resting
                                    <Bed size={18} />
                                </div>
                            </td>
                        </tr>  
                    </tbody>    
                </table>           
            </div>
            <button className="p-[0.5rem] mt-[1rem] text-gray-200 font-[500] cursor-pointer w-[8rem] hover:text-gray-100 transition-all duration-400">
                Show More
            </button>
        </div>
    )
}
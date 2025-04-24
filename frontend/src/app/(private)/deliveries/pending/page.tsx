'use client'

import { CarProfile, Check, Plus, Spinner, X } from "@phosphor-icons/react";
import Link from "next/link";

enum DeliveryStatus {
    PENDING = 'Pending',
    IN_TRANSIT = 'In transit',
    DELIVERED = 'Delivered',
    ISSUES = 'Issues'
}

const deliveries = [
    {
        id: '1',
        from: "New York (NY)",
        to: "Los Angeles (CA)",
        status: DeliveryStatus.IN_TRANSIT,
    },
    {
        id: '2',
        from: "San Francisco (CA)",
        to: "Seattle (WA)",
        status: DeliveryStatus.DELIVERED,
    },
    {
        id: '3',
        from: "Boston (MA)",
        to: "Atlanta (GA)",
        status: DeliveryStatus.ISSUES,
    },
    {
        id: '4',
        from: "Dallas (TX)",
        to: "Denver (CO)",
        status: DeliveryStatus.PENDING,
    },
    {
        id: "5",
        from: "Chicago (IL)",
        to: "Miami (FL)",
        status: DeliveryStatus.DELIVERED
    },
    {
        id: "6",
        from: "Washington, D.C.",
        to: "Orlando (FL)",
        status: DeliveryStatus.DELIVERED
    },
    {
        id: "7",
        from: "San Diego (CA)",
        to: "Las Vegas (NV)",
        status: DeliveryStatus.PENDING
    },
    {
        id: "8",
        from: "Houston (TX)",
        to: "New Orleans (LA)",
        status: DeliveryStatus.PENDING
    },
    {
        id: "9",
        from: "Los Angeles (CA)",
        to: "Phoenix (AZ)",
        status: DeliveryStatus.DELIVERED
    },
    {
        id: "10",
        from: "Minneapolis (MN)",
        to: "Denver (CO)",
        status: DeliveryStatus.IN_TRANSIT
    }
]

const pendingDeliveries = deliveries.filter(delivery => delivery.status === DeliveryStatus.PENDING)

export default function Page() {

    return (
        <div className="flex flex-col w-full items-center">
            <div className="flex justify-between w-full">
                <h1 className="font-[600] text-[1.25rem]">Pending Deliveries</h1>
                <div>
                    <Link href='deliveries/new' className="flex items-center gap-3 bg-blue-500 px-[2rem] py-[0.25rem] rounded-lg cursor-pointer hover:bg-blue-400 transition-all duration-400">
                        <Plus size={18} />
                        New delivery
                    </Link>
                </div>
            </div>
            <div className="overflow-auto w-full">
                <table className="w-full border-collpse min-w-[40rem] leading-6 mt-[1rem]">
                    <thead className="bg-gray-500 border-b-2 border-gray-600">
                        <tr className="rounded-t-lg font-[400]">
                            <th className="p-2 text-left leaging-6 first:pl-6 first:rounded-tl-[8px]">
                                ID
                            </th>
                            <th className="p-2 text-left leaging-6">
                                From
                            </th>
                            <th className="p-2 text-left leaging-6">
                                To
                            </th>
                            <th className="p-2 text-left leaging-6 last:rounded-tr-[8px]">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {pendingDeliveries.map((row) => (
                            <tr className="border-b border-gray-500 first:pl-6 last:pr-6" key={row.id}>
                                <td className="p-2 first:pl-6 last:pr-6 w-[20%]">{row.id}</td>
                                <td className="p-2">{row.from}</td>
                                <td className="p-2">{row.to}</td>
                                <td className="p-2">
                                    {(() => {
                                        switch (row.status) {
                                            case 'Pending':
                                                return (
                                                    <div className="flex justify-center items-center gap-3 rounded-lg bg-yellow-500 text-gray-700">
                                                        <Spinner size={18} />
                                                        Pending
                                                    </div>
                                                )
                                            case 'In transit':
                                                return (
                                                    <div className="flex justify-center items-center gap-3 rounded-lg bg-blue-400 text-gray-700">
                                                        <CarProfile size={18} />
                                                        In transit
                                                    </div>
                                                )
                                            case 'Delivered':
                                                return (
                                                    <div className="flex justify-center items-center gap-3 rounded-lg bg-green-500 text-gray-700">
                                                        <Check size={18} />
                                                        Delivered
                                                    </div>
                                                )
                                            case 'Issues':
                                                return (
                                                    <div className="flex justify-center items-center gap-3 rounded-lg bg-red-500 text-gray-700">
                                                        <X size={18} />
                                                        Issues
                                                    </div>
                                                )
                                            default: 
                                            return null 
                                        }
                                    })()}
                                </td>
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
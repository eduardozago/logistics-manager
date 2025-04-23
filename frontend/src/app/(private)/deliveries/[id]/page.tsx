'use client'

import { useParams } from "next/navigation"
import Dropdown from "./components/dropdown"
import { useState } from "react"

enum DeliveryStatus {
    PENDING = 'Pending',
    IN_TRANSIT = 'In transit',
    DELIVERED = 'Delivered',
    ISSUES = 'Issues'
}

const delivery = {
    id: '1',
    origin: "New York (NY)",
    destination: "Los Angeles (CA)",
    status: DeliveryStatus.IN_TRANSIT,
}

const vehicle = {
    id: '1',
    model: "Volvo FH16",
    type: "Truck",
    plate: "ABC1234",
    year: 2019
}

const driver = {
    id: '1',
    name: "John Doe",
    license: "123",
}

export default function Page() {
    const params = useParams()
    
    const id = String(params.id)

    const deliveryStatus = delivery.status

    const [ status, setStatus ] = useState(deliveryStatus)

    return (
        <div className="w-full px-[1rem]">
            <div className="w-full flex items-center justify-center border-b border-gray-500 pb-[1rem]">
                <h1 className="font-[600] text-[1.25rem] flex-1">{`From ${delivery.origin} to ${delivery.destination}`}</h1>
                <div>
                    <Dropdown status={status} setStatus={setStatus}/>
                </div>
                <span className="text-gray-200 flex-1 flex justify-end">{`#${id}`}</span>
            </div>
            <div className="flex gap-4 w-full h-full mt-[1rem]">
                <div className="flex-1 border border-gray-500 rounded-lg p-[1rem]">
                    <div>
                        <span className="font-[500]">{driver.name}</span>
                        <p className="text-[0.875rem] mt-[0.5rem] text-gray-200">License: {driver.license}</p>
                    </div>
                </div>
                <div className="flex-1 border border-gray-500 rounded-lg p-[1rem]">
                    <span className="font-[500]">{vehicle.model}</span>
                    <p className="text-[0.875rem] mt-[0.5rem] text-gray-200">Plate: {vehicle.plate}</p>
                    <p className="text-[0.875rem] mt-[0.5rem] text-gray-200">Type: {vehicle.type}</p>
                    <p className="text-[0.875rem] mt-[0.5rem] text-gray-200">Year: {vehicle.year}</p>
                </div>
            </div> 
        </div>
    )
}
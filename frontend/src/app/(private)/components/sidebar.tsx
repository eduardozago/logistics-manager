'use client'

import { ChartLine, Package, Truck, UsersThree } from "@phosphor-icons/react";
import Link from "next/link";

export default function Sidebar() {
    return (
        <aside className="fixed w-[14rem] top-[5rem] left-0 h-[calc(100vh-5rem)] border-r border-gray-400 p-3 flex flex-col gap-4 transition-all duration-300 ease-in-out bg-gray-800 z-40">
            <nav className="flex flex-col gap-2">
                <Link
                    className="flex gap-3 items-center px-[1.875rem] py-[0.875rem] rounded-lg hover:bg-gray-600 transition-all duration-200" 
                    href='/dashboard'
                    title="Dashboard"
                >
                    <ChartLine size={20} />
                    Dashboard
                </Link>
                <Link
                    className="flex gap-3 items-center px-[1.875rem] py-[0.875rem] rounded-lg hover:bg-gray-600 transition-all duration-200" 
                    href='/deliveries'
                    title="Deliveries"
                >
                    <Package size={20} />
                    Deliveries
                </Link>
                <Link
                    className="flex gap-3 items-center px-[1.875rem] py-[0.875rem] rounded-lg hover:bg-gray-600 transition-all duration-200" 
                    href='/drivers'
                    title="Drivers"
                >
                    <UsersThree size={20} />
                    Drivers
                </Link>
                <Link
                    className="flex gap-3 items-center px-[1.875rem] py-[0.875rem] rounded-lg hover:bg-gray-600 transition-all duration-200" 
                    href='/vehicles'
                    title="Vehicles"
                >
                    <Truck size={20} />
                    Vehicles
                </Link>
            </nav>
        </aside>
    )
}
'use client'

import { ChartLine, Package, TextIndent, TextOutdent, Truck, UsersThree } from "@phosphor-icons/react";
import Link from "next/link";
import { useState } from "react";

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            {/* Mobile button */}
            <button 
                className={`md:hidden fixed top-4 mt-[4.25rem] ${isOpen ? 'ml-[1.5rem] w-[10rem] flex justify-center transition-all duration-500 ease-in-out' : 'ml-[0.75rem]' } z-50 bg-gray-700 p-2 rounded bg-gray-800 border border-gray-400 transition-all duration-400 ease-in-out`}
                onClick={() => setIsOpen(!isOpen)}
            >
                { isOpen ? (
                    <TextOutdent size={28} className="text-gray-100" />
                ) : (
                    <TextIndent size={28} className="text-gray-100" />
                )}
            </button>

            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                />
            )}
            
            {/* Sidebar */}
            <aside className={`fixed top-[5rem] left-0 h-[calc(100vh-5rem)] bg-gray-800 border-r border-gray-400 flex flex-col gap-4 p-3 z-40 transition-all duration-300 ease-in-out 
                ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
                md:translate-x-0 md:static md:w-[14rem] w-[13rem]`}
            >
                <nav className="flex flex-col gap-2 py-[2.5rem] md:py-0">
                    <Link
                        className="flex gap-3 items-center px-[1.875rem] py-[0.875rem] rounded-lg hover:bg-gray-600 transition-all duration-200" 
                        href='/dashboard'
                        title="Dashboard"
                    >
                        <ChartLine className="w-[1.5rem] h-[1.5rem] md:w-[1.25rem] md:h-6" />
                        <span className={`block ${isOpen ? 'block' : 'hidden'} md:block`}>
                            Dashboard
                        </span>
                    </Link>
                    <Link
                        className="flex gap-3 items-center px-[1.875rem] py-[0.875rem] rounded-lg hover:bg-gray-600 transition-all duration-200" 
                        href='/deliveries'
                        title="Deliveries"
                    >
                        <Package size={20} />
                        <span className={`block ${isOpen ? 'block' : 'hidden'} md:block`}>
                            Deliveries
                        </span>
                    </Link>
                    <Link
                        className="flex gap-3 items-center px-[1.875rem] py-[0.875rem] rounded-lg hover:bg-gray-600 transition-all duration-200" 
                        href='/drivers'
                        title="Drivers"
                    >
                        <UsersThree size={20} />
                        <span className={`block ${isOpen ? 'block' : 'hidden'} md:block`}>
                            Drivers
                        </span>
                    </Link>
                    <Link
                        className="flex gap-3 items-center px-[1.875rem] py-[0.875rem] rounded-lg hover:bg-gray-600 transition-all duration-200" 
                        href='/vehicles'
                        title="Vehicles"
                    >
                        <Truck size={20} />
                        <span className={`block ${isOpen ? 'block' : 'hidden'} md:block`}>
                            Vehicles
                        </span>
                    </Link>
                </nav>
            </aside>
        </>
    )
}
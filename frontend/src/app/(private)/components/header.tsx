'use client'

import { SignOutButton } from "@clerk/nextjs";
import { SignOut } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
    return (
        <header className="h-[5rem] py-4 bg-gray-800 flex items-center justify-center sticky top-0 z-50 border-b border-gray-400">
            <div className="flex items-center justify-between w-full h-full px-8">
                <Link href='/'>
                    <Image 
                        className="flex" src='/logo-light.png' alt="Logo" width={60} height={60}
                        title="Go to the dashboard"
                    />
                </Link>
                <nav className="flex items-center justify-between gap-2">
                    <p className="text-[0.875rem]">Hello, John!</p>
                    <SignOutButton>
                        <button 
                            className="p-[1rem] rounded-lg cursor-pointer hover:bg-gray-600 transition-all duration-200"
                            title="Logout"
                        >
                            <SignOut size={26} />
                        </button>
                    </SignOutButton>
                </nav>
            </div>
        </header>
    )
}
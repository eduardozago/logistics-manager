'use client'

import { SignedOut, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PublicLayout({ children }: Readonly<{
    children: React.ReactNode;
  }>) {
    const { isSignedIn } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (isSignedIn) {
            router.replace('/dashboard')
        }
    }, [isSignedIn])

    return (
        <SignedOut>
            <div className="flex items-center justify-center h-[100vh]">
                {children}
            </div>
        </SignedOut>
    )
}
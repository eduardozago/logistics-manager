import { SignedIn } from "@clerk/nextjs";
import Header from "./components/header";
import Sidebar from "./components/sidebar";

export default function PrivateLayout({ children }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <SignedIn>
            <Header />
            <div className="flex">
                <Sidebar />
                <main className="px-[1rem] md:px-[2rem] md:pt-[2rem] pt-[4rem] w-full">
                    {children}
                </main>
            </div>
        </SignedIn>
    )
}
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
                <main className="ml-[14rem] p-[3rem]">
                    {children}
                </main>
            </div>
        </SignedIn>
    )
}
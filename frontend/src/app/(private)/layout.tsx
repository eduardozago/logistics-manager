import { SignedIn } from "@clerk/nextjs";
import Header from "./components/header";

export default function PrivateLayout({ children }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <SignedIn>
            <Header />
            {children}
        </SignedIn>
    )
}
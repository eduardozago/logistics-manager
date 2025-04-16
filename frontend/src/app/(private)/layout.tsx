import { SignedIn } from "@clerk/nextjs";

export default function PrivateLayout({ children }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <SignedIn>
            {children}
        </SignedIn>
    )
}
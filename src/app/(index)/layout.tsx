import { ReactNode } from "react";
import { IndexLayoutProvider } from "@/providers/index-layout-provider";

export default function IndexLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <IndexLayoutProvider value={{ title: 'Products', slug: 'shop' }}>
                {children}
            </IndexLayoutProvider>
        </>
    )
}

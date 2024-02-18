"use client"

import { AppContextProvider } from "../hooks/context/AppContext";


export default function RootLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <AppContextProvider>
            {children}
        </AppContextProvider>
    );
}
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import './globals.css'
import Header from "@/components/Header";
import AuthProvider from "@/providers/AuthProvider";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <AuthProvider>
            <Header/>
            <main className="h-[calc(100vh-64px)] flex flex-col justify-center items-center">
                {children}
            </main>
        </AuthProvider>
        </body>
        </html>
    )
}

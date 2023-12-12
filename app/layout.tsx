import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import './globals.css'
import Header from "@/components/Header";
import AuthProvider from "@/providers/AuthProvider";
import Footer from "@/components/Footer";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Next-todo',
    description: 'Next-todo',
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
            <main className="min-h-[calc(100vh-64px)] h-full bg-base-200 flex flex-col  items-center">
                {children}
            </main>
            <Footer/>
        </AuthProvider>
        </body>
        </html>
    )
}

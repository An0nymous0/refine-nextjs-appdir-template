"use client";

import {Inter} from 'next/font/google'
import './globals.css'
import {Refine} from "@refinedev/core";
import {authProvider} from "@/lib/authProvider";
import routerProvider from "@refinedev/nextjs-router/app";
import dataProvider from "@refinedev/simple-rest";
import {Toaster} from "@/components/ui/toaster"
import {notificationProvider} from "@/lib/notificationProvider";

const inter = Inter({subsets: ['latin']})

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <Refine
            authProvider={authProvider}
            routerProvider={routerProvider}
            dataProvider={dataProvider("API_URL")}
            resources={[
                {
                    name: "posts",
                    list: "/posts",
                },
                {
                    name: "welcome",
                    list: "/welcome",
                },
            ]}
            options={{
                syncWithLocation: true,
            }}
            notificationProvider={notificationProvider}
        >
            {children}
        </Refine>
        <Toaster/>
        </body>
        </html>
    )
}

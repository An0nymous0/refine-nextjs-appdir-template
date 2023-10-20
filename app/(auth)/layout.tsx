import React from "react";
import {redirect} from "next/navigation";
import {authProvider} from "@/lib/authProvider";

export default async function ProtectedLayout({children}: {
    children: React.ReactNode;
}) {
    const auth = await authProvider.check();
    if (auth.authenticated) {
        return redirect("/");
    } else {
        return <>{children}</>;
    }
}
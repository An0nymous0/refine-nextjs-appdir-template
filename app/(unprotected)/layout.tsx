import React from "react";

export default function UnProtectedLayout({children}: {
    children: React.ReactNode;
}) {
    return (
        <>
            {children}
        </>
    );
}
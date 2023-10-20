"use client"
import React from "react";
import {Authenticated} from "@refinedev/core";

export default function ProtectedLayout({children}: {
    children: React.ReactNode;
}) {
    return (
        <Authenticated redirectOnFail="/login" loading={<div>loading...</div>} v3LegacyAuthProviderCompatible>
            {children}
        </Authenticated>
    );
}
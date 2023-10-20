"use client";

import {useLogout} from "@refinedev/core";
import {getSession} from "next-auth/react";

export default function Posts() {
    const {mutate: logout} = useLogout();
    const getSessions = () => {
        getSession().then(e =>
            console.log("Posts-getSession()", e)
        );
    }
    return (
        <>
            <button onClick={() => logout()}>退出</button>
            <button onClick={() => getSessions()}>获取 session</button>
        </>
    );
}
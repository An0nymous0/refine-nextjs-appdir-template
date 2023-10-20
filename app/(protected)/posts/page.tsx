"use client";

import {useLogout} from "@refinedev/core";
import {getSession} from "next-auth/react";
import {Button} from "@/components/ui/button";
import {useState} from "react";

export default function Posts() {
    const [session, setSession] = useState({})
    const {mutate: logout} = useLogout();
    const getSessions = () => {
        getSession().then(e =>
            setSession({...e})
        );
    }
    return (
        <>
            <nav className="py-4 px-4 sm:px-6 lg:px-4 xl:px-6 text-sm font-medium">
                <ul className="flex space-x-3">
                    <li>
                        <Button onClick={() => getSessions()}>show session</Button>

                    </li>
                    <li>
                        <Button onClick={() => logout()}>退出</Button>
                    </li>
                </ul>
            </nav>
            <p className="mt-4 text-sm leading-6 col-start-1 sm:col-span-2 lg:mt-6 lg:row-start-4 lg:col-span-1 dark:text-slate-400">
                <p>{JSON.stringify(session)}</p>
            </p>
        </>
    );
}
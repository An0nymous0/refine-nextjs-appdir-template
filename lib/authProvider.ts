import { AuthBindings } from "@refinedev/core";
import {getSession, signIn, signOut} from "next-auth/react";
import {getServerAuthSession} from "@/lib/nextAuth";
import {type Session} from "next-auth";

export const authProvider: AuthBindings = {
    login: async ({ username,password,redirectTo }) => {
        const signInResponse = await signIn("credentials", {
            username: username,
            password: password,
            redirect: false,
        })
        if (!signInResponse) {
            return {
                success: false,
            };
        }
        const { ok, error } = signInResponse;

        if (ok) {
            return {
                success: true,
                redirectTo: redirectTo?redirectTo:"/",
            };
        }

        return {
            success: false,
            error: new Error(error?.toString()),
        };
    },
    register: async (params) => {
        // Suppose we actually send a request to the back end here.
        // const user = mockUsers.find((item) => item.email === params.email);
        //
        // if (user) {
        //     nookies.set(null, "auth", JSON.stringify(user), {
        //         maxAge: 30 * 24 * 60 * 60,
        //         path: "/",
        //     });
        //     return {
        //         success: true,
        //         redirectTo: "/",
        //     };
        // }
        return {
            success: false,
            error: {
                message: "Register failed",
                name: "Invalid email or password",
            },
        };
    },
    forgotPassword: async (params) => {
        // Suppose we actually send a request to the back end here.
        // const user = mockUsers.find((item) => item.email === params.email);
        //
        // if (user) {
        //     //we can send email with reset password link here
        //     return {
        //         success: true,
        //     };
        // }
        return {
            success: false,
            error: {
                message: "Forgot password failed",
                name: "Invalid email",
            },
        };
    },
    updatePassword: async (params) => {
        // Suppose we actually send a request to the back end here.
        const isPasswordInvalid =
            params.password === "123456" || !params.password;

        if (isPasswordInvalid) {
            return {
                success: false,
                error: {
                    message: "Update password failed",
                    name: "Invalid password",
                },
            };
        }

        return {
            success: true,
        };
    },
    logout: async () => {
        await signOut()
        return {
            success: true,
            redirectTo: "/login",
        };
    },
    onError: async (error) => {
        if (error && error.statusCode === 401) {
            return {
                error: new Error("Unauthorized"),
                logout: true,
                redirectTo: "/login",
            };
        }

        return {};
    },
    check: async () => {
        let session=await getValidSession();
        if (session) {
            return {
                authenticated: true,
            };
        }
        return {
            authenticated: false,
            error: {
                message: "Check failed",
                name: "Unauthorized",
            },
            logout: true,
            redirectTo: "/login",
        };
    },
    getPermissions: async () => {
        let session=await getValidSession();
        if(session){
            return session.user.roles
        }
        return null;
    },
    getIdentity: async () => {
        let session=await getValidSession();
        if (!session) return null;

        return session.user;
    },
};

const getValidSession=async () => {
    let session: Session | null = null;
    if (typeof window === 'undefined') {
        session = await getServerAuthSession()
    } else {
        session = await getSession()
    }
    return session;
}
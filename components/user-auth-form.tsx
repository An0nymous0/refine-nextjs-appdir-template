"use client"

import * as React from "react"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import * as z from "zod"

import {cn} from "@/lib/utils"
import {buttonVariants} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {toast} from "@/components/ui/use-toast"
import {Icons} from "@/components/icons"
import {useState} from "react";
import {useTimeoutEffect, useToggle} from "@react-hookz/web";
import {useLogin} from "@refinedev/core";
import {userAuthSchema} from "@/lib/validations/auth";
import { useSearchParams } from 'next/navigation'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
}

type FormData = z.infer<typeof userAuthSchema>

export function UserAuthForm({className, ...props}: UserAuthFormProps) {
    const searchParams = useSearchParams()

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<FormData>({
        resolver: zodResolver(userAuthSchema),
    })
    const {mutate: login, isLoading} = useLogin<FormData>();

    async function onSubmit(data: FormData) {
        login(
            {...data,redirectTo:searchParams.get("to")},
            {
                onSuccess: (authData) => {
                    console.log(authData)
                    if (authData.success) {
                        toast({
                            title: "登录成功",
                            description: "2秒后跳转",
                        })
                        toggleEnabled()
                    } else {
                        toast({
                            title: authData.error.message,
                            description: "您的登录请求失败，请再试一次。",
                            variant: "destructive",
                        })
                    }
                },
                onError: (error) => {
                    toast({
                        title: "登录异常：",
                        description: error.message,
                    })
                },
            });
    }

    // https://react-hookz.github.io/web/?path=/docs/lifecycle-usetimeouteffect--example
    const [enabled, toggleEnabled] = useToggle();
    const [replaceUrl, setReplaceUrl] = useState("/");
    const [timeoutValue, setTimeoutValue] = useState<number>(2000);

    const [cancel, reset] = useTimeoutEffect(
        () => {
            window.location.replace(replaceUrl);
        },
        enabled ? timeoutValue : undefined
    );

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-2">
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="username">
                            用户名
                        </Label>
                        <Input
                            id=" username"
                            placeholder="请输入用户名"
                            type="text"
                            autoCapitalize="none"
                            autoComplete="username"
                            autoCorrect="off"
                            disabled={isLoading}
                            {...register("username")}
                        />
                        {errors?.username && (
                            <p className="px-1 text-xs text-red-600">
                                {errors.username.message}
                            </p>
                        )}
                    </div>
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="password">
                            密码
                        </Label>
                        <Input
                            id="password"
                            placeholder="请输入密码"
                            type="password"
                            autoCapitalize="none"
                            autoComplete="password"
                            autoCorrect="off"
                            disabled={isLoading}
                            {...register("password")}
                        />
                        {errors?.password && (
                            <p className="px-1 text-xs text-red-600">
                                {errors.password.message}
                            </p>
                        )}
                    </div>
                    <button className={cn(buttonVariants())} disabled={isLoading}>
                        {isLoading && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin"/>
                        )}
                        登录
                    </button>
                </div>
            </form>
        </div>
    )
}
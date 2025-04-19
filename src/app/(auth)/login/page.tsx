'use client'

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import loginImage from "@/assets/images/Login.svg";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeClosed, Mail } from "lucide-react";
import { useState } from "react";
import RFlex from "@/components/RComponents/RFlex";
import RButton from "@/components/RComponents/RButton";
import { login } from "@/store/slices/authSlice";
import { useMutateData } from "@/hooks/useMutateData";
import { authApi } from "@/lib/api/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { User } from "@/types/user";

const loginValidation = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 charachters" }),
});

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const { mutate: loginMutation, isPending } = useMutateData({
        mutationFn: authApi.login,
        dispatch: true,
        action: login,
        onSuccessFn: (data: any) => {
            console.log(data);
            router.push("/admin");
        },
    });

    const form = useForm<z.infer<typeof loginValidation>>({
        resolver: zodResolver(loginValidation),
        defaultValues: {
            email: "admin@example.com",
            password: "12345678",
        },
    });


    const onSubmit = (values: z.infer<typeof loginValidation>) => {
        const payload = {
            email: values.email,
            password: values.password,
        }
        loginMutation(payload as User)
    };



    return (
        <RFlex className="w-full sm:w-[90%] lg:w-[80%] h-[65vh] md:h-[80vh] flex-col md:flex-row items-center justify-between rounded-[20px] border border-gray-200 bg-white shadow-md">
            <RFlex className="hidden gap-[20px] md:flex flex-col items-center justify-center bg-muted w-full md:w-[50%] h-[30vh] md:h-full rounded-none md:rounded-[20px] md:rounded-tr-[130px] md:rounded-br-[130px]">
                <Image src={loginImage} className="w-[50%] md:w-[70%]" alt="logo" />
            </RFlex>

            <Form {...form}>
                <div className="w-full sm:w-[440px] items-start flex-col p-10 m-0 md:mb-2 md:mr-[30px]">
                    <h1 className="text-3xl font-bold mb-4">Login</h1>
                    <span className="gap-[10px] text-[#8b8b8b] text-[14px] lg:text-[14px] mb-[20px]">
                        Welcome back! Please log in to your account to continue.
                    </span>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="flex flex-col gap-[20px] lg:gap-[30px] w-full mt-6"
                    >
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            icon={<Mail className="h-5 w-5" />}
                                            iconPosition="right"
                                            placeholder={"Email"}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            placeholder={"Password"}
                                            icon={
                                                <>
                                                    {showPassword ? (
                                                        <button
                                                            type="button"
                                                            onClick={() => setShowPassword(!showPassword)}
                                                        >
                                                            <Eye className="h-5 w-5 cursor-pointer" />
                                                        </button>
                                                    ) : (
                                                        <button
                                                            type="button"
                                                            onClick={() => setShowPassword(!showPassword)}
                                                        >
                                                            <EyeClosed className="h-5 w-5 cursor-pointer" />
                                                        </button>
                                                    )}
                                                </>
                                            }
                                            iconPosition="right"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <RButton
                            text={"Login"}
                            type="submit"
                            loading={isPending}
                            disabled={isPending}
                        />
                    </form>
                </div>
            </Form>
        </RFlex>
    );
};

export default LoginPage;

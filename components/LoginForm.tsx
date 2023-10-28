"use client";

import {useForm, SubmitHandler} from "react-hook-form"
import Link from "next/link";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";
import {useState} from "react";

interface LoginFormProps {
    email: string;
    password: string;
}

export default function LoginForm() {
    const {register, handleSubmit, formState: {errors}} = useForm<LoginFormProps>();
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const router = useRouter();

    const onSubmit: SubmitHandler<LoginFormProps> = async (data) => {
        try {
            const response = await signIn("credentials", {
                redirect: false,
                email: data.email,
                password: data.password
            });

            if (response?.error) {
                if (response.status === 401) {
                    setError("Invalid credentials");
                    setSuccess(null);
                } else {
                    setError("Something went wrong. Please try again later.");
                    setSuccess(null);
                }
            } else {
                setSuccess("You have successfully logged in. Redirecting...");
                setError(null);
                router.push("/dashboard");
            }
        } catch (error: any) {
            setSuccess(null);
            setError("Something went wrong. Please try again later.");
        }
    }


    return (
        <>
            <div className="card-body w-full flex items-center justify-center px-2 sm:px-0">
                <div className="bg-none md:bg-base-200 p-6 sm:p-12 space-y-4 w-full sm:w-3/4 lg:w-1/2 rounded-xl">
                    {success && <div className="alert alert-success text-white">{success}</div>}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
                        <h2 className="card-title text-center text-lg sm:text-xl">Login</h2>

                        <div className="flex flex-col">
                            <input id={"email"} type="email" autoComplete={"email"} {...register("email", {
                                required: "Email is required",
                                pattern: /^\S+@\S+$/i
                            })} placeholder={"Email"}
                                   className="input input-bordered w-full text-sm"/>
                            {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
                        </div>

                        <div className="flex flex-col">
                            <input type="password" {...register("password", {
                                required: "Password is required",
                                minLength: {value: 6, message: "Password must be at least 6 characters"}
                            })} placeholder="Password"
                                   id={"password"}
                                   autoComplete={"current-password"}
                                   className="input input-bordered w-full text-sm"/>
                            {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}

                        </div>

                        {error && <span className="text-red-500 text-xs">{error}</span>}

                        <button type="submit" className="btn btn-primary w-full">Login</button>

                        <span className="text-xs sm:text-sm text-center">
                            Already have an account?&nbsp;
                            <Link href={"/register"} className="text-blue-500 hover:underline">
                              Register
                            </Link>
                         </span>
                    </form>

                </div>
            </div>
        </>
    )
}

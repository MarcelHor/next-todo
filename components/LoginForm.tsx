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
                    <div className="flex items-center justify-center space-x-2">
                        <span className="h-px bg-base-300 flex-1"></span>
                        <span>or</span>
                        <span className="h-px bg-base-300 flex-1"></span>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <button
                            className="btn btn-outline w-full flex items-center space-x-2"
                            onClick={() => {
                                signIn("github")
                            }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{fill: "#ffffff"}}>
                                <path
                                    d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                            <span>Login with github</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

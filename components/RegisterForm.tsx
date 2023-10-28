"use client";

import {useForm, SubmitHandler} from "react-hook-form"
import Link from "next/link";
import {useState} from "react";
import axios from "axios";

interface RegisterProps {
    username: string;
    password: string;
    email: string;
}

interface RegisterFormProps extends RegisterProps {
    confirmPassword: string;
}

export default function RegisterForm() {
    const {register, handleSubmit, watch, formState: {errors}} = useForm<RegisterFormProps>();
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const password = watch("password");

    const onSubmit: SubmitHandler<RegisterFormProps> = async (data) => {
        try {
            const response = await axios.post("/api/auth/register", data);
            if (response.status === 201) {
                setSuccess("You have successfully registered. Please proceed to login.");
                setError(null);
            }
        } catch (error: any) {
            setSuccess(null);
            if (error.response.status === 400) {
                setError(error.response.data.error);
            } else {
                setError("Something went wrong. Please try again later.");
            }
        }
    }

    return (
        <>
            <div className="card-body w-full flex items-center justify-center px-2 sm:px-0">
                <div className="bg-none md:bg-base-200 p-6 sm:p-12 space-y-4 w-full sm:w-3/4 lg:w-1/2 rounded-xl">
                    {success && <div className="alert alert-success text-white">{success}</div>}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
                        <h2 className="card-title text-center text-lg sm:text-xl">Register</h2>

                        <div className="flex flex-col">
                            <input id={"email"} type="email" autoComplete={"email"} {...register("email", {
                                required: "Email is required",
                                pattern: /^\S+@\S+$/i
                            })} placeholder={"Email"}
                                   className="input input-bordered w-full text-sm"/>
                            {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
                        </div>

                        <div className="flex flex-col space-y-2">
                            <input type="password" {...register("password", {
                                required: "Password is required",
                                minLength: {value: 6, message: "Password must be at least 6 characters"}
                            })} placeholder="Password"
                                   id={"password"}
                                   autoComplete={"current-password"}
                                   className="input input-bordered w-full text-sm"/>
                            {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}

                            <input
                                type="password" {...register("confirmPassword", {
                                validate: value => value === password || "The passwords do not match"
                            })} placeholder="Confirm password"
                                id={"confirmPassword"}
                                autoComplete={"new-password"}
                                className="input input-bordered w-full text-sm"/>
                            {errors.confirmPassword &&
                                <span className="text-red-500 text-xs">{errors.confirmPassword.message}</span>}
                        </div>

                        <div className={"flex flex-col w-full"}>
                            <input {...register("username", {required: "Username is required"})}
                                   placeholder={"Username"}
                                   id={"username"}
                                   autoComplete={"given-name"}
                                   className="input input-bordered w-full text-sm"/>
                            {errors.username &&
                                <span className="text-red-500 text-xs">{errors.username.message}</span>}
                        </div>


                        {error && <span className="text-red-500 text-xs">{error}</span>}

                        <button type="submit"
                                className="btn btn-primary w-full mt-4 text-sm">Register
                        </button>

                        <span className="text-xs sm:text-sm text-center">
                            Already have an account?&nbsp;
                            <Link href={"/login"} className="text-blue-500 hover:underline">
                              Login
                            </Link>
                         </span>
                    </form>
                    <div className="flex items-center justify-center space-x-2">
                        <span className="h-px bg-base-300 flex-1"></span>
                        <span>or</span>
                        <span className="h-px bg-base-300 flex-1"></span>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <a
                            className="btn btn-outline w-full flex items-center space-x-2"
                            href="http://localhost:8080/api/v1/oauth2/authorization/facebook"
                        >
                            {/*<img src={facebookIcon} alt="Facebook icon"/>*/}
                            <span>Login with github</span>
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}
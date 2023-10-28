"use client";

import Link from 'next/link';
import {useSession, signOut} from "next-auth/react";

export default function Header() {
    const {data: session, status} = useSession()
    return (
        <div className="navbar bg-base-100 h-16 flex items-center">
            <div className="flex-1">
                <Link href={"/"} className="btn btn-ghost normal-case text-xl">daisyUI</Link>
            </div>
            <div className="flex-none">
                {status !== "loading" && (
                    <>
                        {session ? (
                            <>
                                <span>
                                </span>
                                <Link href="/dashboard" className="btn btn-outline btn-sm btn-primary mr-2">
                                    Dashboard
                                </Link>
                                <button onClick={() => signOut({callbackUrl: "/"})}
                                        className="btn btn-sm btn-primary">
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link href="/login" className="btn btn-outline btn-sm btn-primary mr-2">
                                    Login
                                </Link>
                                <Link href="/register" className="btn btn-sm btn-primary">
                                    Register
                                </Link>
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

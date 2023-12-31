"use client";
import Link from "next/link";
import {useSession, signOut} from "next-auth/react";

export default function HeaderButtons() {
    const {data: session, status} = useSession()

    return (
        <>
            {session ? (
                <>
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
    );
}
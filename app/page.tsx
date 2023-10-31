import Link from "next/link";

export default function Home() {
    return (
        <>
            <div className="card-body w-full flex items-center justify-center px-2 sm:px-0 ">
                <div className="p-6 sm:p-12 space-y-4 w-full sm:w-3/4 lg:w-1/2 rounded-xl flex items-center justify-center">
                    <div className="max-w-xl flex flex-col items-center justify-center">
                        <h1 className="text-5xl font-bold">Welcome to Next-Todo</h1>
                        <p className="py-6">
                            Next-Todo is your cutting-edge task management tool. Effortlessly create, edit, and delete task lists.
                            Never forget vital tasks or lose notes ever again. Everything organized in one place, simply and quickly.
                        </p>
                        <Link href={"/register"} className="btn btn-primary">Get Started Now</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

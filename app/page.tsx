import prisma from "@/lib/db";

export default async function Home() {
    const users = await prisma.user.findMany()
    console.log(users)

    return (
        <>
            <div className="hero bg-base-200 h-full">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">Hello there</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                        <button className="btn btn-primary">Get Started</button>
                    </div>
                </div>
            </div>
        </>
    )
}

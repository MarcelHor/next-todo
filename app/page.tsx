import prisma from "@/lib/db";

export default async function Home() {
    const users = await prisma.user.findMany()

    return (
        <div>
            {users.map((user) => (
                <div key={user.id}>
                    <h1>{user.username}</h1>
                </div>
            ))}
        </div>
    )
}

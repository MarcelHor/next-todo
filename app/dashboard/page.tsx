import CreateTodoList from "@/components/todoList/CreateTodoList";
import TodoList from "@/components/todoList/TodoList";
import {getServerSession} from "next-auth/next";
import {options} from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/lib/db";

export default async function Dashboard() {
    const session: any = await getServerSession(options);
    const lists = await prisma.todoList.findMany({
        where: {
            userId: parseInt(session.user.id)
        }
    });

    return (
        <div className="h-full w-2/3 mt-16">
            <CreateTodoList/>
            <span className={"divider"}/>
            <ul className="space-y-2">
                {lists.map((list) => (
                    <TodoList key={list.id} list={list}/>
                ))}
            </ul>
        </div>
    )
}
import prisma from "@/lib/db";
import CreateTodoItem from "@/components/todoItem/CreateTodoItem";
import {TodoItem} from "@/components/todoItem/todoItem";
import {options} from "@/app/api/auth/[...nextauth]/options";
import {getServerSession} from "next-auth/next";

export default async function TodoItemPage({params}: any) {
    const session: any = await getServerSession(options);
    const user = session.user;
    const todos = await prisma.todo.findMany({
        where: {
            listId: parseInt(params.id),
            list: {
                userId: parseInt(user.id)
            }
        }
    });

    const list = await prisma.todoList.findUnique({
        where: {
            id: parseInt(params.id)
        }
    });

    if (!list || Number(list.userId) !== Number(user.id)) {
        return (
            <div className="h-full w-2/3 mt-16">
                <h1 className="text-2xl font-bold">404</h1>
            </div>
        )
    }

    return (
        <div className="h-full w-full px-2 md:w-2/3 mt-16">
            <CreateTodoItem listId={params.id}/>
            <span className={"divider"}/>
            <ul className="space-y-2">
                {todos.map((todo) => (
                    <TodoItem todo={todo} key={todo.id} listId={params.id}/>
                ))}
            </ul>
        </div>
    )
}
import prisma from "@/lib/db";
import CreateTodoItem from "@/components/todoItem/CreateTodoItem";
import {options} from "@/app/api/auth/[...nextauth]/options";
import {getServerSession} from "next-auth/next";
import Link from "next/link";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import TodoDisplay from "@/components/todoItem/TodoDisplay";
import {notFound} from "next/navigation";

export default async function TodoItemPage({params}: any) {
    const session: any = await getServerSession(options);
    if (isNaN(params.id) || !session) {
        notFound();
    }
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
        notFound();
    }

    // @ts-ignore
    return (
        <div className="h-full w-full px-2 md:w-2/3 mt-16">
            <div className="flex justify-between items-center">
                <Link href={"/dashboard"}
                      className="flex justify-between items-center hover:opacity-75"><FontAwesomeIcon icon={faArrowLeft}
                                                                                                      className="text-2xl cursor-pointer mr-2"
                                                                                                      size={"xs"}/>Dashboard</Link>
                <Link className={"link hover:opacity-75"}
                      href={`http://localhost:3000/api/todo-list/${params.id}`}>JSON</Link>
            </div>
            <CreateTodoItem listId={params.id}/>
            <span className={"divider"}/>
            <TodoDisplay todos={todos}/>
        </div>
    )
}
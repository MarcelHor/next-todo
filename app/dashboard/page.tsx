import CreateTodoList from "@/components/todoList/CreateTodoList";
import TodoList from "@/components/todoList/TodoList";
import {getServerSession} from "next-auth/next";
import {options} from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/lib/db";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import { notFound } from 'next/navigation'

export default async function Dashboard() {
    const session: any = await getServerSession(options);

    if (!session) {
        notFound();
    }


    const lists = await prisma.todoList.findMany({
        where: {
            userId: parseInt(session.user.id)
        }
    });

    return (
        <div className="h-full w-full px-2 md:w-2/3 mt-16">
            <div className="flex justify-between items-center">
                <Link href={"/"} className="flex justify-between items-center hover:opacity-75"><FontAwesomeIcon icon={faArrowLeft} className="text-2xl cursor-pointer mr-2" size={"xs"}/>Home</Link>
                <Link className={"link hover:opacity-75"} href={"https://next-todo-red.vercel.app/api/todo-list"}>JSON</Link>
            </div>
            <CreateTodoList/>
            <span className={"divider"}/>
            <ul className="grid md:grid-cols-3 md:gap-4 gap-2 grid-cols-1 mt-2">
                {lists.map((list) => (
                    <TodoList key={list.id} list={list}/>
                ))}
            </ul>
        </div>
    )
}
import prisma from "@/lib/db";
import UpdateTodoForm from "@/components/todoItem/UpdateTodoForm";
import {getServerSession} from "next-auth/next";
import {options} from "@/app/api/auth/[...nextauth]/options";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";

export default async function UpdateTodo({params}: any) {
    const session = await getServerSession(options);

    if (!session) {
        return (
            <div className="h-full w-2/3 mt-16">
                <h1 className="text-2xl font-bold">404</h1>
            </div>
        )
    }

    const todo = await prisma.todo.findUnique({
        where: {
            id: parseInt(params.todoId)
        }
    })

    if (!todo) {
        return (
            <div className="h-full w-2/3 mt-16">
                <h1 className="text-2xl font-bold">404</h1>
            </div>
        )
    }

    return (
        <div className="h-full w-full px-2 md:w-2/3 mt-16">
            <Link href={`/dashboard/${params.id}`}><FontAwesomeIcon icon={faArrowLeft}
                                                                    className="text-2xl cursor-pointer hover:opacity-75"/></Link>
            <UpdateTodoForm todo={todo} listId={params.id}/>
        </div>
    )
}


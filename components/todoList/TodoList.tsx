"use client";
import Link from "next/link";
import {deleteTodoList} from "@/lib/api/todoService";
import {useRouter} from "next/navigation";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";

export default function TodoList({list}: any) {
    const router = useRouter();

    const handleDelete = async (event: any, id: number) => {
        event.stopPropagation();
        const confirm = window.confirm("Are you sure you want to delete this list? All todos will be deleted as well. THIS ACTION CANNOT BE UNDONE!");
        if (!confirm) return;

        await deleteTodoList(id);
        router.refresh();
    }

    return (
        <li key={list.id} className="card bg-base-100 shadow-xl hover:brightness-90 flex flex-row">
            <Link href={"/dashboard/" + list.id} className="card-body flex flex-row items-center justify-between">
                <h1 className={"card-title"}>{list.title}</h1>
            </Link>
            <span onClick={(event) => handleDelete(event, list.id)} className={"cursor-pointer absolute right-5 top-2"}>
                <FontAwesomeIcon icon={faTrash} className={"text-error hover:text-red-500"} size={"1x"}/>
            </span>
        </li>
    )
}

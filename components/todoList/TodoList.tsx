"use client";
import Link from "next/link";
import {deleteTodoList} from "@/lib/api/todoService";
import {useRouter} from "next/navigation";

export default function TodoList({list}: any) {
    const router = useRouter();
    const handleDelete = async (id: number) => {
        await deleteTodoList(id);
        router.refresh();
    }

    return (
        <li key={list.id} className="flex justify-between">
            <Link href={"/dashboard/" + list.id}>{list.title}</Link>
            <button onClick={() => handleDelete(list.id)} className={"btn btn-error btn-xs"}>Delete</button>
        </li>
    )
}
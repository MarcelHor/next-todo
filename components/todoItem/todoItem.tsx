"use client";

import {deleteTodoItem, updateTodoItem} from "@/lib/api/todoService";
import Link from "next/link";
import {useRouter} from "next/navigation";

export function TodoItem({todo}: any) {
    const router = useRouter();

    const handleDelete = async () => {
        try {
            await deleteTodoItem(todo.listId, todo.id);
            router.refresh();
        } catch (e) {
            console.log(e);
        }
    }

    const handleSwitch = async () => {
        try {
            await updateTodoItem(todo.listId, todo.id, todo.text, !todo.isCompleted);
            router.refresh();
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <li className="flex justify-between">
            <div className="flex items-center space-x-4">
                {/*idk: should i use defaultChecked or checked?*/}
                <input type="checkbox" className="checkbox " checked={todo.isCompleted} onChange={handleSwitch}/>
                <span>{todo.text}</span>
            </div>
            <div className="flex space-x-2">
                 <Link href={`/dashboard/${todo.listId}/update/${todo.id}`} className={"btn btn-sm btn-outline btn-warning"}>Edit</Link>
                <button className="btn btn-sm btn-outline btn-error" onClick={handleDelete}>Delete</button>
            </div>
        </li>
    )
}
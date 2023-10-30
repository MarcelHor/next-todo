"use client";

import {deleteTodoItem} from "@/lib/api/todoService";
import {useRouter} from "next/navigation";

export function TodoItem({todo}: any, {listId}: any) {
    const router = useRouter();

    const handleDelete = async () => {
        try {
            await deleteTodoItem(todo.listId, todo.id);
            router.refresh();
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <li className="flex justify-between">
            <div className="flex items-center space-x-4">
                <input type="checkbox" className="checkbox checkbox-accent"/>
                <span>{todo.text}</span>
            </div>
            <div className="flex space-x-2">
                <button className="btn btn-sm btn-outline btn-secondary">Edit</button>
                <button className="btn btn-sm btn-outline btn-accent" onClick={handleDelete}>Delete</button>
            </div>
        </li>
    )
}
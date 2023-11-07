"use client"
import {updateTodoItem} from "@/lib/api/todoService";
import {useState} from "react";
import {useRouter} from "next/navigation";

export default function UpdateTodoForm({todo, listId}: any) {
    const router = useRouter();
    const [text, setText] = useState(todo.text);
    const [error, setError] = useState(null);

    const handleSubmit = async (e: any) => {
        try {
            e.preventDefault();
            await updateTodoItem(listId, todo.id, text, todo.isCompleted);
            setError(null);
            setText("");
            router.refresh();
            router.push(`/dashboard/${listId}`);
        } catch (error: any) {
            setError(error.message);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col">
                <label className="label">
                    <span className="label-text">Update todo</span>
                </label>
                <input type="text" name="title" id="title" defaultValue={todo.text} onChange={(e) => setText(e.target.value)}
                       className="input input-bordered mb-2"/>
            </div>
            <button type="submit" className="btn btn-primary w-full btn-sm">Update</button>
            {error && <p className="text-red-500">{error}</p>}
        </form>
    )
}
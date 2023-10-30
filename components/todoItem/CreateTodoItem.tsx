"use client";

import {createTodoItem} from "@/lib/api/todoService";
import {useRouter} from "next/navigation";
import {useState} from "react";

export default function CreateTodoItem({listId}: any) {
    const router = useRouter();
    const [text, setText] = useState("");

    const handleSubmit = async (e: any) => {
        try {
            e.preventDefault();
            await createTodoItem(listId, text);
            e.target.reset();
            router.refresh();
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <form className="mb-2" onSubmit={handleSubmit}>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Create todo</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Your todo item"
                        className="input input-bordered mb-2"
                        name="text"
                        onChange={(e) => setText(e.target.value)}
                    />
                    <button className="btn btn-primary btn-sm">Create</button>
                </div>
            </form>
        </>
    )
}
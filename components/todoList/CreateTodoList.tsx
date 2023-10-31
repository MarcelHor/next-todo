"use client"

import {createTodoList} from "@/lib/api/todoService";
import {useState} from "react";
import {useRouter} from "next/navigation";

export default function CreateTodoList() {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: any) => {
        try {
            e.preventDefault();
            await createTodoList(title);
            setTitle("");
            setError(null)
            e.target.reset();
            router.refresh();
        } catch (e: any) {
            setError(e.message);
        }
    };

    return (
        <form className="mb-2" onSubmit={handleSubmit}>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Create list</span>
                </label>
                <input
                    type="text"
                    placeholder="TodoList name"
                    className="input input-bordered mb-2"
                    name="title"
                    onChange={(e) => setTitle(e.target.value)}
                />
                <button className="btn btn-primary btn-sm">Create</button>
            </div>
            {error && <p className="text-error">{error}</p>}
        </form>
    );
}

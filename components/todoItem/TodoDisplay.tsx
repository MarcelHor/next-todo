"use client";

import {TodoItem} from "@/components/todoItem/todoItem";
import {useState} from "react";

type Todo = {
    id: number;
    isCompleted: boolean;
    text: string;
    createdAt: string;
    listId: number;
};

type TodoDisplayProps = {
    todos: Todo[];
};

export default function TodoDisplay({todos}: TodoDisplayProps) {
    const [filter, setFilter] = useState('all');

    const filteredTodos = todos.filter((todo: Todo) => {
        if (filter === 'completed') return todo.isCompleted;
        if (filter === 'active') return !todo.isCompleted;
        return true;
    });

    return (
        <div>
            <select
                className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 mb-8"
                onChange={(e) => setFilter(e.target.value)}>
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="active">Active</option>
            </select>

            <ul>
                <ul className="space-y-2">
                    {filteredTodos.map((todo) => (
                        <TodoItem todo={todo} key={todo.id}/>
                    ))}
                </ul>
            </ul>
        </div>
    );
}
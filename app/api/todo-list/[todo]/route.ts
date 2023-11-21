import {NextRequest, NextResponse} from "next/server";
import {getTodos, createTodo, deleteTodo, updateTodo} from "@/app/api/todo-list/[todo]/todoController";

export async function GET(request: NextRequest, {params}: { params: { todo: string } }) {
    try {
        const todos = await getTodos(parseInt(params.todo));
        return NextResponse.json(todos, {status: 200});
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: error.statusCode || 500});
    }
}

export async function POST(request: NextRequest, {params}: { params: { todo: string } }) {
    try {
        const {text} = await request.json();
        await createTodo(parseInt(params.todo), text);
        return NextResponse.json({message: "Todo successfully created"}, {status: 200});
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: error.statusCode || 500});
    }
}

export async function DELETE(request: NextRequest, {params}: { params: { todo: string } }) {
    try {
        const {todoId} = await request.json();
        await deleteTodo(parseInt(todoId));
        return NextResponse.json({message: "Todo successfully deleted"}, {status: 200});
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: error.statusCode || 500});
    }
}

export async function PUT(request: NextRequest, {params}: { params: { todo: string } }) {
    try {
        const {todoId, isCompleted, text} = await request.json();
        await updateTodo(parseInt(todoId), isCompleted, text);
        return NextResponse.json({message: "Todo successfully updated"}, {status: 200});
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: error.statusCode || 500});
    }
}

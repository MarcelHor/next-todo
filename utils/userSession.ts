import {getServerSession} from "next-auth/next";
import {options} from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/lib/db";

export async function validateSession(): Promise<any | null> {
    try {
        const session = await getServerSession(options);
        return session?.user || null;
    } catch (error: any) {
        return null;
    }
}

export async function hasAccessToTodo(userId: number, todoId: number): Promise<boolean> {
    try {
        const todo = await prisma.todo.findUnique({
            where: {id: todoId},
            include: {list: true}
        });
        if (!todo) {
            return false;
        }
        return todo.list && Number(todo.list.userId) === userId;
    } catch (error: any) {
        console.log(error);
        return false;
    }
}

export async function hasAccessToList(userId: number, listId: number): Promise<boolean> {
    try {
        const list = await prisma.todoList.findUnique({
            where: {id: listId},
        });
        if (!list) {
            return false;
        }
        return Number(list.userId) === userId;
    } catch (error: any) {
        console.log(error);
        return false;
    }
}

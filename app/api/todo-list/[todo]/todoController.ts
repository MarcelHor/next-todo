import prisma from "@/lib/db";
import joi from "joi";
import {hasAccessToList, hasAccessToTodo, validateSession} from "../../../../utils/userSession";
import ApiError from "../../../../utils/ApiError"



export async function createTodo(listId: number, text: string): Promise<any> {
    try {
        const user = await validateSession();
        if (!user || !await hasAccessToList(parseInt(user.id), listId)) {
            throw new ApiError("Unauthorized", 401);
        }

        const schema = joi.object({
            text: joi.string().required().min(1).max(100)
        }).messages({
            "string.base": `Todo text should be a type of 'text'`,
            "string.empty": `Todo text cannot be an empty field`,
            "string.min": `Todo text should have a minimum length of {#limit}`,
            "string.max": `Todo text should have a maximum length of {#limit}`,
            "any.required": `Todo text is a required field`
        });

        const {error} = schema.validate({text: text});
        if (error) {
            throw new ApiError(error.message, 400);
        }

        await prisma.todo.create({
            data: {
                text: text,
                listId: listId,
                isCompleted: false
            }
        });
        return {message: "Todo created."};
    } catch (error: any) {
        throw new ApiError(error.message, error.statusCode);
    }
}

export async function getTodos(listId: number): Promise<any> {
    try {
        const user = await validateSession();
        if (!user || !await hasAccessToList(parseInt(user.id), listId)) {
            throw new ApiError("Unauthorized", 401);
        }

        const schema = joi.object({
            listId: joi.number().required()
        }).messages({
            "number.base": `ListId should be a type of 'number'`,
            "number.empty": `ListId cannot be an empty field`,
            "any.required": `ListId is a required field`
        });

        const {error} = schema.validate({listId: listId});
        if (error) {
            throw new ApiError(error.message, 400);
        }

        return await prisma.todo.findMany({
            where: {
                listId: listId,
            }
        });
    } catch (error: any) {
        throw new ApiError(error.message, error.statusCode);
    }
}

export async function deleteTodo(todoId: number): Promise<any> {
    try {
        const user = await validateSession();
        if (!user || !await hasAccessToTodo(parseInt(user.id), todoId)) {
            throw new ApiError("Unauthorized", 401);
        }

        const schema = joi.object({
            todoId: joi.number().required()
        }).messages({
            "number.base": `TodoId should be a type of 'number'`,
            "number.empty": `TodoId cannot be an empty field`,
            "any.required": `TodoId is a required field`
        });

        const {error} = schema.validate({todoId: todoId});
        if (error) {
            throw new ApiError(error.message, 400);
        }

        await prisma.todo.delete({where: {id: todoId}});
        return {message: "Todo deleted."};
    } catch (error: any) {
        throw new ApiError(error.message, error.statusCode);
    }
}

export async function updateTodo(todoId: number, isCompleted: boolean, text: string): Promise<any> {
    try {
        const user = await validateSession();
        if (!user || !await hasAccessToTodo(parseInt(user.id), todoId)) {
            throw new ApiError("Unauthorized", 401);
        }

        const schema = joi.object({
            todoId: joi.number().required(),
            isCompleted: joi.boolean().required(),
            text: joi.string().required().min(1).max(255)
        }).messages({
            "number.base": `TodoId should be a type of 'number'`,
            "number.empty": `TodoId cannot be an empty field`,
            "any.required": `TodoId is a required field`,
            "boolean.base": `IsCompleted should be a type of 'boolean'`,
            "boolean.empty": `IsCompleted cannot be an empty field`,
            "string.base": `Text should be a type of 'text'`,
            "string.empty": `Text cannot be an empty field`,
            "string.min": `Text should have a minimum length of {#limit}`,
            "string.max": `Text should have a maximum length of {#limit}`,
        });

        const {error} = schema.validate({todoId: todoId, isCompleted: isCompleted, text: text});
        if (error) {
            throw new ApiError(error.message, 400);
        }

        await prisma.todo.update({
            where: {id: todoId},
            data: {isCompleted: isCompleted, text: text}
        });
        return {message: "Todo updated."};
    } catch (error: any) {
        throw new ApiError(error.message, error.statusCode);
    }
}


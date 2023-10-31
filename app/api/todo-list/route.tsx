import {getServerSession} from "next-auth/next"
import {options} from "@/app/api/auth/[...nextauth]/options";
import {NextResponse} from "next/server";
import prisma from "@/lib/db";
import Joi from 'joi';

async function validateSession() {
    const session = await getServerSession(options);
    if (!session || !session.user) {
        return null;
    }

    return session.user as any;
}

const postSchema = Joi.object({
    title: Joi.string().required().max(50)
}).messages
({
    "string.base": `List title should be a type of 'text'`,
    "string.empty": `Cannot be an empty field`,
    "string.min": `List title should have a minimum length of {#limit}`,
    "string.max": `List title should have a maximum length of {#limit}`,
    "any.required": `Title is a required field`
});


const deleteSchema = Joi.object({
    id: Joi.number().required()
}).messages
({
    "number.base": `Id should be a type of 'number'`,
    "number.empty": `Cannot be an empty field`,
    "any.required": `Id is a required field`
});

export async function GET(req: any, res: any) {
    try {
        const user = await validateSession();
        if (!user) {
            return NextResponse.json({error: "Unauthorized"}, {status: 401});
        }

        const lists = await prisma.todoList.findMany({
            where: {
                userId: parseInt(user.id)
            },
        });


        return NextResponse.json(lists, {status: 200});
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}

export async function POST(req: any, res: any) {
    try {

        const user = await validateSession();
        if (!user) {
            return NextResponse.json({error: "Unauthorized"}, {status: 401});
        }

        const {title} = await req.json();
        const {error} = postSchema.validate({title});
        if (error) {
            return NextResponse.json({error: error.message}, {status: 400});
        }

        await prisma.todoList.create({
            data: {
                title: title,
                userId: parseInt(user.id)
            }
        });
        return NextResponse.json("TodoList successfully created", {status: 200});
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}

export async function DELETE(req: any, res: any) {
    try {
        const user = await validateSession();
        if (!user) {
            return NextResponse.json({error: "Unauthorized"}, {status: 401});
        }

        const {id} = await req.json();
        const {error} = deleteSchema.validate({id});
        if (error) {
            return NextResponse.json({error: error.message}, {status: 400});
        }

        await prisma.todo.deleteMany({
            where: {
                listId: parseInt(id)
            }
        });

        await prisma.todoList.delete({
            where: {
                id: parseInt(id),
                userId: parseInt(user.id)
            }
        });

        return NextResponse.json("TodoList successfully deleted", {status: 200});
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({error: error.message}, {status: 500});
    }
}
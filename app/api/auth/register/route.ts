import prisma from "@/lib/db";
import {NextResponse} from "next/server";
import Joi from 'joi';

const bcrypt = require('bcrypt');

export async function POST(req: Request) {

    try {
        const body = await req.json();

        const schema = Joi.object({
            username: Joi.string().min(3).max(20).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
            confirmPassword: Joi.string().valid(Joi.ref('password')).required()
        }).messages({
            'string.empty': `Please fill in the {#label} field.`,
            'string.min': `The {#label} field must be at least {#limit} characters long.`,
            'string.max': `The {#label} field must be less than or equal to {#limit} characters long.`,
            'string.email': `Please enter a valid email address.`,
            'any.required': `The {#label} field is required.`,
            'any.only': `The {#label} field does not match.`
        });

        const {error} = schema.validate(body);

        if (error) {
            return NextResponse.json({error: error.details[0].message}, {status: 400});
        }

        const user = await prisma.user.findFirst({
            where: {
                email: body.email,
            }
        })

        if (user) {
            return NextResponse.json({error: "User already exists."}, {status: 400});
        }
        const saltRounds = parseInt(process.env.SALT_ROUNDS as string, 10);
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(body.password, salt);

        await prisma.user.create({
            data: {
                username: body.username,
                email: body.email,
                password: hashedPassword
            }
        })

        return NextResponse.json({message: "User registered."}, {status: 201});
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}

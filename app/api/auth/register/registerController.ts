import Joi from "joi";
import prisma from "@/lib/db";
import {genSalt, hash} from "bcrypt";


export async function registerUser(reqBody: any) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(20).required(),
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

    const {error, value} = schema.validate(reqBody);

    if (error) {
        throw new Error(error.details[0].message);
    }

    const user = await prisma.user.findFirst({
        where: {
            email: value.email,
        }
    });

    if (user) {
        throw new Error("User already exists.");
    }

    const saltRounds = parseInt(process.env.SALT_ROUNDS as string, 10);
    const salt = await genSalt(saltRounds);
    const hashedPassword = await hash(value.password, salt);

    await prisma.user.create({
        data: {
            name: value.name,
            email: value.email,
            password: hashedPassword
        }
    });

    return {message: "User registered."};
}


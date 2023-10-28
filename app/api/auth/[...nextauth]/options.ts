import type {NextAuthOptions} from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import prisma from "@/lib/db";

const bcrypt = require('bcrypt');

export const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email:",
                    type: "text",
                    placeholder: "Enter your email"
                },
                password: {
                    label: "Password:",
                    type: "password",
                    placeholder: "Enter your password"
                }
            },
            async authorize(credentials) {
                if (!credentials || !credentials.email || !credentials.password) {
                    return null
                }

                const user = await prisma.user.findFirst({
                    where: {
                        email: credentials.email,
                    }
                })

                if (user) {
                    const passwordMatch = await bcrypt.compare(credentials.password, user.password as string)
                    if (passwordMatch) {
                        return {
                            ...user,
                            id: user.id.toString()
                        }
                    } else {
                        return null
                    }
                } else {
                    return null
                }
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
}
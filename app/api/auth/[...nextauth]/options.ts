import type {NextAuthOptions} from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GitHubProvider from 'next-auth/providers/github'
import prisma from "@/lib/db";
import {compare} from "bcrypt";

export const options: NextAuthOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
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
                try {
                    if (!credentials || !credentials.email || !credentials.password) {
                        return null;
                    }

                    const user = await prisma.user.findFirst({
                        where: {
                            email: credentials.email,
                        }
                    });

                    if (user) {
                        const passwordMatch = await compare(credentials.password, user.password as string);
                        if (passwordMatch) {
                            return {
                                ...user,
                                id: user.id.toString()
                            };
                        } else {
                            return null;
                        }
                    } else {
                        return null;
                    }
                } catch (error) {
                    console.error("Error authorizing credentials:", error);
                    return null;
                }
            }
        })
    ],
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async signIn({ user, account }) {
            try {
                // If the user is signing in with GitHub, we want to create a user in our database if they don't already exist
                if (account?.provider === "github" && user?.email && user?.name) {
                    await prisma.user.upsert({
                        where: { email: user.email },
                        create: {
                            email: user.email,
                            name: user.name,
                            password: "",
                        },
                        update: {
                            name: user.name,
                        }
                    });
                }
            } catch (error) {
                console.error("Error signing in:", error);
                return false;
            }

            return true;
        },
        // Changes the JWT that is returned from the API route
        async jwt({ token, account, user }: { token: any, account?: any, user?: any }) {
            try {
                if (account && user) {
                    token.accessToken = account.access_token;
                    token.id = user?.id;
                }
                return token;
            } catch (error) {
                console.error("Error updating JWT:", error);
                return token;
            }
        },
        // Changes the session object
        session: ({ session, token }) => {
            return {
                ...session,
                user: {
                    id: token.id,
                    email: token.email,
                    name: token.name,
                }
            };
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
}
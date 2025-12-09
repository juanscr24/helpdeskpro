import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import { prisma } from "@src/lib/db";
import * as bcrypt from "bcrypt";

if (!process.env.NEXTAUTH_SECRET) {
    throw new Error("NEXTAUTH_SECRET is not defined");
}

export const authOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt" as const,
        maxAge: 30 * 24 * 60 * 60, // 30 days
        updateAge: 24 * 60 * 60, // 24 hours
    },
    providers: [
        CredentialProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Name", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password", placeholder: "*******" }
            },

            async authorize(credentials, req) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email and password are required");
                }

                const userFound = await prisma.user.findUnique({
                    where: { email: credentials.email }
                })
                
                if (!userFound) {
                    throw new Error("Invalid email or password");
                }

                const matchPassword = await bcrypt.compare(credentials.password, userFound.password);
                
                if (!matchPassword) {
                    throw new Error("Invalid email or password");
                }

                return {
                    id: String(userFound.id),
                    name: userFound.name,
                    email: userFound.email,
                    role: userFound.role
                }
            }
        })
    ],
    callbacks: {
        async jwt({
            token,
            user,
        }: {
            token: import("next-auth/jwt").JWT;
            user?: { id: string; name: string; email: string; role: string };
        }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.role = user.role;
            }
            return token;
        },

        async session({
            session,
            token,
        }: {
            session: import("next-auth").Session;
            token: import("next-auth/jwt").JWT;
        }) {
            if (token) {
                session.user.id = token.id as string;
                session.user.name = token.name as string;
                session.user.email = token.email as string;
                session.user.role = token.role as string;
            }
            return session;
        },
    },
    pages: {
        signIn: '/login',
    }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
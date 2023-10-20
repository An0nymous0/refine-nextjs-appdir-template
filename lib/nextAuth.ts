import {getServerSession, NextAuthOptions, type User} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

const users = [
    {
        id:"1",
        nickname: "管理员",
        username: "fengchao",
        passowrd: "fc2023",
        roles: ["admin"],
    }
];

export const authOptions: NextAuthOptions = {
    secret: "process.env.NEXTAUTH_SECRET",
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    pages: {
        signIn: "/login",
    },
    callbacks: {
        jwt: async ({ token, user }) => {
            return token;
        },
        session: ({ session, token, user }) => {
            if (token) {
                const user = users.find((item) => item.id === token.sub);
                session.user.id=user?.id!;
                session.user.name=user?.nickname!;
                session.user.username=user?.username!;
                session.user.roles=user?.roles!;
            }
            return session;
        },
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "用户名", type: "text"},
                password: { label: "密码", type: "password" }
            },
            async authorize(credentials, req) {
                const user = users.find((item) => item.username === credentials?.username);
                if (user&&user.passowrd === credentials?.password) {
                    console.log("authorize-user",user)
                    return user
                } else {
                    throw new Error("用户名或密码错误")
                }
            }
        })
    ],
}

export const getServerAuthSession = () => getServerSession(authOptions);

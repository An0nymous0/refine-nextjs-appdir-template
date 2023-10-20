import {DefaultSession, DefaultUser, User} from "next-auth"
import {DefaultJWT} from "next-auth/jwt";

// doc https://next-auth.js.org/getting-started/typescript#adapters
declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: User
            & DefaultSession["user"]
    }

    interface User{
        nickname?: string,
        username?: string,
        roles?: Array
         & DefaultUser
    }
}
// import {PrismaAdapter} from "@next-auth/prisma-adapter";
// import prisma from "@/lib/prismadb";
// import GithubProvider from "next-auth/providers/github";
// import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcrypt";
// import {sign, verify} from "jsonwebtoken";
//
// export const authOptions: any = {
//     adapter: PrismaAdapter(prisma),
//     providers: [
//         // GithubProvider({
//         //     clientId: process.env.GITHUB_ID,
//         //     clientSecret: process.env.GITHUB_SECRET,
//         // }),
//         // GoogleProvider({
//         //     clientId: process.env.GOOGLE_ID,
//         //     clientSecret: process.env.GOOGLE_SECRET,
//         // }),
//         CredentialsProvider({
//             name: "credentials",
//             credentials: {
//                 email: {
//                     label: "Email",
//                     type: "text",
//                     placeholder: "utkarsh@gmail.com",
//                 },
//                 password: { label: "Password", type: "password" },
//                 username: {
//                     label: "Username",
//                     type: "text",
//                     placeholder: "Random Kumar",
//                 },
//             },
//             async authorize(credentials:any) {
//                 if (!credentials.email || !credentials.password) {
//                     throw new Error("Please enter email and password!");
//                 }
//                 const user = await prisma.user.findUnique({
//                     where: {
//                         email: credentials.email,
//                     },
//                 });
//
//                 console.log("signIn user", user, { user });
//
//                 if (!user) {
//                     throw new Error("User not found!");
//                 }
//                 //check to see if password matches
//                 const passwordMatch = await bcrypt.compare(
//                     credentials.password,
//                     user.hashedPassword
//                 );
//
//                 if (!passwordMatch) {
//                     throw new Error("Incorrect email and password combination!");
//                 }
//
//                 return user;
//             },
//         }),
//     ],
//     session: {
//         strategy: "jwt",
//     },
//     callbacks: {
//         async jwt({ token, user }: any) {
//             if (user) {
//                 token.user = user;
//             }
//             return token;
//         },
//         async session({ session, token }: any) {
//             session.user = token.user;
//             return session;
//         },
//     },
//     cookies: {
//         sessionToken: {
//             name: `next-auth.session-token`,
//             options: {
//                 httpOnly: false,
//                 sameSite: "lax",
//                 path: "/",
//                 secure: false,
//             },
//         },
//     },
//     jwt: {
//         secret: process.env.JWT_SECRET,
//         encode: async ({ secret, token, maxAge }: any) => {
//             try {
//                 return sign(token, secret);
//             } catch (error) {
//                 console.log("error JWT---", error);
//                 return null;
//             }
//         },
//         decode: async ({ secret, token, maxAge }: any) => {
//             return verify(token, secret);
//         },
//     },
//
//     debug: process.env.NODE_ENV === "development",
// };

import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import { sendEmailVerification } from "@/utils/sendEmailVerification";

const prisma = new PrismaClient();

interface CredentialsConfig {
  credentials: {
    password: { label: string; type: string };
    email: { label: string; placeholder: string; type: string };
    username: { label: string; placeholder: string; type: string };
  };
  name: string;
  authorize(credentials: {
    email: string;
    password: string;
    username: string;
  }): Promise<any>; // Adjust the return type according to your authorization logic
}

const credentialsConfig: any = {
  credentials: {
    email: {
      label: "Email",
      type: "text",
      placeholder: "dhhnews.in@mail.com",
    },
    password: { label: "Password", type: "password" },
    username: {
      label: "Username",
      type: "text",
      placeholder: "Random Kumar",
    },
  },
  name: "credentials",
  authorize: async (credentials: any) => {
    if (!credentials.email || !credentials.password) {
      throw new Error("Please enter email and password!");
    }

    const user = await prisma.user.findUnique({
      where: {
        email: credentials.email,
      },
    });
    console.log("user------>", user);
    if (!user) {
      throw new Error("User not found!");
    }
    if (!user.emailVerified) {
      throw new Error("Please verify your email!");
    }
    if (user.hashedPassword === null) {
      throw new Error("User has no password set!");
    }
    const passwordMatch = await bcrypt.compare(
      credentials.password,
      user.hashedPassword
    );

    if (!passwordMatch) {
      throw new Error("Incorrect email and password combination!");
    }

    return user;
  },
};

export const authOptions: any = {
  adapter: PrismaAdapter(prisma),
  providers: [CredentialsProvider(credentialsConfig)],
  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.user = token.user;
      console.log("session------> token ----->", session, token);
      return session;
    },
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: false,
        sameSite: "lax",
        path: "/",
        secure: false,
      },
    },
  },
  secret: process.env.JWT_SECRET,
  jwt: {
    secret: process.env.JWT_SECRET,
    encode: async ({ secret, token, maxAge }: any) => {
      try {
        return sign(token, secret);
      } catch (error) {
        console.log("error JWT---", error);
        return null;
      }
    },
    decode: async ({ secret, token, maxAge }: any) => {
      return verify(token, secret);
    },
  },

  debug: process.env.NODE_ENV === "development",
};

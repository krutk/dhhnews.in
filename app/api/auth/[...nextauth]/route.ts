import NextAuth from "next-auth/next";
import prisma from "@/lib/prismadb";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import bcrypt from "bcrypt";
import { sign, verify } from "jsonwebtoken";

export const authOptions: any = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "utkarsh@gmail.com",
        },
        password: { label: "Password", type: "password" },
        username: {
          label: "Username",
          type: "text",
          placeholder: "Random Kumar",
        },
      },
      async authorize(credentials) {
        if (!credentials.email || !credentials.password) {
          throw new Error("Please enter email and password!");
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        console.log("signIn user", user, { user });

        if (!user) {
          throw new Error("User not found!");
        }
        //check to see if password matches
        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!passwordMatch) {
          throw new Error("Incorrect email and password combination!");
        }

        return user;
      },
    }),
  ],
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

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

import NextAuth from "next-auth/next";
import prisma from "@/lib/prismadb";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import bcrypt from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import {authOptions} from "@/app/api/auth/[...nextauth]/authOptions";



const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

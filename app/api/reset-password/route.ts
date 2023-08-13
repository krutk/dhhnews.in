// pages/api/reset-password.ts
import { NextApiResponse } from "next";
import prisma from "@/lib/prismadb";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: any) {
  try {
    const body = await req.json();
    const { token, password } = body;

    if (!token || !password) {
      return new NextResponse("Token and password are required.", {
        status: 400,
      });
    }

    const user = await prisma.user.findFirst({
      where: { resetToken: token },
    });

    if (!user) {
      return new NextResponse("Invalid token.", { status: 404 });
    }

    // Update user's password and reset token
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.update({
      where: { id: user.id },
      data: { hashedPassword, resetToken: null }, // Clear the reset token
    });
    return new NextResponse("Password reset successfully.", { status: 200 });
  } catch (error) {
    console.error("Error resetting password:", error);
    return new NextResponse("An error occurred.", { status: 500 });
  }
}

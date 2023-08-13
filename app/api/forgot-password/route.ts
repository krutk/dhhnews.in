import prisma from "@/lib/prismadb";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";

export async function POST(req: any) {
  try {
    const body = await req.json();
    const { email } = body;
    //   const { email } = req.body;

    if (!email) {
      return new NextResponse("Email is required.", { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return new NextResponse("User not found.", { status: 404 });
    }

    // Generate a reset token
    const resetToken = uuidv4();

    // Update user with reset token (you should also set an expiration time)
    await prisma.user.update({
      where: { id: user.id },
      data: { resetToken },
    });

    // Send a password reset email to the user
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.GMAIL_ID,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_ID,
      to: email,
      subject: "Password Reset",
      text: `Click the following link to reset your password: http://localhost:3000/reset-password?token=${resetToken}`,
    };

    await transporter.sendMail(mailOptions);

    return new NextResponse("Password reset email sent.", { status: 200 });
  } catch (error) {
    console.error("Error sending password reset email:", error);
    return new NextResponse("An error occurred.", { status: 500 });
  }
}

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
    const resetPasswordLink =
      process.env.NODE_ENV === "development"
        ? `http://localhost:3000/reset-password?token=${resetToken}`
        : `https://dhhnews.in/reset-password?token=${resetToken}`;
    const HTMLCode = `<body>
  <div style='padding: 10px; text-align: Center; align-items: center;'>
    <div>
       <a href="" title="logo" target="_blank">
 <img width="60" style="border-radius:50%;" src="https://res.cloudinary.com/dexfnfjrx/image/upload/v1690988289/yelah70pstvuykgsd7ou.png" title="logo" alt="logo">
                        </a>
    </div>
  <div>
    <p>There was a request to change your password. If you did not make this request, please ignore this email.</p>
    <p>To reset your password, click the button below.</p>
    </div>
    <a  href="${resetPasswordLink}"
     style="background:#ff6d00;text-decoration:none !important; font-weight:600; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;cursor:pointer;">
     Reset Password
    </a>
  </div>
</body>
`;

    const mailOptions = {
      from: process.env.GMAIL_ID,
      to: email,
      subject: "Password Reset",
      text: `Reset your password`,
      html: HTMLCode,
    };

    await transporter.sendMail(mailOptions);

    return new NextResponse("Password reset email sent.", { status: 200 });
  } catch (error) {
    console.error("Error sending password reset email:", error);
    return new NextResponse("An error occurred.", { status: 500 });
  }
}

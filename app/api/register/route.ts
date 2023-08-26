import bcrypt from "bcrypt";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: any) {
  try {
    const body = await request.json();
    const { username, email, password } = body;

    if (!username || !email || !password) {
      return new NextResponse("Missing Fields", { status: 400 });
    }

    const exist = await prisma.user.findFirst({
      where: {
        OR: [
          {
            username: username,
          },
          {
            email: email,
          },
        ],
      },
    });

    if (exist) {
      return new NextResponse("Email or Username already exists!", {
        status: 500,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = uuidv4();

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.GMAIL_ID,
        pass: process.env.GMAIL_PASS,
      },
    });

    const verifyEmailLink =
      process.env.NODE_ENV === "development"
        ? `http://localhost:3000/api/verify?token=${verificationToken}`
        : `https://dhhnews.in/api/verify?token=${verificationToken}`;

    const HTMLCode = `<body>
  <div style='padding: 10px; text-align: Center; align-items: center;'>
    <div>
       <a href="" title="logo" target="_blank">
 <img width="60" style="border-radius:50%;" src="https://res.cloudinary.com/dexfnfjrx/image/upload/v1690988289/yelah70pstvuykgsd7ou.png" title="logo" alt="logo">
                        </a>
    </div>
  <div>
    <p>Thank you for signing up! To complete your registration, please verify your email address by clicking the button below.</p>
    </div>
    <a  href="${verifyEmailLink}"
     style="background:#ff6d00;text-decoration:none !important; font-weight:600; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;cursor:pointer;">
     Verify Email
    </a>
  </div>
</body>
`;

    const mailOptions = {
      from: process.env.GMAIL_ID,
      to: email,
      subject: "Verify Your Email",
      text: "Verify Your Email",
      html: HTMLCode,
      // text: `Click the following link to verify your email: http://localhost:3000/api/verify?token=${verificationToken}`,
    };

    // Sending email using async/await
    try {
      const info = await transporter.sendMail(mailOptions);

      console.log("Verification email sent:", info.response);

      const user = await prisma.user.create({
        data: {
          username,
          email,
          hashedPassword,
          verificationToken,
        },
      });

      return NextResponse.json(user);
    } catch (error) {
      console.error("Error sending verification email:", error);
      return new NextResponse("Error sending verification email", {
        status: 500,
      });
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

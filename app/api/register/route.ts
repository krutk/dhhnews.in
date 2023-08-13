// import bcrypt from "bcrypt";
// import prisma from "@/lib/prismadb";
// import {NextResponse} from "next/server";

// export async function POST(request: any) {
//     const body = await request.json();
//     const {username, email, password} = body;

//     if (!username || !email || !password) {
//         return new NextResponse("Missing Fields", {status: 400});
//     }

//     const exist = await prisma.user.findUnique({
//         where: {
//             email,
//         },
//     });

//     console.log("exists--------->", exist);

//     if (exist) {
//         throw new Error("Email already exists");
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await prisma.user.create({
//         data: {
//             username,
//             email,
//             hashedPassword,
//         },
//     });

//     return NextResponse.json(user);
// }

// import bcrypt from "bcrypt";
// import prisma from "@/lib/prismadb";
// import { NextResponse } from "next/server";
// import nodemailer from "nodemailer";
// import { v4 as uuidv4 } from "uuid"; // Import the uuid library for generating tokens

// export async function POST(request: any) {
//   const body = await request.json();
//   const { username, email, password } = body;

//   if (!username || !email || !password) {
//     return new NextResponse("Missing Fields", { status: 400 });
//   }

//   const exist = await prisma.user.findUnique({
//     where: {
//       email,
//     },
//   });

//   if (exist) {
//     throw new Error("Email already exists");
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);

//   // Generate a verification token
//   const verificationToken = uuidv4();

//   // Send a verification email to the user
//   const transporter = nodemailer.createTransport({
//     service: "Gmail",
//     auth: {
//       user: process.env.GMAIL_ID, // Your Gmail email address
//       pass: process.env.GMAIL_PASS, // Your Gmail password or an app-specific password
//     },
//   });

//   const mailOptions = {
//     from: process.env.GMAIL_ID,
//     to: email,
//     subject: "Verify Your Email",
//     text: `Click the following link to verify your email: http://localhost:3000/api/verify?token=${verificationToken}`,
//   };

//   transporter.sendMail(mailOptions, async (error, info) => {
//     if (error) {
//       console.error("Error sending verification email:", error);
//       return new NextResponse("Error sending verification email", {
//         status: 500,
//       });
//     } else {
//       console.log("Verification email sent:", info.response);

//       // Create the user in the database and store the verification token
//       const user = await prisma.user.create({
//         data: {
//           username,
//           email,
//           hashedPassword,
//           verificationToken,
//         },
//       });

//       return NextResponse.json(user);
//     }
//   });
// }

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

    const exist = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (exist) {
      throw new Error("Email already exists");
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

    const mailOptions = {
      from: process.env.GMAIL_ID,
      to: email,
      subject: "Verify Your Email",
      text: `Click the following link to verify your email: http://localhost:3000/api/verify?token=${verificationToken}`,
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

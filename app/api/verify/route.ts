// import prisma from "@/lib/prismadb";
// import { NextApiRequest, NextApiResponse } from "next";
// import { NextResponse } from "next/server";
// import { parse } from "url";

// export async function GET(req: any, res: any) {
//   const { query } = parse(req.url, true);
//   console.log("token-->", query.token);
//   const token = query.token;
//   //   const { token } = req.query;

//   if (!token || typeof token !== "string") {
//     return res.status(400).json({ error: "Invalid token" });
//   }

//   const user = await prisma.user.findFirst({
//     where: {
//       verificationToken: token,
//     },
//   });

//   if (!user) {
//     return NextResponse.json({ error: "User not found or already verified" });
//   }

//   // Update user's emailVerified status and remove verification token
//   await prisma.user.update({
//     where: {
//       id: user.id,
//     },
//     data: {
//       emailVerified: true,
//       verificationToken: null,
//     },
//   });
//   const loginUrl = new URL("/signin", req.url);
//   return NextResponse.redirect(loginUrl);

//   // return NextResponse.redirect("/signin");

//   // return NextResponse.json({ message: "Email verified successfully" });
// }

import prisma from "@/lib/prismadb";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { parse } from "url";

export async function GET(req: any, res: any) {
  const { query } = parse(req.url, true);
  console.log("token-->", query.token);
  const token = query.token;

  if (!token || typeof token !== "string") {
    return res.status(400).json({ error: "Invalid token" });
  }

  const user = await prisma.user.findFirst({
    where: {
      verificationToken: token,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found or already verified" });
  }

  // Update user's emailVerified status and remove verification token
  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      emailVerified: true,
      verificationToken: null,
    },
  });

  const verificationSuccessMessage =
    "Email verified successfully. Redirecting to sign-in page in 5 seconds...";

  // Construct the response with a success message and delayed redirection
  const htmlContent = `
    <html>
      <head>
        <meta http-equiv="refresh" content="5;url=/signin">
      </head>
      <body>
        <p>${verificationSuccessMessage}</p>
      </body>
    </html>
  `;

  const response = new NextResponse(htmlContent, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });

  return response;
}

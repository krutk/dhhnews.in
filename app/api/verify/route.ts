import prisma from "@/lib/prismadb";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { parse } from "url";

export async function GET(req: any, res: any) {
  const { query } = parse(req.url, true);
  console.log("token-->", query.token);
  const token = query.token;
  //   const { token } = req.query;

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

  return NextResponse.json({ message: "Email verified successfully" });
}

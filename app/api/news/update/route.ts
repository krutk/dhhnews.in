import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: any) {
  const body = await request.json();
  console.log("body-->", body);
  try {
    const formData = body;
    const updateNews = await prisma.newsItem.update({
      where: {
        id: formData.id,
      },
      data: {
        isApproved: !formData.isApproved,
      },
    });
    console.log("updated news item", updateNews);
    return NextResponse.json("");
  } catch (error) {
    console.error("Error processing form: ", error);
    return NextResponse.json("");
  }
  return NextResponse.json({
    msg: "Successfuly created new News Item: ",
    status: 200,
  });
}

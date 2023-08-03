// /pages/api/submit-news/route.ts
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: { json: () => any }) {
  const body = await request.json();
  console.log("body-->", body);
  try {
    const formData = body;
    const savedNewsItem = await prisma.newsItem.create({
      data: {
        title: formData.title,
        tags: formData.tags,
        imageUrl: formData.imageUrl,
        description: formData.description,
        user: { connect: { id: formData.userId } },
      },
    });
    console.log("Saved news item", savedNewsItem);
    return NextResponse.json("");
  } catch (error) {
    console.error("Error processing form: ", error);
  }
  NextResponse.json({
    msg: "Successfuly created new News Item: ",
    status: 200,
  });
}

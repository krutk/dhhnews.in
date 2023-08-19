import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: any) {
  const body = await request.json();
  try {
    const { id } = body;
    const deletedPost = await prisma.newsItem.delete({
      where: {
        id: id,
      },
    });
    console.log("deleted news item", deletedPost);
    return NextResponse.json("");
  } catch (error) {
    console.error("Error deleting Post: ", error);
  }
  NextResponse.json({
    msg: "Successfuly deleted News Item: ",
    status: 200,
  });
}

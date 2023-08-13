import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: any) {
  const body = await request.json();
  console.log("update-->profile-->body-->", body);
  try {
    const formData = body;
    const updatedUser = await prisma.user.update({
      where: {
        id: formData.userId,
      },
      data: {
        about: formData.about,
        image: formData.profilePicture,
      },
    });
    console.log("Saved news item", updatedUser);
    return NextResponse.json("");
  } catch (error) {
    console.error("Error processing form: ", error);
  }
  NextResponse.json({
    msg: "Successfuly created new News Item: ",
    status: 200,
  });
}

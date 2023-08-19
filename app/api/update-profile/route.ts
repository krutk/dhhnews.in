import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: any) {
  const body = await request.json();
  console.log("update-->profile-->body-->", body);
  try {
    const formData = body;

    // Create the data object with image update
    const dataToUpdate: any = {
      image: formData.profilePicture,
    };

    // Check if the 'about' field is not empty before adding it to the dataToUpdate object
    if (formData.about !== "") {
      dataToUpdate.about = formData.about;
    }

    const updatedUser: any = await prisma.user.update({
      where: {
        id: formData.userId,
      },
      data: dataToUpdate,
    });

    console.log("Updated user: ", updatedUser);
    return new NextResponse(updatedUser, {
      status: 200,
      headers: {
        "Content-Type": "application/json", // Set the response content type to JSON
      },
    });
  } catch (error: any) {
    console.error("Error processing form: ", error);
    return new NextResponse(error.message, {
      status: 500, // Use an appropriate error status code
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

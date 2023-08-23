import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    // Fetch all posts along with user details using Prisma client
    const allUsers = await prisma.user.findMany({
      where: {
        role: "USER",
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
    console.log("ALL Users", allUsers);

    // Format the data as needed (for example, converting to JSON)
    const responseData = JSON.stringify(allUsers);
    // Create a NextResponse with the data and appropriate headers
    return new NextResponse(responseData, {
      status: 200, // Status code indicating success (200 OK)
      headers: {
        "Content-Type": "application/json", // Set the response content type to JSON
      },
    });
  } catch (error) {
    console.error("Error while fetching users:", error);
    throw error;
  }
  // finally {
  //   await prisma.$disconnect(); // Disconnect the Prisma client after fetching data
  // }
}

export async function POST(request: any) {
  const body = await request.json();
  try {
    const formData = body;
    console.log("formData-->in", formData);
    if (formData.userRole === "ADMIN") {
      const updatedAdminUser = await prisma.user.update({
        where: {
          id: formData.id,
        },
        data: {
          role: "ADMIN", // Update the user's role to "admin"
        },
      });

      console.log("Updated admin user: ", updatedAdminUser);
      return new NextResponse("User changed to ADMIN", { status: 200 });
    }
    return new NextResponse(
      "User not changed to ADMIN as you don't have previlege!",
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user ", error);
    return new NextResponse(
      "User not changed to ADMIN as some error occured!",
      { status: 500 }
    );
  }
}

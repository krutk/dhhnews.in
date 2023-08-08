import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const username: any = searchParams.get("username");
    // Fetch all posts along with user details using Prisma client
    // const userData = await prisma.user.findUnique({
    //   where: {
    //     id: id,
    //   },
    //   include: {
    //     newsItem: true, // This will fetch the associated User data for each post
    //   },
    // });

    const userData = await prisma.user.findUnique({
      where: {
        username: username,
      },
      include: {
        NewsItem: true,
      },
    });
    // Format the data as needed (for example, converting to JSON)
    const responseData = JSON.stringify(userData);
    // Create a NextResponse with the data and appropriate headers
    return new NextResponse(responseData, {
      status: 200, // Status code indicating success (200 OK)
      headers: {
        "Content-Type": "application/json", // Set the response content type to JSON
      },
    });
    // return new NextResponse("hello", {
    //   status: 200, // Status code indicating success (200 OK)
    //   headers: {
    //     "Content-Type": "application/json", // Set the response content type to JSON
    //   },
    // });
  } catch (error) {
    console.error("Error while fetching posts:", error);
    throw error;
  }
  //   finally {
  //     await prisma.$disconnect(); // Disconnect the Prisma client after fetching data
  //   }
}

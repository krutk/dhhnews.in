// import { PrismaClient } from "@prisma/client";
// import { NextRequest } from "next/server";

// const prisma = new PrismaClient();

// export async function GET(request: NextRequest) {
//   try {
//     // Fetch all posts along with user details using Prisma client
//     const allPosts = await prisma.newsItem.findMany({
//       include: {
//         user: true, // This will fetch the associated User data for each post
//       },
//     });

//     return allPosts;
//   } catch (error) {
//     console.error("Error while fetching posts:", error);
//     throw error;
//   } finally {
//     await prisma.$disconnect(); // Disconnect the Prisma client after fetching data
//   }
// }

import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    // Fetch all posts along with user details using Prisma client
    const allPosts = await prisma.newsItem.findMany({
      // where: {
      //   isApproved: true,
      // },
      include: {
        user: true, // This will fetch the associated User data for each post
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    // Format the data as needed (for example, converting to JSON)
    const responseData = JSON.stringify(allPosts);
    // Create a NextResponse with the data and appropriate headers
    return new NextResponse(responseData, {
      status: 200, // Status code indicating success (200 OK)
      headers: {
        "Content-Type": "application/json", // Set the response content type to JSON
      },
    });
  } catch (error) {
    console.error("Error while fetching posts:", error);
    throw error;
  }
  // finally {
  //   await prisma.$disconnect(); // Disconnect the Prisma client after fetching data
  // }
}

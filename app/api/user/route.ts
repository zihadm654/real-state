import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

import { prisma } from "@/lib/db";

// Route Segment Config
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// Define response types
interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}

export async function DELETE(): Promise<NextResponse<ApiResponse>> {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 },
      );
    }

    await prisma.user.delete({
      where: {
        id: session.user.id,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "User deleted successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("[USER_DELETE]", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    );
  }
}

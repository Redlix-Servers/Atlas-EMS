import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getSession();
    if (!session || !session.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const documents = await prisma.document.findMany({
      where: {
        OR: [
          { employeeId: session.id },
          { employeeId: null }, // Global documents
        ]
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(documents);
  } catch (error) {
    console.error("Fetch employee documents error:", error);
    return NextResponse.json({ error: "Failed to fetch documents" }, { status: 500 });
  }
}

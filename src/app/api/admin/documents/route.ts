import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const documents = await prisma.document.findMany({
      include: { 
        employee: {
          select: {
            fullName: true,
            email: true
          }
        } 
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(documents);
  } catch (error) {
    console.error("Fetch documents error:", error);
    return NextResponse.json({ error: "Failed to fetch documents" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, fileUrl, employeeId } = body;
    
    if (!title || !fileUrl) {
      return NextResponse.json({ error: "Title and File URL are required" }, { status: 400 });
    }

    const document = await prisma.document.create({
      data: {
        title,
        description,
        fileUrl,
        employeeId: employeeId || null,
      },
    });
    
    return NextResponse.json(document);
  } catch (error) {
    console.error("Create document error:", error);
    return NextResponse.json({ error: "Failed to create document" }, { status: 500 });
  }
}

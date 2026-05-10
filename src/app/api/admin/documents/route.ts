import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const company = searchParams.get('company');
    
    const where = company ? { 
        employee: { 
            company: {
                equals: company,
                mode: 'insensitive' as any
            }
        } 
    } : {};

    if (!(prisma as any).document) {
      return NextResponse.json([]);
    }
    const documents = await (prisma as any).document.findMany({
      where,
      include: { 
        employee: {
          select: {
            fullName: true,
            email: true,
            company: true
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

    if (!(prisma as any).document) {
      throw new Error("Document model not found in Prisma client");
    }
    const document = await (prisma as any).document.create({
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

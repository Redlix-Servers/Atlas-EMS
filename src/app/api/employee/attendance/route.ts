import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getSession();
    if (!session || !session.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!(prisma as any).attendance) {
      return NextResponse.json([]);
    }
    const attendances = await (prisma as any).attendance.findMany({
      where: { employeeId: session.id },
      orderBy: { date: "desc" },
    });
    return NextResponse.json(attendances);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch attendance" }, { status: 500 });
  }
}

export async function POST() {
  try {
    const session = await getSession();
    if (!session || !session.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get today's date at 00:00:00
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!(prisma as any).attendance) {
      throw new Error("Attendance model not found");
    }
    // Check if attendance already exists for today
    const existing = await (prisma as any).attendance.findFirst({
      where: {
        employeeId: session.id,
        date: {
            gte: today,
            lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
        }
      }
    });

    if (existing) {
      return NextResponse.json({ error: "Attendance already marked for today" }, { status: 400 });
    }

    const attendance = await (prisma as any).attendance.create({
      data: {
        employeeId: session.id,
        date: today,
        status: "Present"
      },
    });

    return NextResponse.json(attendance);
  } catch (error) {
    console.error("Mark attendance error:", error);
    return NextResponse.json({ error: "Failed to mark attendance" }, { status: 500 });
  }
}

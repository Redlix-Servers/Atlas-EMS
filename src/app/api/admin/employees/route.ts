import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // In a real app, you would check the admin session here
        const employees = await prisma.employee.findMany({
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json(employees);
    } catch (err) {
        return NextResponse.json({ error: 'Failed to fetch employees' }, { status: 500 });
    }
}

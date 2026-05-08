import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const employees = await prisma.employee.findMany({
            select: {
                id: true,
                fullName: true,
                email: true
            },
            orderBy: {
                fullName: 'asc'
            }
        });
        return NextResponse.json(employees);
    } catch (error) {
        console.error('Fetch employees list error:', error);
        return NextResponse.json({ error: 'Failed to fetch employees' }, { status: 500 });
    }
}

import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const company = searchParams.get('company');
        
        const where = company ? { 
            company: {
                equals: company,
                mode: 'insensitive' as any
            }
        } : {};

        const employees = await (prisma as any).employee.findMany({
            where,
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json(employees);
    } catch (err) {
        return NextResponse.json({ error: 'Failed to fetch employees' }, { status: 500 });
    }
}

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const updates = await (prisma as any).dailyUpdate.findMany({
            include: {
                employee: {
                    select: {
                        fullName: true,
                        email: true,
                        company: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json(updates);
    } catch (err) {
        return NextResponse.json({ error: 'Failed to fetch updates' }, { status: 500 });
    }
}

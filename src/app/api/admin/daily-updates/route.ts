import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

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

        const updates = await (prisma as any).dailyUpdate.findMany({
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
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json(updates);
    } catch (err) {
        return NextResponse.json({ error: 'Failed to fetch updates' }, { status: 500 });
    }
}

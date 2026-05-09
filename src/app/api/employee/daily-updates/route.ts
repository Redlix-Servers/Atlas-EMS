import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function POST(req: Request) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { contentDone, contentExplored, contentLearned } = await req.json();

        const update = await (prisma as any).dailyUpdate.create({
            data: {
                contentDone,
                contentExplored,
                contentLearned,
                employeeId: session.id
            }
        });

        return NextResponse.json(update);
    } catch (err) {
        return NextResponse.json({ error: 'Failed to create update' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const updates = await (prisma as any).dailyUpdate.findMany({
            include: {
                employee: {
                    select: {
                        fullName: true,
                        role: true,
                        profilePhoto: true,
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

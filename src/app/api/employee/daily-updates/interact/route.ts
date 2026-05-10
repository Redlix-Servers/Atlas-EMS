import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function POST(req: Request) {
    try {
        const session = await getSession();
        if (!session || !session.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { updateId, type, content } = await req.json();

        if (type === 'like') {
            const existingLike = await (prisma as any).like.findUnique({
                where: {
                    employeeId_dailyUpdateId: {
                        employeeId: session.id,
                        dailyUpdateId: updateId
                    }
                }
            });

            if (existingLike) {
                await (prisma as any).like.delete({ where: { id: existingLike.id } });
                return NextResponse.json({ action: 'unliked' });
            } else {
                await (prisma as any).like.create({
                    data: {
                        employeeId: session.id,
                        dailyUpdateId: updateId
                    }
                });
                return NextResponse.json({ action: 'liked' });
            }
        }

        if (type === 'comment') {
            const comment = await (prisma as any).comment.create({
                data: {
                    content,
                    employeeId: session.id,
                    dailyUpdateId: updateId
                }
            });
            return NextResponse.json(comment);
        }

        return NextResponse.json({ error: 'Invalid interaction type' }, { status: 400 });
    } catch (err) {
        return NextResponse.json({ error: 'Interaction failed' }, { status: 500 });
    }
}

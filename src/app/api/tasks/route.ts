import { prisma, refreshPrisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const company = searchParams.get('company');

        if (!(prisma as any).task) {
            return NextResponse.json([]);
        }

        let where: any = {};
        if (company) {
            where = {
                OR: [
                    { employeeId: null },
                    { employee: { company } }
                ]
            };
        } else {
            const session = await getSession();
            if (session && session.role !== 'ADMIN') {
                where = {
                    OR: [
                        { employeeId: null },
                        { employeeId: session.id }
                    ]
                };
            }
        }

        const tasks = await (prisma as any).task.findMany({
            where,
            include: {
                employee: {
                    select: {
                        fullName: true,
                        company: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json(tasks);
    } catch (err) {
        return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        // In a real app, verify admin session
        const data = await request.json();
        const { title, description, dueDate, priority, employeeId } = data;

        let taskModel = (prisma as any).task;
        if (!taskModel) {
            const freshPrisma = refreshPrisma();
            taskModel = (freshPrisma as any).task;
        }

        if (!taskModel) {
            throw new Error('Prisma model "task" is still not recognized. Please restart the dev server if this persists.');
        }

        const task = await taskModel.create({
            data: {
                title,
                description,
                dueDate: dueDate ? new Date(dueDate) : null,
                priority: priority || 'Medium',
                employeeId: employeeId || null // null means global
            }
        });

        return NextResponse.json(task);
    } catch (err) {
        return NextResponse.json({ error: 'Failed to create task' }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    try {
        const data = await request.json();
        const { id, status } = data;

        if (!(prisma as any).task) {
            throw new Error('Task model not found');
        }
        const task = await (prisma as any).task.update({
            where: { id },
            data: { status }
        });

        return NextResponse.json(task);
    } catch (err) {
        return NextResponse.json({ error: 'Failed to update task' }, { status: 500 });
    }
}

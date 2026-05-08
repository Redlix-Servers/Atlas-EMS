import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        if (!(prisma as any).payroll) {
            return NextResponse.json([]);
        }

        const payrolls = await (prisma as any).payroll.findMany({
            include: {
                employee: {
                    select: {
                        fullName: true,
                        email: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        return NextResponse.json(payrolls);
    } catch (error) {
        console.error('Fetch payrolls error:', error);
        return NextResponse.json({ error: 'Failed to fetch payrolls' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { employeeId, amount, month, type, status } = body;

        if (!employeeId || !amount || !month) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        if (!(prisma as any).payroll) {
            throw new Error('Payroll model not initialized in Prisma client');
        }

        const payroll = await (prisma as any).payroll.create({
            data: {
                employeeId,
                amount: parseFloat(amount),
                month,
                type: type || 'Salary',
                status: status || 'Pending',
                paymentDate: status === 'Paid' ? new Date() : null
            }
        });

        return NextResponse.json(payroll);
    } catch (error) {
        console.error('Create payroll error:', error);
        return NextResponse.json({ error: 'Failed to create payroll' }, { status: 500 });
    }
}

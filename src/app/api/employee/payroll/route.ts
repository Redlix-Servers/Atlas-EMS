import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET() {
    try {
        const session = await getSession();
        if (!session || !session.user || session.user.role !== 'employee') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        if (!(prisma as any).employee) {
            return NextResponse.json({ error: 'Employee service unavailable' }, { status: 503 });
        }

        const employee = await (prisma as any).employee.findUnique({
            where: { email: session.user.email }
        });

        if (!employee) {
            return NextResponse.json({ error: 'Employee not found' }, { status: 404 });
        }

        if (!(prisma as any).payroll) {
            return NextResponse.json([]);
        }

        const payrolls = await (prisma as any).payroll.findMany({
            where: { employeeId: employee.id },
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json(payrolls);
    } catch (error) {
        console.error('Fetch employee payroll error:', error);
        return NextResponse.json({ error: 'Failed to fetch payroll' }, { status: 500 });
    }
}

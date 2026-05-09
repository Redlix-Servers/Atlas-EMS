import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET() {
    try {
        const session = await getSession();
        if (!session || (session.role !== 'ADMIN' && session.email !== process.env.ADMIN_EMAIL)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // 1. Total Updates
        const totalUpdates = await (prisma as any).dailyUpdate.count() || 0;

        // 2. Total Employees
        const activeEmployees = await (prisma as any).employee.count() || 0;

        // 3. Daily Activity (Last 7 Days)
        const dailyActivity = Array(7).fill(0);
        const dates = Array(7).fill(0).map((_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - (6 - i));
            d.setHours(0, 0, 0, 0);
            return d;
        });

        for (let i = 0; i < 7; i++) {
            const start = dates[i];
            const end = new Date(start);
            end.setDate(end.getDate() + 1);

            dailyActivity[i] = await (prisma as any).dailyUpdate.count({
                where: {
                    createdAt: {
                        gte: start,
                        lt: end
                    }
                }
            });
        }

        // 4. Engagement Rate
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const updatesToday = await (prisma as any).dailyUpdate.count({
            where: { createdAt: { gte: today } }
        });

        const engagementRate = activeEmployees > 0 
            ? Math.round((updatesToday / activeEmployees) * 100) 
            : 0;

        return NextResponse.json({
            totalUpdates,
            activeEmployees,
            engagementRate,
            dailyActivity
        });
    } catch (err) {
        console.error('Analytics Error:', err);
        return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
    }
}

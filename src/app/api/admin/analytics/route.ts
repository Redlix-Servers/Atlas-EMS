import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET() {
    try {
        const session = await getSession();
        if (!session || session.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // 1. Total Updates
        const totalUpdates = await (prisma as any).dailyUpdate.count();

        // 2. Total Employees
        const activeEmployees = await (prisma as any).employee.count();

        // 3. Daily Activity (Last 7 Days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const updates = await (prisma as any).dailyUpdate.findMany({
            where: {
                createdAt: { gte: sevenDaysAgo }
            },
            select: { createdAt: true }
        });

        // Grouping updates by day
        const dailyActivity = Array(7).fill(0);
        updates.forEach((u: any) => {
            const dayIndex = 6 - Math.floor((new Date().getTime() - new Date(u.createdAt).getTime()) / (1000 * 60 * 60 * 24));
            if (dayIndex >= 0 && dayIndex < 7) {
                dailyActivity[dayIndex]++;
            }
        });

        // 4. Engagement Rate (Updates today / Total Employees)
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
        return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
    }
}

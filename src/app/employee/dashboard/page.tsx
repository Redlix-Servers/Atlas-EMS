import { getSession, logout } from '@/lib/auth';
import { redirect } from 'next/navigation';
import DashboardShell from '@/components/DashboardShell';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function EmployeeDashboard() {
    const session = await getSession();

    if (!session) {
        redirect('/employee/login');
    }

    const employee = (prisma as any).employee ? await (prisma as any).employee.findUnique({
        where: { id: session.id }
    }) : null;

    const eventCount = (prisma as any).event ? await (prisma as any).event.count() : 0;
    
    // Fetch pending tasks (Global + Individual)
    const taskCount = (prisma as any).task ? await (prisma as any).task.count({
        where: {
            status: { not: 'Completed' },
            OR: [
                { employeeId: null },
                { employeeId: session.id }
            ]
        }
    }) : 0;

    const handleLogout = async () => {
        'use server';
        await logout();
        redirect('/employee/login');
    };

    // Determine greeting
    const hour = new Date().getHours();
    let greeting = 'Good Morning';
    if (hour >= 12 && hour < 17) greeting = 'Good Afternoon';
    if (hour >= 17) greeting = 'Good Evening';

    // Fetch document count
    const documentCount = (prisma as any).document ? await (prisma as any).document.count({
        where: {
            OR: [
                { employeeId: null },
                { employeeId: session.id }
            ]
        }
    }) : 0;

    // Fetch attendance count for the current month
    const currentMonthStart = new Date();
    currentMonthStart.setDate(1);
    currentMonthStart.setHours(0, 0, 0, 0);

    const attendanceCount = (prisma as any).attendance ? await (prisma as any).attendance.count({
        where: {
            employeeId: session.id,
            date: { gte: currentMonthStart }
        }
    }) : 0;

    // Fetch total paid amount
    const paidPayrolls = (prisma as any).payroll ? await (prisma as any).payroll.findMany({
        where: {
            employeeId: session.id,
            status: 'Paid'
        },
        select: { amount: true }
    }) : [];
    const totalPaid = (paidPayrolls as any[]).reduce((sum, p) => sum + p.amount, 0);

    // Calculate Percentage
    const daysPassed = new Date().getDate();
    const attendancePercentage = daysPassed > 0 ? Math.round((attendanceCount / daysPassed) * 100) : 0;

    const stats = [
        { label: 'Upcoming Events', value: eventCount.toString(), icon: 'event', color: '#7c3aed' },
        { label: 'Pending Tasks', value: taskCount.toString(), icon: 'checklist', color: '#f87171' },
        { label: 'Earnings', value: `₹${totalPaid}`, icon: 'payments', color: '#7c3aed' },
        { label: 'Attendance', value: `${attendancePercentage}%`, icon: 'pan_tool', color: '#4ade80' },
        { label: 'Documents', value: documentCount.toString(), icon: 'description', color: '#fbbf24' },
    ];

    return (
        <DashboardShell 
            userEmail={session.email} 
            company={session.company}
            onLogout={handleLogout}
        >
            <div style={{ animation: 'fadeIn 0.5s ease-out', maxWidth: '1200px' }}>
                <div style={{ marginBottom: '32px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '4px', letterSpacing: '-0.5px' }}>
                        {greeting}, {employee?.fullName?.split(' ')[0] || 'Employee'}
                    </h2>
                    <p style={{ color: '#555', fontSize: '13px' }}>Here's what's happening at {session.company} today.</p>
                </div>

                {/* Compact Stats Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', marginBottom: '32px' }}>
                    {stats.map(stat => (
                        <div key={stat.label} style={{ background: '#111', border: '1px solid #222', padding: '16px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                <span className="material-symbols-outlined" style={{ color: stat.color, fontSize: '18px' }}>{stat.icon}</span>
                                <span style={{ color: '#222', fontSize: '9px', fontWeight: 700, letterSpacing: '0.5px' }}>SYNCED</span>
                            </div>
                            <div style={{ fontSize: '22px', fontWeight: 600, marginBottom: '2px', color: '#fff' }}>{stat.value}</div>
                            <div style={{ color: '#555', fontSize: '12px' }}>{stat.label}</div>
                        </div>
                    ))}
                </div>
                
                {!employee?.isProfileComplete && (
                    <div style={{ 
                        background: 'rgba(248, 113, 113, 0.05)', 
                        border: '1px solid rgba(248, 113, 113, 0.2)', 
                        padding: '20px 24px', 
                        marginBottom: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '24px'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div style={{ 
                                width: '40px', 
                                height: '40px', 
                                background: 'rgba(248, 113, 113, 0.1)', 
                                borderRadius: '50%', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center' 
                            }}>
                                <span className="material-symbols-outlined" style={{ color: '#f87171', fontSize: '20px' }}>warning</span>
                            </div>
                            <div>
                                <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#f87171', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                    Urgent: Profile Incomplete
                                </h3>
                                <p style={{ color: '#888', fontSize: '13px', margin: 0 }}>
                                    Please complete your profile at earliest to ensure seamless access to all organizational features.
                                </p>
                            </div>
                        </div>
                        <Link 
                            href="/employee/dashboard/profile" 
                            style={{ 
                                background: '#f87171', 
                                color: '#fff', 
                                padding: '10px 24px', 
                                textDecoration: 'none',
                                fontSize: '12px',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px'
                            }}
                        >
                            Complete Now
                        </Link>
                    </div>
                )}

                <div style={{ display: 'block' }}>
                    {/* Recent Activity / Announcements Placeholder */}
                    <div style={{ background: '#111', border: '1px solid #222', padding: '24px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h3 style={{ fontSize: '14px', fontWeight: 600 }}>Recent Announcements</h3>
                            <Link href="/employee/dashboard/events" style={{ fontSize: '11px', color: '#7c3aed', textDecoration: 'none' }}>View All</Link>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div style={{ padding: '12px', border: '1px solid #1a1a1a', borderRadius: '2px' }}>
                                <div style={{ fontSize: '13px', fontWeight: 500, marginBottom: '4px' }}>New Events Published</div>
                                <div style={{ fontSize: '11px', color: '#444' }}>Check the events tab for the latest organization activities.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardShell>
    );
}

'use client';

import React, { useState, useEffect } from 'react';
import DashboardShell from '@/components/DashboardShell';
import { useRouter } from 'next/navigation';

interface AttendanceRecord {
    id: string;
    date: string;
    status: string;
    createdAt: string;
}

export default function AttendancePage() {
    const [records, setRecords] = useState<AttendanceRecord[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [userProfile, setUserProfile] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [profileRes, attendanceRes] = await Promise.all([
                    fetch('/api/employee/profile'),
                    fetch('/api/employee/attendance')
                ]);

                if (profileRes.ok) setUserProfile(await profileRes.json());
                if (attendanceRes.ok) setRecords(await attendanceRes.json());
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleLogout = async () => {
        await fetch('/api/employee/logout', { method: 'POST' });
        router.push('/employee/login');
    };

    const handleMarkAttendance = async () => {
        try {
            const res = await fetch('/api/employee/attendance', { method: 'POST' });
            if (res.ok) {
                const newRecord = await res.json();
                setRecords([newRecord, ...records]);
                alert('Attendance marked successfully!');
            } else {
                const data = await res.json();
                alert(data.error || 'Failed to mark attendance');
            }
        } catch (error) {
            alert('Error marking attendance');
        }
    };

    return (
        <DashboardShell 
            userEmail={userProfile?.email || ''} 
            company={userProfile?.company || ''}
            onLogout={handleLogout}
        >
            <div style={{ animation: 'fadeIn 0.5s ease-out', maxWidth: '800px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                    <div>
                        <h2 style={{ fontSize: '22px', fontWeight: 600, marginBottom: '4px' }}>Attendance Log</h2>
                        <p style={{ color: '#555', fontSize: '13px' }}>Keep track of your daily presence.</p>
                    </div>
                    <button 
                        onClick={handleMarkAttendance}
                        style={{
                            background: '#7c3aed',
                            color: 'white',
                            border: 'none',
                            padding: '12px 24px',
                            borderRadius: '4px',
                            fontSize: '14px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            boxShadow: '0 4px 12px rgba(124, 58, 237, 0.2)'
                        }}
                    >
                        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>front_hand</span>
                        Mark Today's Attendance
                    </button>
                </div>

                <div style={{ background: '#111', border: '1px solid #222', borderRadius: '4px', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ textAlign: 'left', borderBottom: '1px solid #222', background: 'rgba(255,255,255,0.02)' }}>
                                <th style={{ padding: '16px 20px', fontSize: '11px', color: '#444', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>Date</th>
                                <th style={{ padding: '16px 20px', fontSize: '11px', color: '#444', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>Status</th>
                                <th style={{ padding: '16px 20px', fontSize: '11px', color: '#444', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>Time Marked</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td colSpan={3} style={{ padding: '32px', textAlign: 'center', color: '#555', fontSize: '13px' }}>Loading records...</td>
                                </tr>
                            ) : records.length === 0 ? (
                                <tr>
                                    <td colSpan={3} style={{ padding: '32px', textAlign: 'center', color: '#555', fontSize: '13px' }}>No attendance records found.</td>
                                </tr>
                            ) : (
                                records.map((record) => (
                                    <tr key={record.id} style={{ borderBottom: '1px solid #1a1a1a' }}>
                                        <td style={{ padding: '16px 20px', fontSize: '14px', color: '#eee' }}>
                                            {new Date(record.date).toLocaleDateString('en-IN', { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric', timeZone: 'Asia/Kolkata' })}
                                        </td>
                                        <td style={{ padding: '16px 20px' }}>
                                            <span style={{ 
                                                fontSize: '11px', 
                                                padding: '4px 10px', 
                                                background: 'rgba(74, 222, 128, 0.05)', 
                                                color: '#4ade80', 
                                                border: '1px solid rgba(74, 222, 128, 0.1)',
                                                borderRadius: '20px',
                                                fontWeight: 600
                                            }}>
                                                {record.status}
                                            </span>
                                        </td>
                                        <td style={{ padding: '16px 20px', fontSize: '13px', color: '#888' }}>
                                            <div style={{ fontWeight: 600, color: '#eee' }}>
                                                {new Date(record.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true, timeZone: 'Asia/Kolkata' })}
                                            </div>
                                            <div style={{ fontSize: '10px', color: '#444' }}>Indian Standard Time (IST)</div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </DashboardShell>
    );
}

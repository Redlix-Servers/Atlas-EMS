'use client';

import React, { useState, useEffect } from 'react';
import StudentForgeShell from '@/components/StudentForgeShell';

interface Employee {
    id: string;
    email: string;
    fullName: string | null;
    role: string | null;
    company: string;
    isProfileComplete: boolean;
    createdAt: string;
}

export default function StudentForgeDashboard() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [docCount, setDocCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const companyName = "StudentForge";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [empRes, docRes] = await Promise.all([
                    fetch(`/api/admin/employees?company=${encodeURIComponent(companyName)}`),
                    fetch(`/api/admin/documents?company=${encodeURIComponent(companyName)}`)
                ]);
                if (empRes.ok) setEmployees(await empRes.json());
                if (docRes.ok) {
                    const docs = await docRes.json();
                    setDocCount(docs.length);
                }
            } catch (err) {
                console.error('Error fetching dashboard data');
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const stats = [
        { label: 'Total Forge Members', value: employees.length.toString(), icon: 'groups', color: '#fbbf24' },
        { label: 'Forge Documents', value: docCount.toString(), icon: 'description', color: '#34d399' },
        { label: 'New Onboards', value: employees.filter(e => {
            const date = new Date(e.createdAt);
            const now = new Date();
            return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
        }).length.toString(), icon: 'person_add', color: '#60a5fa' },
    ];

    return (
        <StudentForgeShell>
            <div style={{ animation: 'fadeIn 0.5s ease-out', maxWidth: '1200px' }}>
                <div style={{ marginBottom: '32px' }}>
                    <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#fff', marginBottom: '8px', letterSpacing: '-0.5px' }}>Forge Overview</h2>
                    <p style={{ color: '#666', fontSize: '14px' }}>Managing and monitoring all StudentForge operations and participants.</p>
                </div>

                {/* Stat Cards */}
                <div className="stat-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '40px' }}>
                    {stats.map(stat => (
                        <div key={stat.label} className="stat-card" style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: '12px', padding: '24px', transition: 'transform 0.2s, border-color 0.2s', cursor: 'default' }}>
                            <div className="stat-card-header" style={{ marginBottom: '20px' }}>
                                <div style={{ background: `${stat.color}15`, padding: '10px', borderRadius: '10px', display: 'flex' }}>
                                    <span className="material-symbols-outlined" style={{ color: stat.color, fontSize: '24px' }}>{stat.icon}</span>
                                </div>
                                <span style={{ color: '#333', fontSize: '10px', fontWeight: 800, letterSpacing: '1px' }}>FORGE_SYNC</span>
                            </div>
                            <div className="stat-value" style={{ fontSize: '32px', fontWeight: 700, marginBottom: '4px' }}>{stat.value}</div>
                            <div className="stat-label" style={{ color: '#666', fontSize: '13px', fontWeight: 500 }}>{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Table Layout */}
                <div style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: '12px', overflow: 'hidden' }}>
                    <div style={{ padding: '20px 24px', borderBottom: '1px solid #1a1a1a', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#fff' }}>Forge Participants</h3>
                        <div style={{ fontSize: '12px', color: '#fbbf24', background: 'rgba(251, 191, 36, 0.1)', padding: '4px 12px', borderRadius: '20px', fontWeight: 600 }}>Active Database</div>
                    </div>
                    <div className="table-responsive">
                        {isLoading ? (
                            <div className="table-status" style={{ padding: '60px', color: '#666' }}>
                                <div className="skeleton" style={{ height: '20px', width: '200px', margin: '0 auto 20px' }}></div>
                                Fetching StudentForge records...
                            </div>
                        ) : employees.length === 0 ? (
                            <div className="table-status" style={{ padding: '60px', color: '#666' }}>No StudentForge participants found.</div>
                        ) : (
                            <table className="admin-table">
                                 <thead>
                                    <tr>
                                        <th style={{ color: '#666', background: 'transparent' }}>Participant</th>
                                        <th style={{ color: '#666', background: 'transparent' }}>Forge Role</th>
                                        <th style={{ color: '#666', background: 'transparent' }}>Onboarding</th>
                                        <th style={{ color: '#666', background: 'transparent' }}>Joined Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {employees.map((emp) => (
                                        <tr key={emp.id} style={{ borderBottom: '1px solid #111' }}>
                                            <td style={{ padding: '16px 24px' }}>
                                                <div className="emp-name" style={{ color: '#fff', fontSize: '14px' }}>{emp.fullName || 'New Participant'}</div>
                                                <div className="emp-email" style={{ color: '#555' }}>{emp.email}</div>
                                            </td>
                                            <td style={{ padding: '16px 24px' }}>
                                                <div className="emp-role" style={{ color: '#fbbf24', fontWeight: 500 }}>{emp.role || 'Member'}</div>
                                            </td>
                                            <td style={{ padding: '16px 24px' }}>
                                                <span className={`status-tag ${emp.isProfileComplete ? 'complete' : 'pending'}`} style={{ borderRadius: '4px', fontSize: '9px' }}>
                                                    {emp.isProfileComplete ? 'Verified' : 'Incomplete'}
                                                </span>
                                            </td>
                                            <td className="emp-date" style={{ padding: '16px 24px', color: '#444' }}>
                                                {new Date(emp.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
            <style jsx>{`
                .stat-card:hover {
                    transform: translateY(-4px);
                    border-color: #fbbf24 !important;
                }
                .admin-table tr:hover {
                    background: rgba(255, 255, 255, 0.02);
                }
            `}</style>
        </StudentForgeShell>
    );
}

'use client';

import React, { useState, useEffect } from 'react';
import AdminShell from '@/components/AdminShell';

interface Employee {
    id: string;
    email: string;
    fullName: string | null;
    role: string | null;
    company: string;
    isProfileComplete: boolean;
    createdAt: string;
}

export default function AdminDashboard() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [docCount, setDocCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [empRes, docRes] = await Promise.all([
                    fetch('/api/admin/employees'),
                    fetch('/api/admin/documents')
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
        { label: 'Total Employees', value: employees.length.toString(), icon: 'groups', color: '#7c3aed' },
        { label: 'Documents Issued', value: docCount.toString(), icon: 'description', color: '#fbbf24' },
        { label: 'New Registrations', value: employees.filter(e => {
            const date = new Date(e.createdAt);
            const now = new Date();
            return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
        }).length.toString(), icon: 'person_add', color: '#38bdf8' },
    ];

    return (
        <AdminShell>
            <div style={{ animation: 'fadeIn 0.5s ease-out', maxWidth: '1000px' }}>
                <h2 style={{ fontSize: '22px', fontWeight: 600, marginBottom: '4px' }}>Admin Overview</h2>
                <p style={{ color: '#555', fontSize: '13px', marginBottom: '32px' }}>Real-time synchronization with organization database.</p>

                {/* Reduced Stat Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '32px' }}>
                    {stats.map(stat => (
                        <div key={stat.label} style={{ background: '#111', border: '1px solid #222', padding: '16px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                <span className="material-symbols-outlined" style={{ color: stat.color, fontSize: '20px' }}>{stat.icon}</span>
                                <span style={{ color: '#333', fontSize: '9px', fontWeight: 700, letterSpacing: '0.5px' }}>LIVE</span>
                            </div>
                            <div style={{ fontSize: '24px', fontWeight: 600, marginBottom: '2px' }}>{stat.value}</div>
                            <div style={{ color: '#555', fontSize: '12px', fontWeight: 500 }}>{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Reduced Table Layout */}
                <div style={{ background: '#111', border: '1px solid #222' }}>
                    <div style={{ padding: '16px 20px', borderBottom: '1px solid #222' }}>
                        <h3 style={{ fontSize: '14px', fontWeight: 600 }}>Registered Employees</h3>
                    </div>
                    <div style={{ padding: '0' }}>
                        {isLoading ? (
                            <div style={{ padding: '32px', textAlign: 'center', color: '#555', fontSize: '13px' }}>Fetching organization data...</div>
                        ) : employees.length === 0 ? (
                            <div style={{ padding: '32px', textAlign: 'center', color: '#555', fontSize: '13px' }}>No employees registered yet.</div>
                        ) : (
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ textAlign: 'left', borderBottom: '1px solid #222', background: 'rgba(255,255,255,0.01)' }}>
                                        <th style={{ padding: '12px 20px', fontSize: '11px', color: '#444', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Employee</th>
                                        <th style={{ padding: '12px 20px', fontSize: '11px', color: '#444', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Role / Company</th>
                                        <th style={{ padding: '12px 20px', fontSize: '11px', color: '#444', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Status</th>
                                        <th style={{ padding: '12px 20px', fontSize: '11px', color: '#444', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Joined</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {employees.map((emp) => (
                                        <tr key={emp.id} style={{ borderBottom: '1px solid #1a1a1a' }}>
                                            <td style={{ padding: '12px 20px' }}>
                                                <div style={{ fontSize: '13px', fontWeight: 500, color: '#eee' }}>{emp.fullName || 'New Employee'}</div>
                                                <div style={{ fontSize: '11px', color: '#444' }}>{emp.email}</div>
                                            </td>
                                            <td style={{ padding: '12px 20px' }}>
                                                <div style={{ fontSize: '13px', color: '#888' }}>{emp.role || 'Not Assigned'}</div>
                                                <div style={{ fontSize: '10px', color: '#333' }}>{emp.company}</div>
                                            </td>
                                            <td style={{ padding: '12px 20px' }}>
                                                <span style={{ 
                                                    fontSize: '10px', 
                                                    padding: '2px 8px', 
                                                    background: emp.isProfileComplete ? 'rgba(74, 222, 128, 0.05)' : 'rgba(239, 68, 68, 0.05)',
                                                    color: emp.isProfileComplete ? '#4ade80' : '#f87171',
                                                    border: `1px solid ${emp.isProfileComplete ? 'rgba(74, 222, 128, 0.1)' : 'rgba(239, 68, 68, 0.1)'}`,
                                                    borderRadius: '2px'
                                                }}>
                                                    {emp.isProfileComplete ? 'Complete' : 'Incomplete'}
                                                </span>
                                            </td>
                                            <td style={{ padding: '12px 20px', fontSize: '12px', color: '#444' }}>
                                                {new Date(emp.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </AdminShell>
    );
}

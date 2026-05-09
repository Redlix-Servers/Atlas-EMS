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
                <div className="stat-grid admin-stats">
                    {stats.map(stat => (
                        <div key={stat.label} className="stat-card">
                            <div className="stat-card-header">
                                <span className="material-symbols-outlined" style={{ color: stat.color, fontSize: '20px' }}>{stat.icon}</span>
                                <span className="stat-sync-label">LIVE</span>
                            </div>
                            <div className="stat-value">{stat.value}</div>
                            <div className="stat-label">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Reduced Table Layout */}
                <div style={{ background: '#111', border: '1px solid #222' }}>
                    <div style={{ padding: '16px 20px', borderBottom: '1px solid #222' }}>
                        <h3 style={{ fontSize: '14px', fontWeight: 600 }}>Registered Employees</h3>
                    </div>
                    <div className="table-responsive">
                        {isLoading ? (
                            <div className="table-status">Fetching organization data...</div>
                        ) : employees.length === 0 ? (
                            <div className="table-status">No employees registered yet.</div>
                        ) : (
                            <table className="admin-table">
                                 <thead>
                                    <tr>
                                        <th>Employee</th>
                                        <th>Role / Company</th>
                                        <th>Status</th>
                                        <th>Joined</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {employees.map((emp) => (
                                        <tr key={emp.id}>
                                            <td>
                                                <div className="emp-name">{emp.fullName || 'New Employee'}</div>
                                                <div className="emp-email">{emp.email}</div>
                                            </td>
                                            <td>
                                                <div className="emp-role">{emp.role || 'Not Assigned'}</div>
                                                <div className="emp-company">{emp.company}</div>
                                            </td>
                                            <td>
                                                <span className={`status-tag ${emp.isProfileComplete ? 'complete' : 'pending'}`}>
                                                    {emp.isProfileComplete ? 'Verified' : 'Pending'}
                                                </span>
                                            </td>
                                            <td className="emp-date">
                                                {new Date(emp.createdAt).toLocaleDateString()}
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

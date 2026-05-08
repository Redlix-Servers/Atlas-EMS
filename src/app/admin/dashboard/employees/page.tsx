'use client';

import React, { useState, useEffect } from 'react';
import AdminShell from '@/components/AdminShell';
import Link from 'next/link';

interface Employee {
    id: string;
    email: string;
    fullName: string | null;
    role: string | null;
    company: string;
    isProfileComplete: boolean;
    createdAt: string;
    profilePhoto: string | null;
}

export default function AdminEmployeesPage() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const res = await fetch('/api/admin/employees');
                if (res.ok) {
                    const data = await res.json();
                    setEmployees(data);
                }
            } catch (err) {
                console.error('Error fetching employees');
            } finally {
                setIsLoading(false);
            }
        };
        fetchEmployees();
    }, []);

    return (
        <AdminShell>
            <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
                <div style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '28px', fontWeight: 600, marginBottom: '8px' }}>Organization Directory</h2>
                    <p style={{ color: '#555', fontSize: '14px' }}>Click on any employee to view their full professional profile.</p>
                </div>

                {isLoading ? (
                    <div style={{ padding: '60px', textAlign: 'center', color: '#444' }}>Loading organization data...</div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                        {employees.map(emp => (
                            <Link 
                                key={emp.id} 
                                href={`/admin/dashboard/employees/${emp.id}`}
                                style={{ 
                                    textDecoration: 'none',
                                    background: '#111', 
                                    border: '1px solid #222', 
                                    padding: '32px', 
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '24px',
                                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                    position: 'relative'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = '#7c3aed';
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = '#222';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}
                            >
                                <div style={{ 
                                    width: '64px', 
                                    height: '64px', 
                                    borderRadius: '50%', 
                                    background: '#ffe4cc', 
                                    overflow: 'hidden',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    {emp.profilePhoto ? (
                                        <img src={emp.profilePhoto} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    ) : (
                                        <span style={{ fontSize: '24px', fontWeight: 600, color: '#d97706' }}>
                                            {(emp.fullName || emp.email)[0].toUpperCase()}
                                        </span>
                                    )}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                                        <div style={{ fontSize: '18px', fontWeight: 600, color: '#fff' }}>{emp.fullName || 'New Employee'}</div>
                                        <span style={{ 
                                            fontSize: '10px', 
                                            padding: '2px 10px', 
                                            borderRadius: '20px',
                                            background: emp.isProfileComplete ? 'rgba(74, 222, 128, 0.05)' : 'rgba(239, 68, 68, 0.05)',
                                            color: emp.isProfileComplete ? '#4ade80' : '#f87171',
                                            border: `1px solid ${emp.isProfileComplete ? 'rgba(74, 222, 128, 0.1)' : 'rgba(239, 68, 68, 0.1)'}`
                                        }}>
                                            {emp.isProfileComplete ? 'Complete' : 'Incomplete'}
                                        </span>
                                    </div>
                                    <div style={{ fontSize: '14px', color: '#7c3aed', fontWeight: 500, marginBottom: '12px' }}>{emp.role || 'Unassigned Role'}</div>
                                    <div style={{ display: 'flex', gap: '20px' }}>
                                        <div style={{ fontSize: '12px', color: '#444' }}>
                                            <span style={{ color: '#333', fontWeight: 600 }}>ORG:</span> {emp.company}
                                        </div>
                                        <div style={{ fontSize: '12px', color: '#444' }}>
                                            <span style={{ color: '#333', fontWeight: 600 }}>JOINED:</span> {new Date(emp.createdAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>
                                <div style={{ color: '#222' }}>
                                    <span className="material-symbols-outlined">chevron_right</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </AdminShell>
    );
}

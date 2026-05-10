'use client';

import React, { useState, useEffect } from 'react';
import StudentForgeShell from '@/components/StudentForgeShell';
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

export default function StudentForgeEmployeesPage() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const companyName = "StudentForge";

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const res = await fetch(`/api/admin/employees?company=${encodeURIComponent(companyName)}`);
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
        <StudentForgeShell>
            <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
                <div style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#fff', marginBottom: '8px', letterSpacing: '-1px' }}>Forge Directory</h2>
                    <p style={{ color: '#666', fontSize: '14px' }}>Complete database of all StudentForge participants and their profile status.</p>
                </div>

                {isLoading ? (
                    <div style={{ padding: '80px', textAlign: 'center', color: '#444' }}>
                        <div className="skeleton" style={{ height: '2px', width: '200px', margin: '0 auto 20px' }}></div>
                        Loading Forge database...
                    </div>
                ) : employees.length === 0 ? (
                    <div style={{ padding: '80px', textAlign: 'center', color: '#444', background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: '12px' }}>
                        No participants registered in StudentForge.
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '24px' }}>
                        {employees.map(emp => (
                            <Link 
                                key={emp.id} 
                                href={`/studentforge/admin/dashboard/employees/${emp.id}`}
                                style={{ 
                                    textDecoration: 'none',
                                    background: '#0a0a0a', 
                                    border: '1px solid #1a1a1a', 
                                    padding: '24px', 
                                    borderRadius: '16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '20px',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = '#fbbf24';
                                    e.currentTarget.style.transform = 'translateY(-4px)';
                                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(251, 191, 36, 0.1)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = '#1a1a1a';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                <div style={{ 
                                    width: '72px', 
                                    height: '72px', 
                                    borderRadius: '12px', 
                                    background: 'linear-gradient(135deg, #222 0%, #111 100%)', 
                                    overflow: 'hidden',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0,
                                    border: '1px solid #222'
                                }}>
                                    {emp.profilePhoto ? (
                                        <img src={emp.profilePhoto} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    ) : (
                                        <span style={{ fontSize: '24px', fontWeight: 800, color: '#fbbf24' }}>
                                            {(emp.fullName || emp.email)[0].toUpperCase()}
                                        </span>
                                    )}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                                        <div style={{ fontSize: '18px', fontWeight: 700, color: '#fff' }}>{emp.fullName || 'New Participant'}</div>
                                        <span style={{ 
                                            fontSize: '9px', 
                                            padding: '3px 10px', 
                                            borderRadius: '20px',
                                            fontWeight: 800,
                                            background: emp.isProfileComplete ? 'rgba(52, 211, 153, 0.1)' : 'rgba(248, 113, 113, 0.1)',
                                            color: emp.isProfileComplete ? '#34d399' : '#f87171',
                                            border: `1px solid ${emp.isProfileComplete ? 'rgba(52, 211, 153, 0.2)' : 'rgba(248, 113, 113, 0.2)'}`,
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.5px'
                                        }}>
                                            {emp.isProfileComplete ? 'Verified' : 'Pending'}
                                        </span>
                                    </div>
                                    <div style={{ fontSize: '14px', color: '#fbbf24', fontWeight: 600, marginBottom: '12px' }}>{emp.role || 'Member'}</div>
                                    <div style={{ display: 'flex', gap: '20px' }}>
                                        <div style={{ fontSize: '11px', color: '#444', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                            Joined {new Date(emp.createdAt).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
                                        </div>
                                    </div>
                                </div>
                                <div style={{ color: '#222' }}>
                                    <span className="material-symbols-outlined">arrow_forward</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </StudentForgeShell>
    );
}

'use client';

import React, { useState, useEffect } from 'react';
import AdminShell from '@/components/AdminShell';
import { useParams, useRouter } from 'next/navigation';

interface Employee {
    id: string;
    email: string;
    fullName: string | null;
    role: string | null;
    phoneNumber: string | null;
    dob: string | null;
    upiId: string | null;
    fatherName: string | null;
    fatherPhoneNumber: string | null;
    college: string | null;
    isGraduated: boolean;
    profilePhoto: string | null;
    company: string;
    isProfileComplete: boolean;
    createdAt: string;
}

export default function EmployeeDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [employee, setEmployee] = useState<Employee | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                // For simplicity, we fetch all and find the one. 
                // In production, you'd have a specific /api/admin/employees/[id] route.
                const res = await fetch('/api/admin/employees');
                if (res.ok) {
                    const data: Employee[] = await res.json();
                    const found = data.find(e => e.id === params.id);
                    setEmployee(found || null);
                }
            } catch (err) {
                console.error('Error fetching employee');
            } finally {
                setIsLoading(false);
            }
        };
        fetchEmployee();
    }, [params.id]);

    if (isLoading) return <AdminShell><div style={{ padding: '40px', color: '#444' }}>Loading employee profile...</div></AdminShell>;
    if (!employee) return <AdminShell><div style={{ padding: '40px', color: '#f87171' }}>Employee not found.</div></AdminShell>;

    const DetailItem = ({ label, value }: { label: string, value: string | null | boolean }) => (
        <div style={{ marginBottom: '24px' }}>
            <div style={{ fontSize: '11px', color: '#444', fontWeight: 600, textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.5px' }}>{label}</div>
            <div style={{ fontSize: '15px', color: '#fff' }}>
                {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : (value || 'Not provided')}
            </div>
        </div>
    );

    return (
        <AdminShell>
            <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
                <div 
                    onClick={() => router.back()} 
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#7c3aed', marginBottom: '32px', cursor: 'pointer' }}
                >
                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_back</span>
                    <span style={{ fontSize: '13px', fontWeight: 600 }}>Back to Directory</span>
                </div>

                <div style={{ background: '#111', border: '1px solid #222', overflow: 'hidden' }}>
                    {/* Hero Section */}
                    <div style={{ padding: '48px', borderBottom: '1px solid #222', display: 'flex', gap: '40px', alignItems: 'center', background: 'rgba(255,255,255,0.01)' }}>
                        <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: '#222', overflow: 'hidden', border: '4px solid #1a1a1a' }}>
                            {employee.profilePhoto ? (
                                <img src={employee.profilePhoto} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', background: '#ffe4cc', color: '#d97706' }}>
                                    {employee.fullName?.[0] || employee.email[0]}
                                </div>
                            )}
                        </div>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                                <h1 style={{ fontSize: '32px', fontWeight: 600, color: '#fff' }}>{employee.fullName || 'New Employee'}</h1>
                                <span style={{ 
                                    fontSize: '10px', 
                                    padding: '4px 12px', 
                                    background: employee.isProfileComplete ? 'rgba(74, 222, 128, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                    color: employee.isProfileComplete ? '#4ade80' : '#f87171',
                                    border: `1px solid ${employee.isProfileComplete ? 'rgba(74, 222, 128, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`,
                                    borderRadius: '40px'
                                }}>
                                    {employee.isProfileComplete ? 'Profile Complete' : 'Pending Update'}
                                </span>
                            </div>
                            <p style={{ color: '#7c3aed', fontSize: '16px', fontWeight: 500 }}>{employee.role || 'Unassigned Role'}</p>
                            <p style={{ color: '#444', fontSize: '13px', marginTop: '12px' }}>Member since {new Date(employee.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div style={{ padding: '48px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px' }}>
                        <div>
                            <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#7c3aed', marginBottom: '32px', borderBottom: '1px solid #222', paddingBottom: '12px' }}>Personal & Educational</h3>
                            <DetailItem label="Full Name" value={employee.fullName} />
                            <DetailItem label="Email Address" value={employee.email} />
                            <DetailItem label="Phone Number" value={employee.phoneNumber} />
                            <DetailItem label="Date of Birth" value={employee.dob} />
                            <DetailItem label="College / University" value={employee.college} />
                            <DetailItem label="Graduation Status" value={employee.isGraduated ? 'Graduated' : 'Currently Pursuing'} />
                        </div>
                        <div>
                            <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#7c3aed', marginBottom: '32px', borderBottom: '1px solid #222', paddingBottom: '12px' }}>Professional & Family</h3>
                            <DetailItem label="Company / Organization" value={employee.company} />
                            <DetailItem label="UPI ID (For Payroll)" value={employee.upiId} />
                            <DetailItem label="Father's Full Name" value={employee.fatherName} />
                            <DetailItem label="Emergency Contact" value={employee.fatherPhoneNumber} />
                            <DetailItem label="Unique ID" value={employee.id} />
                        </div>
                    </div>
                </div>
            </div>
        </AdminShell>
    );
}

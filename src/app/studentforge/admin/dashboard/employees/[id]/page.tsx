'use client';

import React, { useState, useEffect } from 'react';
import StudentForgeShell from '@/components/StudentForgeShell';
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

export default function StudentForgeEmployeeDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [employee, setEmployee] = useState<Employee | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const companyName = "StudentForge";

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const res = await fetch(`/api/admin/employees?company=${encodeURIComponent(companyName)}`);
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

    if (isLoading) return <StudentForgeShell><div style={{ padding: '80px', textAlign: 'center', color: '#444' }}>Decrypting Forge profile...</div></StudentForgeShell>;
    if (!employee) return <StudentForgeShell><div style={{ padding: '80px', textAlign: 'center', color: '#f87171' }}>Participant not found in the Forge database.</div></StudentForgeShell>;

    const DetailItem = ({ label, value }: { label: string, value: string | null | boolean }) => (
        <div style={{ marginBottom: '32px' }}>
            <div style={{ fontSize: '11px', color: '#333', fontWeight: 800, textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '1px' }}>{label}</div>
            <div style={{ fontSize: '16px', color: '#fff', fontWeight: 500 }}>
                {typeof value === 'boolean' ? (value ? 'YES' : 'NO') : (value || 'NOT_SPECIFIED')}
            </div>
        </div>
    );

    return (
        <StudentForgeShell>
            <div style={{ animation: 'fadeIn 0.5s ease-out', maxWidth: '1200px' }}>
                <div 
                    onClick={() => router.back()} 
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', color: '#fbbf24', marginBottom: '40px', cursor: 'pointer', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px' }}
                >
                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>arrow_back_ios</span>
                    Return to Forge
                </div>

                <div style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.5)' }}>
                    {/* Hero Section */}
                    <div style={{ padding: '64px', borderBottom: '1px solid #111', display: 'flex', gap: '56px', alignItems: 'center', background: 'linear-gradient(135deg, #0a0a0a 0%, #050505 100%)' }}>
                        <div style={{ width: '160px', height: '160px', borderRadius: '24px', background: '#111', overflow: 'hidden', border: '2px solid #fbbf24', boxShadow: '0 0 30px rgba(251, 191, 36, 0.1)', position: 'relative' }}>
                            {employee.profilePhoto ? (
                                <img src={employee.profilePhoto} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '64px', fontWeight: 800, background: '#0a0a0a', color: '#fbbf24' }}>
                                    {employee.fullName?.[0] || employee.email[0]}
                                </div>
                            )}
                        </div>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '12px' }}>
                                <h1 style={{ fontSize: '40px', fontWeight: 800, color: '#fff', letterSpacing: '-1px' }}>{employee.fullName || 'Forge Member'}</h1>
                                <span style={{ 
                                    fontSize: '10px', 
                                    padding: '5px 15px', 
                                    background: employee.isProfileComplete ? 'rgba(52, 211, 153, 0.1)' : 'rgba(248, 113, 113, 0.1)',
                                    color: employee.isProfileComplete ? '#34d399' : '#f87171',
                                    border: `1px solid ${employee.isProfileComplete ? 'rgba(52, 211, 153, 0.2)' : 'rgba(248, 113, 113, 0.2)'}`,
                                    borderRadius: '40px',
                                    fontWeight: 800,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px'
                                }}>
                                    {employee.isProfileComplete ? 'VERIFIED' : 'PENDING_VALIDATION'}
                                </span>
                            </div>
                            <p style={{ color: '#fbbf24', fontSize: '20px', fontWeight: 600 }}>{employee.role || 'Member'}</p>
                            <div style={{ display: 'flex', gap: '24px', marginTop: '24px' }}>
                                <div style={{ color: '#444', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>Joined {new Date(employee.createdAt).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</div>
                                <div style={{ color: '#444', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>ID: {employee.id.toUpperCase()}</div>
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div style={{ padding: '64px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', background: '#0a0a0a' }}>
                        <div>
                            <h3 style={{ fontSize: '13px', fontWeight: 800, color: '#fbbf24', marginBottom: '40px', borderBottom: '1px solid #111', paddingBottom: '16px', textTransform: 'uppercase', letterSpacing: '2px' }}>Member Identity</h3>
                            <DetailItem label="Full Name" value={employee.fullName} />
                            <DetailItem label="Contact Email" value={employee.email} />
                            <DetailItem label="Phone Line" value={employee.phoneNumber} />
                            <DetailItem label="Birth Date" value={employee.dob} />
                            <DetailItem label="Forge Institution" value={employee.college} />
                            <DetailItem label="Academic Status" value={employee.isGraduated ? 'COMPLETED' : 'ENROLLED'} />
                        </div>
                        <div>
                            <h3 style={{ fontSize: '13px', fontWeight: 800, color: '#fbbf24', marginBottom: '40px', borderBottom: '1px solid #111', paddingBottom: '16px', textTransform: 'uppercase', letterSpacing: '2px' }}>Operational Data</h3>
                            <DetailItem label="Primary Organization" value={employee.company} />
                            <DetailItem label="Transaction Alias" value={employee.upiId} />
                            <DetailItem label="Primary Guardian" value={employee.fatherName} />
                            <DetailItem label="Emergency Uplink" value={employee.fatherPhoneNumber} />
                            <DetailItem label="Persistence Key" value={employee.id} />
                        </div>
                    </div>
                </div>
            </div>
        </StudentForgeShell>
    );
}

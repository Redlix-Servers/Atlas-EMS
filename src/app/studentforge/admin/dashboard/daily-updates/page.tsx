'use client';

import React, { useState, useEffect } from 'react';
import StudentForgeShell from '@/components/StudentForgeShell';

interface DailyUpdate {
    id: string;
    contentDone: string;
    contentExplored: string;
    contentLearned: string;
    createdAt: string;
    employee: {
        fullName: string;
        email: string;
        company: string;
    };
}

export default function StudentForgeDailyUpdatesPage() {
    const [updates, setUpdates] = useState<DailyUpdate[]>([]);
    const [isFetching, setIsFetching] = useState(true);
    const companyName = "StudentForge";

    useEffect(() => {
        const fetchUpdates = async () => {
            try {
                const res = await fetch(`/api/admin/daily-updates?company=${encodeURIComponent(companyName)}`);
                if (res.ok) setUpdates(await res.json());
            } catch (err) {
                console.error('Failed to fetch updates');
            } finally {
                setIsFetching(false);
            }
        };
        fetchUpdates();
    }, []);

    return (
        <StudentForgeShell>
            <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
                <div style={{ marginBottom: '32px' }}>
                    <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#fff', marginBottom: '8px' }}>Forge Daily Log</h1>
                    <p style={{ color: '#666', fontSize: '14px' }}>Real-time stream of activities and progress from StudentForge participants.</p>
                </div>

                {isFetching ? (
                    <div style={{ padding: '80px', textAlign: 'center', color: '#444' }}>
                         <div className="skeleton" style={{ height: '2px', width: '100%', marginBottom: '20px' }}></div>
                         Synchronizing with Forge...
                    </div>
                ) : updates.length === 0 ? (
                    <div style={{ padding: '80px', textAlign: 'center', color: '#444', background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: '12px' }}>
                        No daily updates found for StudentForge participants.
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {updates.map((update) => (
                            <div key={update.id} style={{ 
                                background: '#0a0a0a',
                                border: '1px solid #1a1a1a',
                                borderRadius: '12px',
                                padding: '24px',
                                display: 'grid',
                                gridTemplateColumns: '240px 1fr',
                                gap: '32px'
                            }}>
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                                        <div style={{ width: '40px', height: '40px', background: '#111', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fbbf24', fontWeight: 700 }}>
                                            {update.employee.fullName?.charAt(0) || 'U'}
                                        </div>
                                        <div>
                                            <div style={{ color: '#fff', fontWeight: '600', fontSize: '15px' }}>{update.employee.fullName}</div>
                                            <div style={{ color: '#444', fontSize: '12px' }}>{update.employee.email}</div>
                                        </div>
                                    </div>
                                    <div style={{ padding: '8px 12px', background: 'rgba(251, 191, 36, 0.05)', border: '1px solid rgba(251, 191, 36, 0.1)', borderRadius: '6px', display: 'inline-block' }}>
                                        <div style={{ color: '#fbbf24', fontSize: '10px', fontWeight: 700, letterSpacing: '0.5px' }}>
                                            {new Date(update.createdAt).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}
                                        </div>
                                    </div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px' }}>
                                    <div>
                                        <div style={{ color: '#333', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '1px' }}>Tasks Completed</div>
                                        <div style={{ color: '#aaa', fontSize: '14px', lineHeight: '1.6' }}>{update.contentDone}</div>
                                    </div>
                                    <div>
                                        <div style={{ color: '#333', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '1px' }}>Concepts Explored</div>
                                        <div style={{ color: '#aaa', fontSize: '14px', lineHeight: '1.6' }}>{update.contentExplored}</div>
                                    </div>
                                    <div>
                                        <div style={{ color: '#333', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '1px' }}>Key Learnings</div>
                                        <div style={{ color: '#aaa', fontSize: '14px', lineHeight: '1.6' }}>{update.contentLearned}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </StudentForgeShell>
    );
}

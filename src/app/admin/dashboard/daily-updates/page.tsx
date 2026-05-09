'use client';

import React, { useState, useEffect } from 'react';
import AdminShell from '@/components/AdminShell';

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

export default function AdminDailyUpdatesPage() {
    const [updates, setUpdates] = useState<DailyUpdate[]>([]);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        const fetchUpdates = async () => {
            try {
                const res = await fetch('/api/admin/daily-updates');
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
        <AdminShell>
            <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
                <div style={{ marginBottom: '32px' }}>
                    <h1 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '4px' }}>Employee Daily Updates</h1>
                    <p style={{ color: '#555', fontSize: '13px' }}>Monitor daily progress and learning across the organization.</p>
                </div>

                {isFetching ? (
                    <div style={{ padding: '40px', textAlign: 'center', color: '#444' }}>Fetching organizational updates...</div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: '#222', border: '1px solid #222' }}>
                        <div style={{ 
                            display: 'grid', 
                            gridTemplateColumns: '200px 150px 1fr 1fr 1fr 120px',
                            gap: '1px',
                            background: '#111',
                            padding: '12px',
                            fontSize: '10px',
                            fontWeight: '700',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            color: '#444'
                        }}>
                            <div>Employee</div>
                            <div>Company</div>
                            <div>Done</div>
                            <div>Explored</div>
                            <div>Learned</div>
                            <div>Date</div>
                        </div>

                        {updates.map((update) => (
                            <div key={update.id} style={{ 
                                display: 'grid', 
                                gridTemplateColumns: '200px 150px 1fr 1fr 1fr 120px',
                                gap: '1px',
                                background: '#000',
                                padding: '16px 12px',
                                fontSize: '13px',
                                alignItems: 'start'
                            }}>
                                <div style={{ color: '#fff', fontWeight: '500' }}>
                                    {update.employee.fullName}
                                    <div style={{ fontSize: '11px', color: '#444', fontWeight: '400' }}>{update.employee.email}</div>
                                </div>
                                <div style={{ color: '#888' }}>{update.employee.company}</div>
                                <div style={{ color: '#aaa', paddingRight: '12px' }}>{update.contentDone}</div>
                                <div style={{ color: '#aaa', paddingRight: '12px' }}>{update.contentExplored}</div>
                                <div style={{ color: '#aaa', paddingRight: '12px' }}>{update.contentLearned}</div>
                                <div style={{ color: '#444', fontSize: '11px' }}>
                                    {new Date(update.createdAt).toLocaleDateString()}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AdminShell>
    );
}

'use client';

import React from 'react';
import DashboardShell from '@/components/DashboardShell';
import Skeleton from '@/components/Skeleton';

export default function Loading() {
    return (
        <DashboardShell>
            <div style={{ animation: 'fadeIn 0.5s ease-out', display: 'grid', gridTemplateColumns: '350px 1fr', gap: '32px' }}>
                <div style={{ background: '#111', border: '1px solid #222', padding: '24px', height: '500px' }}>
                    <Skeleton width="60%" height="10px" style={{ marginBottom: '24px' }} />
                    {Array(3).fill(0).map((_, i) => (
                        <div key={i} style={{ marginBottom: '24px' }}>
                            <Skeleton width="40%" height="8px" style={{ marginBottom: '12px' }} />
                            <Skeleton width="100%" height="60px" />
                        </div>
                    ))}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <Skeleton width="150px" height="14px" style={{ marginBottom: '10px' }} />
                    {Array(3).fill(0).map((_, i) => (
                        <div key={i} style={{ background: '#111', border: '1px solid #222', padding: '24px' }}>
                            <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
                                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#222' }} className="skeleton" />
                                <div>
                                    <Skeleton width="120px" height="12px" style={{ marginBottom: '6px' }} />
                                    <Skeleton width="80px" height="8px" />
                                </div>
                            </div>
                            <Skeleton width="100%" height="10px" style={{ marginBottom: '8px' }} />
                            <Skeleton width="90%" height="10px" style={{ marginBottom: '8px' }} />
                            <Skeleton width="70%" height="10px" />
                        </div>
                    ))}
                </div>
            </div>
        </DashboardShell>
    );
}

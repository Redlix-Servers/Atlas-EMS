'use client';

import React from 'react';
import DashboardShell from '@/components/DashboardShell';
import Skeleton from '@/components/Skeleton';

export default function Loading() {
    return (
        <DashboardShell>
            <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
                <div style={{ background: '#111', height: '200px', width: '100%', marginBottom: '60px' }} className="skeleton" />
                
                <div style={{ display: 'flex', gap: '32px', padding: '0 32px' }}>
                    <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: '#111', marginTop: '-80px', border: '4px solid #000' }} className="skeleton" />
                    <div style={{ flex: 1 }}>
                        <Skeleton width="200px" height="24px" style={{ marginBottom: '8px' }} />
                        <Skeleton width="100px" height="12px" />
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', padding: '40px 32px' }}>
                    {Array(6).fill(0).map((_, i) => (
                        <div key={i} style={{ background: '#111', border: '1px solid #222', padding: '24px' }}>
                            <Skeleton width="40%" height="10px" style={{ marginBottom: '12px' }} />
                            <Skeleton width="80%" height="16px" />
                        </div>
                    ))}
                </div>
            </div>
        </DashboardShell>
    );
}

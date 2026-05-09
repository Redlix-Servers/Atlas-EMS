'use client';

import React from 'react';
import DashboardShell from '@/components/DashboardShell';
import { StatSkeleton, CardSkeleton } from '@/components/Skeleton';

export default function Loading() {
    return (
        <DashboardShell userEmail="" company="" onLogout={async () => {}}>
            <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
                <div style={{ marginBottom: '32px' }}>
                    <div style={{ height: '24px', width: '200px', background: '#111', marginBottom: '8px' }} className="skeleton" />
                    <div style={{ height: '14px', width: '300px', background: '#111' }} className="skeleton" />
                </div>

                <div className="stat-grid">
                    {Array(5).fill(0).map((_, i) => <StatSkeleton key={i} />)}
                </div>

                <div style={{ marginTop: '32px' }}>
                    <CardSkeleton />
                    <CardSkeleton />
                </div>
            </div>
        </DashboardShell>
    );
}

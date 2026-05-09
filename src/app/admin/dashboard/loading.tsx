'use client';

import React from 'react';
import AdminShell from '@/components/AdminShell';
import { StatSkeleton } from '@/components/Skeleton';

export default function Loading() {
    return (
        <AdminShell>
            <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
                <div style={{ marginBottom: '32px' }}>
                    <div style={{ height: '24px', width: '200px', background: '#111', marginBottom: '8px' }} className="skeleton" />
                    <div style={{ height: '14px', width: '300px', background: '#111' }} className="skeleton" />
                </div>

                <div className="stat-grid">
                    {Array(3).fill(0).map((_, i) => <StatSkeleton key={i} />)}
                </div>

                <div style={{ marginTop: '32px', background: '#111', border: '1px solid #222', height: '400px' }} className="skeleton" />
            </div>
        </AdminShell>
    );
}

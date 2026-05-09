'use client';

import React from 'react';
import DashboardShell from '@/components/DashboardShell';
import { TableSkeleton } from '@/components/Skeleton';

export default function Loading() {
    return (
        <DashboardShell>
            <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
                <div style={{ marginBottom: '32px' }}>
                    <div style={{ height: '24px', width: '200px', background: '#111', marginBottom: '8px' }} className="skeleton" />
                    <div style={{ height: '14px', width: '300px', background: '#111' }} className="skeleton" />
                </div>
                <TableSkeleton />
            </div>
        </DashboardShell>
    );
}

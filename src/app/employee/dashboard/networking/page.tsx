'use client';

import React from 'react';
import DashboardShell from '@/components/DashboardShell';

export default function NetworkingPage() {
    return (
        <DashboardShell>
            <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
                <h1 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '8px' }}>Networking</h1>
                <p style={{ color: '#555', fontSize: '13px', marginBottom: '32px' }}>Connect with peers across Redlix Systems partners.</p>

                <div style={{ 
                    background: '#111', 
                    border: '1px dashed #222', 
                    padding: '80px 40px', 
                    textAlign: 'center',
                    color: '#444'
                }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '48px', marginBottom: '16px', display: 'block' }}>groups</span>
                    <h3 style={{ fontSize: '18px', color: '#888', marginBottom: '8px' }}>Networking Hub Coming Soon</h3>
                    <p style={{ fontSize: '13px', maxWidth: '400px', margin: '0 auto' }}>We're building a space for you to collaborate, share insights, and grow your professional network within the ecosystem.</p>
                </div>
            </div>
        </DashboardShell>
    );
}

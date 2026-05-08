'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

export default function DashboardShell({ 
    children, 
    userEmail, 
    company,
    onLogout 
}: { 
    children: React.ReactNode, 
    userEmail: string, 
    company: string,
    onLogout: () => Promise<void>
}) {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    const navItems = [
        { name: 'Overview', icon: 'dashboard', path: '/employee/dashboard' },
        { name: 'Attendance', icon: 'pan_tool', path: '/employee/dashboard/attendance' },
        { name: 'Payroll', icon: 'payments', path: '/employee/dashboard/payroll' },
        { name: 'Events', icon: 'event', path: '/employee/dashboard/events' },
        { name: 'Tasks', icon: 'assignment', path: '/employee/dashboard/tasks' },
        { name: 'Documents', icon: 'description', path: '/employee/dashboard/documents' },
        { name: 'Profile', icon: 'person', path: '/employee/dashboard/profile' },
    ];

    return (
        <div className="dashboard-container">
            <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
                <div className="sidebar-header">
                    <span className="sidebar-logo">Atlas</span>
                    <button 
                        className="fold-button"
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        aria-label="Toggle Sidebar"
                    >
                        <span className="material-symbols-outlined">
                            {isCollapsed ? 'chevron_right' : 'chevron_left'}
                        </span>
                    </button>
                </div>

                <nav className="sidebar-nav">
                    {navItems.map((item) => (
                        <Link 
                            key={item.name} 
                            href={item.path} 
                            className={`nav-item ${pathname === item.path ? 'active' : ''}`}
                        >
                            <div className="nav-icon">
                                <span className="material-symbols-outlined">{item.icon}</span>
                            </div>
                            <span className="nav-text">{item.name}</span>
                        </Link>
                    ))}
                </nav>

                <div style={{ marginTop: 'auto', padding: '12px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    <button 
                        onClick={async () => {
                            const res = await fetch('/api/employee/attendance', { method: 'POST' });
                            if (res.ok) {
                                alert('Attendance marked successfully!');
                            } else {
                                const data = await res.json();
                                alert(data.error || 'Failed to mark attendance');
                            }
                        }}
                        className="nav-item" 
                        style={{ 
                            width: '100%', 
                            background: 'rgba(124, 58, 237, 0.1)', 
                            border: '1px solid rgba(124, 58, 237, 0.2)', 
                            cursor: 'pointer', 
                            padding: '12px 16px',
                            color: '#7c3aed',
                            marginBottom: '8px',
                            borderRadius: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px'
                        }}
                    >
                        <div className="nav-icon">
                            <span className="material-symbols-outlined">front_hand</span>
                        </div>
                        {!isCollapsed && <span className="nav-text" style={{ fontWeight: 600 }}>Raise Hand</span>}
                    </button>

                    <form action={onLogout}>
                        <button type="submit" className="nav-item" style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: '12px 16px' }}>
                            <div className="nav-icon">
                                <span className="material-symbols-outlined">logout</span>
                            </div>
                            <span className="nav-text">Logout</span>
                        </button>
                    </form>
                </div>
            </aside>

            <div className="main-content">
                <header className="top-nav">
                    <div style={{ fontSize: '14px', color: '#888' }}>
                        Welcome back, <span style={{ color: '#fff', fontWeight: 500 }}>{userEmail}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>
                            {userEmail ? userEmail[0].toUpperCase() : '?'}
                        </div>
                        <span style={{ fontSize: '14px', color: '#888' }}>{company}</span>
                    </div>
                </header>
                <main className="dashboard-scroll-area">
                    {children}
                </main>
                
                <footer style={{ 
                    padding: '16px 32px', 
                    borderTop: '1px solid #111', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    gap: '12px',
                    background: 'transparent'
                }} className="dashboard-footer">
                    <span style={{ fontSize: '10px', fontWeight: 700, color: '#555', letterSpacing: '1px', textTransform: 'uppercase' }}>Powered by</span>
                    <a href="https://redlix.co.in" target="_blank" rel="noopener noreferrer" className="footer-logo-link" style={{ display: 'flex' }}>
                        <img 
                            src="https://ik.imagekit.io/dypkhqxip/redlixlogo?updatedAt=1777318254456" 
                            alt="Redlix Logo" 
                            style={{ height: '16px', objectFit: 'contain', transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                        />
                    </a>
                </footer>
                <style jsx>{`
                    .footer-logo-link:hover img {
                        transform: scale(1.1);
                    }
                `}</style>
            </div>
        </div>
    );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

export default function DashboardShell({ 
    children, 
    userEmail = '', 
    company = 'Atlas EMS',
    onLogout = async () => {}
}: { 
    children: React.ReactNode, 
    userEmail?: string, 
    company?: string,
    onLogout?: () => Promise<void>
}) {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    const navItems = [
        { name: 'Overview', icon: 'dashboard', path: '/employee/dashboard' },
        { name: 'Daily Updates', icon: 'history_edu', path: '/employee/dashboard/daily-updates' },
        { name: 'Networking', icon: 'groups', path: '/employee/dashboard/networking' },
        { name: 'Attendance', icon: 'pan_tool', path: '/employee/dashboard/attendance' },
        { name: 'Payroll', icon: 'payments', path: '/employee/dashboard/payroll' },
        { name: 'Events', icon: 'event', path: '/employee/dashboard/events' },
        { name: 'Tasks', icon: 'assignment', path: '/employee/dashboard/tasks' },
        { name: 'Documents', icon: 'description', path: '/employee/dashboard/documents' },
        { name: 'Profile', icon: 'person', path: '/employee/dashboard/profile' },
    ];

    return (
        <div className={`dashboard-container ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
            {/* Mobile Overlay */}
            {isMobileMenuOpen && (
                <div 
                    className="mobile-overlay" 
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${isMobileMenuOpen ? 'mobile-show' : ''}`}>
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
                            onClick={() => setIsMobileMenuOpen(false)}
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
                    <div className="mobile-brand">
                        <button 
                            className="mobile-toggle"
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <span className="material-symbols-outlined">menu</span>
                        </button>
                        <span className="brand-name">Atlas</span>
                    </div>
                    <div className="top-nav-title" style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{ color: '#888', fontSize: '13px' }}>{company}</span>
                        <div style={{ width: '1px', height: '12px', background: '#333', margin: '0 12px' }}></div>
                        <span style={{ fontWeight: 500 }}>{navItems.find(i => i.path === pathname)?.name || 'Dashboard'}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>
                            {userEmail ? userEmail[0].toUpperCase() : '?'}
                        </div>
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
                    gap: '24px',
                    background: 'transparent'
                }} className="dashboard-footer">
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                        <Link href="/privacy" style={{ fontSize: '10px', color: '#444', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Privacy</Link>
                        <Link href="/terms" style={{ fontSize: '10px', color: '#444', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Terms</Link>
                        <Link href="/support" style={{ fontSize: '10px', color: '#444', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Support</Link>
                    </div>
                    <div style={{ width: '1px', height: '12px', background: '#222', flexShrink: 0 }}></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '10px', fontWeight: 700, color: '#444', letterSpacing: '1px', textTransform: 'uppercase' }}>Powered by</span>
                        <a href="https://redlix.co.in" target="_blank" rel="noopener noreferrer" className="footer-logo-link" style={{ display: 'flex' }}>
                            <img 
                                src="https://ik.imagekit.io/dypkhqxip/redlixlogo?updatedAt=1777318254456" 
                                alt="Redlix Logo" 
                                style={{ height: '14px', objectFit: 'contain', filter: 'grayscale(1)', opacity: 0.5 }}
                            />
                        </a>
                    </div>
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

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

export default function StudentForgeShell({ children }: { children: React.ReactNode }) {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const session = localStorage.getItem('studentforge_session');
        if (!session && pathname !== '/studentforge/admin/login') {
            router.push('/studentforge/admin/login');
        }
    }, [pathname, router]);

    const handleLogout = () => {
        localStorage.removeItem('studentforge_session');
        router.push('/studentforge/admin/login');
    };

    const navItems = [
        { name: 'Dashboard', icon: 'grid_view', path: '/studentforge/admin/dashboard' },
        { name: 'Daily Updates', icon: 'history_edu', path: '/studentforge/admin/dashboard/daily-updates' },
        { name: 'Analytics', icon: 'analytics', path: '/studentforge/admin/dashboard/analytics' },
        { name: 'Employees', icon: 'badge', path: '/studentforge/admin/dashboard/employees' },
        { name: 'Events', icon: 'event', path: '/studentforge/admin/dashboard/events' },
        { name: 'Tasks', icon: 'task', path: '/studentforge/admin/dashboard/tasks' },
        { name: 'Documents', icon: 'description', path: '/studentforge/admin/dashboard/documents' },
        // Payroll is excluded as requested
        { name: 'Reports', icon: 'assessment', path: '/studentforge/admin/dashboard/reports' },
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

            <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${isMobileMenuOpen ? 'mobile-show' : ''}`} style={{ background: '#0a0a0a', borderRight: '1px solid #1a1a1a' }}>
                <div className="sidebar-header">
                    <div className="sidebar-logo" style={{ color: '#fbbf24', fontWeight: 800 }}>StudentForge</div>
                    <button className="fold-button" onClick={() => setIsCollapsed(!isCollapsed)} style={{ background: '#111' }}>
                        <span className="material-symbols-outlined" style={{ color: '#fbbf24' }}>
                            {isCollapsed ? 'menu_open' : 'menu'}
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
                            style={{ 
                                color: pathname === item.path ? '#fbbf24' : '#666',
                                background: pathname === item.path ? 'rgba(251, 191, 36, 0.1)' : 'transparent'
                            }}
                        >
                            <div className="nav-icon">
                                <span className="material-symbols-outlined">{item.icon}</span>
                            </div>
                            <span className="nav-text">{item.name}</span>
                        </Link>
                    ))}
                </nav>

                <div style={{ padding: '20px', borderTop: '1px solid #1a1a1a' }}>
                    <button 
                        onClick={handleLogout}
                        style={{ 
                            width: '100%', 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '12px', 
                            background: 'none', 
                            border: 'none', 
                            color: '#f87171', 
                            cursor: 'pointer',
                            padding: '12px'
                        }}
                    >
                        <span className="material-symbols-outlined">logout</span>
                        {!isCollapsed && <span style={{ fontSize: '14px', fontWeight: 500 }}>Logout</span>}
                    </button>
                </div>
            </aside>

            <div className="main-content">
                <header className="top-nav" style={{ background: '#050505', borderBottom: '1px solid #1a1a1a' }}>
                    <div className="mobile-brand">
                        <button 
                            className="mobile-toggle"
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <span className="material-symbols-outlined">menu</span>
                        </button>
                        <span className="brand-name" style={{ color: '#fbbf24' }}>StudentForge</span>
                    </div>
                    <div className="top-nav-title" style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{ fontWeight: 600, color: '#fff' }}>StudentForge Admin</span>
                        <div style={{ width: '1px', height: '12px', background: '#333', margin: '0 12px' }}></div>
                        <span style={{ color: '#fbbf24', fontSize: '13px', fontWeight: 500 }}>{navItems.find(i => i.path === pathname)?.name || 'Overview'}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontSize: '13px', fontWeight: 600, color: '#fff' }}>Forge Manager</span>
                            <span style={{ fontSize: '11px', color: '#666' }}>Admin Access</span>
                        </div>
                        <div style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg, #fbbf24 0%, #d97706 100%)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 700, color: '#000' }}>SF</div>
                    </div>
                </header>
                <main className="dashboard-scroll-area" style={{ background: '#050505' }}>
                    {children}
                </main>

                <footer style={{ 
                    padding: '16px 32px', 
                    borderTop: '1px solid #111', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    gap: '24px',
                    background: '#050505'
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
            </div>
        </div>
    );
}

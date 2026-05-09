'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

export default function AdminShell({ children }: { children: React.ReactNode }) {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const session = localStorage.getItem('admin_session');
        if (!session && pathname !== '/admin/login') {
            router.push('/admin/login');
        }
    }, [pathname, router]);

    const handleLogout = () => {
        localStorage.removeItem('admin_session');
        router.push('/admin/login');
    };

    const navItems = [
        { name: 'Dashboard', icon: 'grid_view', path: '/admin/dashboard' },
        { name: 'Daily Updates', icon: 'history_edu', path: '/admin/dashboard/daily-updates' },
        { name: 'Analytics', icon: 'analytics', path: '/admin/dashboard/analytics' },
        { name: 'Employees', icon: 'badge', path: '/admin/dashboard/employees' },
        { name: 'Events', icon: 'event', path: '/admin/dashboard/events' },
        { name: 'Tasks', icon: 'task', path: '/admin/dashboard/tasks' },
        { name: 'Documents', icon: 'description', path: '/admin/dashboard/documents' },
        { name: 'Payroll', icon: 'payments', path: '/admin/dashboard/payroll' },
        { name: 'Reports', icon: 'assessment', path: '/admin/dashboard/reports' },
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

            <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${isMobileMenuOpen ? 'mobile-show' : ''}`} style={{ background: '#111' }}>
                <div className="sidebar-header">
                    <div className="sidebar-logo">Admin Panel</div>
                    <button className="fold-button" onClick={() => setIsCollapsed(!isCollapsed)}>
                        <span className="material-symbols-outlined">
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
                            style={{ color: pathname === item.path ? '#7c3aed' : '#888' }}
                        >
                            <div className="nav-icon">
                                <span className="material-symbols-outlined">{item.icon}</span>
                            </div>
                            <span className="nav-text">{item.name}</span>
                        </Link>
                    ))}
                </nav>

                <div style={{ padding: '20px', borderTop: '1px solid #222' }}>
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
                        <span style={{ fontWeight: 500 }}>Admin Portal</span>
                        <div style={{ width: '1px', height: '12px', background: '#333', margin: '0 12px' }}></div>
                        <span style={{ color: '#888', fontSize: '13px' }}>{navItems.find(i => i.path === pathname)?.name || 'Overview'}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <span style={{ fontSize: '14px', fontWeight: 500 }}>Admin User</span>
                        <div style={{ width: '32px', height: '32px', background: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>AD</div>
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

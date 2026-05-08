'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

export default function AdminShell({ children }: { children: React.ReactNode }) {
    const [isCollapsed, setIsCollapsed] = useState(false);
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
        { name: 'Employees', icon: 'badge', path: '/admin/dashboard/employees' },
        { name: 'Events', icon: 'event', path: '/admin/dashboard/events' },
        { name: 'Tasks', icon: 'task', path: '/admin/dashboard/tasks' },
        { name: 'Documents', icon: 'description', path: '/admin/dashboard/documents' },
        { name: 'Payroll', icon: 'payments', path: '/admin/dashboard/payroll' },
        { name: 'Reports', icon: 'analytics', path: '#' },
    ];

    return (
        <div className="dashboard-container">
            <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`} style={{ background: '#111' }}>
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
                    <div style={{ fontSize: '14px', color: '#888' }}>
                        System Status: <span style={{ color: '#4ade80' }}>Active</span>
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

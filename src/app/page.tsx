'use client';

import React from 'react';
import Link from 'next/link';

export default function Home() {
    return (
        <div className="landing-wrapper">
            <header className="main-nav">
                <div className="nav-container">
                    <div className="brand-container">
                        <img src="https://ik.imagekit.io/dypkhqxip/atlasf?updatedAt=1778110387224" alt="Atlas Logo" className="brand-logo" />
                        <span className="brand-name">Atlas Management</span>
                    </div>
                    <nav className="nav-links">
                        <Link href="/employee/login" className="nav-link">Employee Login</Link>
                    </nav>
                </div>
            </header>

            <main className="hero-section">
                <div className="hero-content">
                    <span className="hero-tag">Enterprise Resource Platform</span>
                    <h1 className="hero-title">Efficient systems for <span className="violet">modern organizations</span>.</h1>
                    <p className="hero-subtitle">
                        Streamline your workflow with our integrated management tools. 
                        Access attendance, payroll, and tasks in one unified environment.
                    </p>
                    <div className="cta-row">
                        <Link href="/employee/login" className="cta-button">Access Dashboard</Link>
                    </div>
                </div>
            </main>

            <footer className="auth-footer">
                <div className="auth-footer-left">
                    <Link href="/privacy" className="auth-footer-link">Privacy</Link>
                    <Link href="/terms" className="auth-footer-link">Terms</Link>
                    <Link href="/support" className="auth-footer-link">Support</Link>
                </div>
                <div className="auth-footer-right" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span>© 2026 Redlix Systems</span>
                    <a href="https://redlix.co.in" target="_blank" rel="noopener noreferrer" style={{ display: 'flex' }}>
                        <img 
                            src="https://ik.imagekit.io/dypkhqxip/redlixlogo?updatedAt=1777318254456" 
                            alt="Redlix" 
                            style={{ height: '14px', filter: 'grayscale(1)', opacity: 0.5, transition: 'all 0.3s' }}
                            onMouseOver={(e) => { e.currentTarget.style.filter = 'grayscale(0)'; e.currentTarget.style.opacity = '0.8'; }}
                            onMouseOut={(e) => { e.currentTarget.style.filter = 'grayscale(1)'; e.currentTarget.style.opacity = '0.5'; }}
                        />
                    </a>
                </div>
            </footer>

            <style jsx>{`
                .landing-wrapper {
                    min-height: 100vh;
                    background-color: #0a0a0a;
                    color: #ffffff;
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
                    display: flex;
                    flex-direction: column;
                }

                .main-nav {
                    padding: 32px 0;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                }

                .nav-container {
                    max-width: 1100px;
                    margin: 0 auto;
                    padding: 0 24px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .brand-container {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    gap: 12px;
                    white-space: nowrap;
                }

                .brand-logo {
                    width: 24px;
                    height: 24px;
                }

                .brand-name {
                    font-size: 15px;
                    font-weight: 500;
                    color: rgba(255, 255, 255, 0.9);
                    letter-spacing: -0.2px;
                }

                .nav-link {
                    font-size: 13px;
                    color: rgba(255, 255, 255, 0.6);
                    text-decoration: none;
                    transition: color 0.2s;
                    font-weight: 400;
                }

                .nav-link:hover {
                    color: #ffffff;
                }

                .hero-section {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 80px 24px;
                }

                .hero-content {
                    max-width: 640px;
                    text-align: center;
                }

                .hero-tag {
                    font-size: 12px;
                    color: #7c3aed;
                    font-weight: 500;
                    letter-spacing: 0.5px;
                    display: block;
                    margin-bottom: 16px;
                }

                .hero-title {
                    font-size: clamp(32px, 5vw, 48px);
                    font-weight: 500;
                    line-height: 1.2;
                    margin-bottom: 24px;
                    color: #ffffff;
                    letter-spacing: -0.5px;
                }

                .violet {
                    color: #7c3aed;
                }

                .hero-subtitle {
                    font-size: 16px;
                    line-height: 1.6;
                    color: rgba(255, 255, 255, 0.5);
                    margin-bottom: 40px;
                    font-weight: 400;
                }

                .cta-button {
                    display: inline-block;
                    background-color: transparent;
                    color: #ffffff;
                    padding: 12px 32px;
                    font-size: 14px;
                    font-weight: 500;
                    text-decoration: none;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    transition: all 0.2s;
                }

                .cta-button:hover {
                    background-color: #ffffff;
                    color: #000000;
                    border-color: #ffffff;
                }


                @media (max-width: 640px) {
                    .footer-info {
                        flex-direction: column;
                        gap: 12px;
                        text-align: center;
                    }
                    
                    .divider { display: none; }
                    
                    .hero-title {
                        font-size: 32px;
                    }
                }
            `}</style>
        </div>
    );
}

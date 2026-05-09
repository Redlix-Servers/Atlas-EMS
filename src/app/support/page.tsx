'use client';

import React from 'react';
import Link from 'next/link';

export default function SupportPage() {
    return (
        <div className="doc-wrapper">
            <header className="doc-nav">
                <div className="doc-container">
                    <Link href="/" style={{ textDecoration: 'none' }}>
                        <div className="brand-container">
                            <img src="https://ik.imagekit.io/dypkhqxip/atlasf?updatedAt=1778110387224" alt="Atlas Logo" className="brand-logo" />
                            <span className="brand-name">Atlas Support</span>
                        </div>
                    </Link>
                    <nav className="nav-links">
                        <Link href="/employee/login" className="nav-link">Employee Login</Link>
                    </nav>
                </div>
            </header>

            <main className="doc-main">
                <div className="doc-container">
                    <aside className="doc-sidebar">
                        <nav className="side-nav">
                            <Link href="/support" className="nav-item active">Help Center</Link>
                            <Link href="/privacy" className="nav-item">Privacy Policy</Link>
                            <Link href="/terms" className="nav-item">Terms of Service</Link>
                            <div className="nav-divider"></div>
                            <span className="nav-section">Popular Topics</span>
                            <Link href="#" className="nav-item sub">Account Access</Link>
                            <Link href="#" className="nav-item sub">Security & MFA</Link>
                            <Link href="#" className="nav-item sub">Payroll Issues</Link>
                        </nav>
                    </aside>

                    <section className="doc-content">
                        <div className="breadcrumb">
                            <Link href="/">Atlas</Link>
                            <span className="separator">/</span>
                            <span>Support</span>
                        </div>

                        <h1 className="content-title">Atlas Support Center</h1>
                        <p className="content-intro">
                            Find answers to common questions about the Atlas Management System. 
                            If you can't find what you're looking for, contact your department administrator.
                        </p>

                        <div className="help-grid">
                            <div className="help-card">
                                <span className="material-symbols-outlined icon">key</span>
                                <h3>Account & Login</h3>
                                <p>Recover your password, update security settings, and manage your profile.</p>
                                <Link href="#" className="card-link">Learn more</Link>
                            </div>
                            <div className="help-card">
                                <span className="material-symbols-outlined icon">payments</span>
                                <h3>Payroll & Tax</h3>
                                <p>View your payslips, tax documents, and banking information.</p>
                                <Link href="#" className="card-link">Learn more</Link>
                            </div>
                            <div className="help-card">
                                <span className="material-symbols-outlined icon">event_available</span>
                                <h3>Attendance</h3>
                                <p>How to clock in/out and request leaves through the dashboard.</p>
                                <Link href="#" className="card-link">Learn more</Link>
                            </div>
                        </div>

                        <div className="support-cta">
                            <h2>Still need help?</h2>
                            <p>Our dedicated support team is available for urgent technical issues.</p>
                            <button className="contact-btn">Contact Redlix Systems</button>
                        </div>
                    </section>
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
                .doc-wrapper {
                    min-height: 100vh;
                    background-color: #0a0a0a;
                    color: #e8eaed;
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
                }

                .doc-nav {
                    padding: 32px 0;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                    background-color: #0a0a0a;
                    position: sticky;
                    top: 0;
                    z-index: 100;
                }

                .doc-container {
                    max-width: 1100px;
                    margin: 0 auto;
                    padding: 0 24px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .brand-container {
                    display: flex !important;
                    flex-direction: row !important;
                    align-items: center !important;
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

                .doc-main {
                    padding: 32px 0;
                }

                .doc-main .doc-container {
                    align-items: flex-start;
                }

                .doc-sidebar {
                    width: 280px;
                    position: sticky;
                    top: 96px;
                    padding-right: 32px;
                }

                .side-nav {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }

                .nav-item {
                    padding: 10px 16px;
                    color: #bdc1c6;
                    text-decoration: none;
                    font-size: 14px;
                    border-radius: 0 20px 20px 0;
                    transition: background 0.2s;
                }

                .nav-item:hover {
                    background-color: #3c4043;
                    color: #fff;
                }

                .nav-item.active {
                    background-color: rgba(138, 180, 248, 0.1);
                    color: #8ab4f8;
                    font-weight: 500;
                }

                .nav-divider {
                    height: 1px;
                    background-color: #3c4043;
                    margin: 16px 0;
                }

                .nav-section {
                    font-size: 12px;
                    color: #9aa0a6;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    padding: 0 16px 8px;
                }

                .doc-content {
                    flex: 1;
                    max-width: 840px;
                }

                .breadcrumb {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 13px;
                    color: #9aa0a6;
                    margin-bottom: 24px;
                }

                .breadcrumb a {
                    color: #8ab4f8;
                    text-decoration: none;
                }

                .content-title {
                    font-size: 32px;
                    font-weight: 400;
                    margin-bottom: 16px;
                    color: #fff;
                }

                .content-intro {
                    font-size: 16px;
                    color: #bdc1c6;
                    line-height: 1.6;
                    margin-bottom: 48px;
                }

                .help-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
                    gap: 24px;
                    margin-bottom: 64px;
                }

                .help-card {
                    background-color: #202124;
                    padding: 32px;
                    border: 1px solid #3c4043;
                    border-radius: 8px;
                    transition: border-color 0.2s;
                }

                .help-card:hover {
                    border-color: #8ab4f8;
                }

                .help-card .icon {
                    color: #8ab4f8;
                    font-size: 32px;
                    margin-bottom: 16px;
                }

                .help-card h3 {
                    font-size: 18px;
                    font-weight: 500;
                    margin-bottom: 12px;
                    color: #fff;
                }

                .help-card p {
                    font-size: 14px;
                    color: #9aa0a6;
                    line-height: 1.5;
                    margin-bottom: 20px;
                }

                .card-link {
                    color: #8ab4f8;
                    text-decoration: none;
                    font-size: 14px;
                    font-weight: 500;
                }

                .support-cta {
                    background-color: rgba(138, 180, 248, 0.05);
                    padding: 48px;
                    border-radius: 8px;
                    text-align: center;
                    border: 1px solid rgba(138, 180, 248, 0.1);
                }

                .support-cta h2 {
                    font-size: 24px;
                    font-weight: 400;
                    margin-bottom: 12px;
                    color: #fff;
                }

                .support-cta p {
                    color: #9aa0a6;
                    margin-bottom: 32px;
                }

                .contact-btn {
                    background-color: #8ab4f8;
                    color: #202124;
                    border: none;
                    padding: 12px 24px;
                    border-radius: 4px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: background 0.2s;
                }

                .contact-btn:hover {
                    background-color: #aecbfa;
                }


                @media (max-width: 960px) {
                    .doc-sidebar { display: none; }
                }

                @media (max-width: 640px) {
                    .footer-info {
                        flex-direction: column;
                        gap: 12px;
                        text-align: center;
                    }
                    
                    .divider { display: none; }
                }
            `}</style>
        </div>
    );
}

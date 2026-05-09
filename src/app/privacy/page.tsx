'use client';

import React from 'react';
import Link from 'next/link';

export default function PrivacyPage() {
    return (
        <div className="doc-wrapper">
            <header className="doc-nav">
                <div className="doc-container">
                    <Link href="/" style={{ textDecoration: 'none' }}>
                        <div className="brand-container">
                            <img src="https://ik.imagekit.io/dypkhqxip/atlasf?updatedAt=1778110387224" alt="Atlas Logo" className="brand-logo" />
                            <span className="brand-name">Atlas Privacy</span>
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
                            <Link href="/support" className="nav-item">Help Center</Link>
                            <Link href="/privacy" className="nav-item active">Privacy Policy</Link>
                            <Link href="/terms" className="nav-item">Terms of Service</Link>
                            <div className="nav-divider"></div>
                            <span className="nav-section">Legal</span>
                            <Link href="#" className="nav-item sub">Data Protection</Link>
                            <Link href="#" className="nav-item sub">Cookies Policy</Link>
                        </nav>
                    </aside>

                    <section className="doc-content">
                        <div className="breadcrumb">
                            <Link href="/">Atlas</Link>
                            <span className="separator">/</span>
                            <span>Privacy</span>
                        </div>

                        <h1 className="content-title">Privacy Policy</h1>
                        <p className="last-updated">Last modified: May 9, 2026</p>

                        <div className="legal-section">
                            <h2>1. Introduction</h2>
                            <p>
                                At Redlix Systems, we take your privacy seriously. This Privacy Policy explains how 
                                Atlas Management System collects, uses, and protects your personal and professional data.
                            </p>
                            
                            <h2>2. Data Collection</h2>
                            <p>We collect information necessary for employee management, including:</p>
                            <ul>
                                <li>Identification data (Name, ID, Profile Photo)</li>
                                <li>Contact information (Email, Phone)</li>
                                <li>Employment details (Department, Role, Salary)</li>
                                <li>Attendance and task performance metrics</li>
                            </ul>

                            <h2>3. Data Usage</h2>
                            <p>Your data is used exclusively for:</p>
                            <ul>
                                <li>Payroll processing and tax compliance</li>
                                <li>Internal communication and task management</li>
                                <li>Performance evaluation and attendance tracking</li>
                                <li>Security monitoring of system access</li>
                            </ul>

                            <h2>4. Data Security</h2>
                            <p>
                                We implement enterprise-grade security measures, including SSL encryption and 
                                MFA, to protect your data from unauthorized access or disclosure.
                            </p>

                            <h2>5. Contact Us</h2>
                            <p>
                                If you have questions about your data privacy, please contact the 
                                Redlix Systems Data Protection Office at security@redlix.co.in.
                            </p>
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
                    padding: 48px 0;
                }

                .doc-main .doc-container {
                    align-items: flex-start;
                }

                .doc-sidebar {
                    width: 280px;
                    position: sticky;
                    top: 112px;
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
                    max-width: 800px;
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
                    font-size: 36px;
                    font-weight: 400;
                    margin-bottom: 8px;
                    color: #fff;
                }

                .last-updated {
                    font-size: 14px;
                    color: #9aa0a6;
                    margin-bottom: 48px;
                }

                .legal-section h2 {
                    font-size: 20px;
                    font-weight: 500;
                    margin: 40px 0 16px;
                    color: #fff;
                }

                .legal-section p {
                    font-size: 16px;
                    color: #bdc1c6;
                    line-height: 1.6;
                    margin-bottom: 16px;
                }

                .legal-section ul {
                    padding-left: 24px;
                    margin-bottom: 24px;
                }

                .legal-section li {
                    color: #bdc1c6;
                    margin-bottom: 8px;
                    font-size: 15px;
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

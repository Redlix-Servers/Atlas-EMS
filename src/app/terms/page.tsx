'use client';

import React from 'react';
import Link from 'next/link';

export default function TermsPage() {
    return (
        <div className="doc-wrapper">
            <header className="doc-nav">
                <div className="doc-container">
                    <Link href="/" style={{ textDecoration: 'none' }}>
                        <div className="brand-container">
                            <img src="https://ik.imagekit.io/dypkhqxip/atlasf?updatedAt=1778110387224" alt="Atlas Logo" className="brand-logo" />
                            <span className="brand-name">Atlas Terms</span>
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
                            <Link href="/privacy" className="nav-item">Privacy Policy</Link>
                            <Link href="/terms" className="nav-item active">Terms of Service</Link>
                            <div className="nav-divider"></div>
                            <span className="nav-section">Legal</span>
                            <Link href="#" className="nav-item sub">User Agreement</Link>
                            <Link href="#" className="nav-item sub">Acceptable Use</Link>
                        </nav>
                    </aside>

                    <section className="doc-content">
                        <div className="breadcrumb">
                            <Link href="/">Atlas</Link>
                            <span className="separator">/</span>
                            <span>Terms</span>
                        </div>

                        <h1 className="content-title">Terms of Service</h1>
                        <p className="last-updated">Last modified: May 9, 2026</p>

                        <div className="legal-section">
                            <h2>1. Acceptance of Terms</h2>
                            <p>
                                By accessing or using the Atlas Management System ("System"), provided by Redlix Systems, 
                                you agree to be bound by these Terms of Service.
                            </p>
                            
                            <h2>2. System Use</h2>
                            <p>You agree to use the System only for authorized organizational purposes. Prohibited uses include:</p>
                            <ul>
                                <li>Attempting to bypass security protocols or MFA</li>
                                <li>Accessing data of other employees without authorization</li>
                                <li>Using the System for any illegal or harmful activity</li>
                                <li>Sharing your login credentials with third parties</li>
                            </ul>

                            <h2>3. Intellectual Property</h2>
                            <p>
                                The System, including its design, source code, and branding, is the exclusive property 
                                of Redlix Systems. Unauthorized copying or redistribution is strictly prohibited.
                            </p>

                            <h2>4. Termination of Access</h2>
                            <p>
                                Redlix Systems reserves the right to terminate or suspend access to the System for 
                                violations of these terms or at the request of the employing organization.
                            </p>

                            <h2>5. Liability</h2>
                            <p>
                                Redlix Systems provides the platform "as-is" and is not liable for indirect damages 
                                arising from system downtime or data entry errors made by users.
                            </p>
                        </div>
                    </section>
                </div>
            </main>
            <footer className="main-footer">
                <div className="footer-container">
                    <div className="footer-info">
                        <span className="copyright">© 2026 Redlix Systems</span>
                        <div className="divider"></div>
                        <Link href="/privacy" className="footer-link">Privacy</Link>
                        <div className="divider"></div>
                        <Link href="/terms" className="footer-link">Terms</Link>
                        <div className="divider"></div>
                        <Link href="/support" className="footer-link">Support</Link>
                        <div className="divider"></div>
                        <a href="https://redlix.co.in" target="_blank" rel="noopener noreferrer" className="redlix-link">
                            <img src="https://ik.imagekit.io/dypkhqxip/redlixlogo?updatedAt=1777318254456" alt="Redlix" className="footer-logo" />
                        </a>
                    </div>
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

                .main-footer {
                    padding: 64px 0;
                    border-top: 1px solid rgba(255, 255, 255, 0.05);
                }

                .footer-container {
                    max-width: 1100px;
                    margin: 0 auto;
                    padding: 0 24px;
                    display: flex;
                    justify-content: center;
                }

                .footer-info {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                    font-size: 11px;
                    color: rgba(255, 255, 255, 0.2);
                    font-weight: 400;
                }

                .footer-link {
                    color: rgba(255, 255, 255, 0.4);
                    text-decoration: none;
                    transition: color 0.2s;
                }

                .footer-link:hover {
                    color: #ffffff;
                }

                .footer-logo {
                    height: 14px;
                    filter: grayscale(1) opacity(0.3);
                    transition: all 0.3s ease;
                }

                .redlix-link:hover .footer-logo {
                    filter: grayscale(0) opacity(0.8);
                }

                .divider {
                    width: 1px;
                    height: 12px;
                    background-color: rgba(255, 255, 255, 0.1);
                    flex-shrink: 0;
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

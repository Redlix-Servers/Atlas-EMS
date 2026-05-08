'use client';

import React from 'react';
import Link from 'next/link';

export default function Home() {
    return (
        <div className="landing-container">
            <header className="navbar">
                <div className="logo-section">
                    <img src="https://ik.imagekit.io/dypkhqxip/atlasf?updatedAt=1778110387224" alt="Atlas Logo" className="atlas-logo" />
                    <span className="logo-text">ATLAS</span>
                </div>
                <div className="nav-links">
                    <Link href="/employee/login" className="nav-btn secondary">Employee Portal</Link>
                    <Link href="/admin/login" className="nav-btn primary">Admin Access</Link>
                </div>
            </header>

            <main className="hero">
                <div className="hero-content">
                    <div className="badge">Internal Management System</div>
                    <h1 className="hero-title">Efficiency through <br /><span>Intelligent Design</span></h1>
                    <p className="hero-subtitle">
                        Streamline your organization's workflow with Atlas. From real-time attendance 
                        to automated document management and task tracking.
                    </p>
                    <div className="cta-group">
                        <Link href="/employee/login" className="cta-btn main">Launch Dashboard</Link>
                        <div className="status-indicator">
                            <span className="dot"></span>
                            System Online
                        </div>
                    </div>
                </div>

                <div className="hero-visual">
                    <div className="visual-card">
                        <div className="card-header">
                            <span className="dot-red"></span>
                            <span className="dot-yellow"></span>
                            <span className="dot-green"></span>
                        </div>
                        <div className="card-content">
                            <div className="skeleton-line large"></div>
                            <div className="skeleton-grid">
                                <div className="skeleton-box"></div>
                                <div className="skeleton-box"></div>
                                <div className="skeleton-box"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="footer">
                <p>© 2024 HSG Association | Enterprise Security Enabled</p>
            </footer>

            <style jsx>{`
                .landing-container {
                    min-height: 100vh;
                    background: #000;
                    color: #fff;
                    font-family: 'Inter', sans-serif;
                    display: flex;
                    flex-direction: column;
                    overflow-x: hidden;
                }

                .navbar {
                    padding: 32px 64px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    z-index: 10;
                }

                .logo-section {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .atlas-logo {
                    width: 32px;
                    height: 32px;
                }

                .logo-text {
                    font-size: 18px;
                    font-weight: 800;
                    letter-spacing: 4px;
                    color: #fff;
                }

                .nav-links {
                    display: flex;
                    gap: 16px;
                }

                .nav-btn {
                    padding: 10px 24px;
                    border-radius: 4px;
                    font-size: 13px;
                    font-weight: 600;
                    text-decoration: none;
                    transition: all 0.2s;
                }

                .nav-btn.primary {
                    background: #fff;
                    color: #000;
                }

                .nav-btn.secondary {
                    background: rgba(255, 255, 255, 0.05);
                    color: #fff;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }

                .hero {
                    flex: 1;
                    padding: 64px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    position: relative;
                }

                .hero-content {
                    max-width: 600px;
                    z-index: 2;
                }

                .badge {
                    display: inline-block;
                    background: rgba(124, 58, 237, 0.1);
                    color: #7c3aed;
                    padding: 6px 16px;
                    border-radius: 100px;
                    font-size: 11px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    margin-bottom: 24px;
                }

                .hero-title {
                    font-size: 64px;
                    font-weight: 700;
                    line-height: 1.1;
                    margin-bottom: 24px;
                    letter-spacing: -2px;
                }

                .hero-title span {
                    color: #7c3aed;
                }

                .hero-subtitle {
                    font-size: 18px;
                    color: #888;
                    line-height: 1.6;
                    margin-bottom: 40px;
                }

                .cta-group {
                    display: flex;
                    align-items: center;
                    gap: 32px;
                }

                .cta-btn {
                    background: #7c3aed;
                    color: #fff;
                    padding: 16px 40px;
                    border-radius: 4px;
                    font-size: 15px;
                    font-weight: 600;
                    text-decoration: none;
                    transition: all 0.2s;
                    box-shadow: 0 10px 20px rgba(124, 58, 237, 0.2);
                }

                .cta-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 15px 30px rgba(124, 58, 237, 0.3);
                }

                .status-indicator {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    font-size: 13px;
                    color: #444;
                    font-weight: 600;
                }

                .dot {
                    width: 8px;
                    height: 8px;
                    background: #10b981;
                    border-radius: 50%;
                    box-shadow: 0 0 10px #10b981;
                    animation: pulse 2s infinite;
                }

                .hero-visual {
                    flex: 1;
                    display: flex;
                    justify-content: flex-end;
                    perspective: 1000px;
                }

                .visual-card {
                    width: 440px;
                    height: 300px;
                    background: #111;
                    border: 1px solid #222;
                    border-radius: 12px;
                    transform: rotateY(-15deg) rotateX(10deg);
                    box-shadow: -50px 50px 100px rgba(0,0,0,0.5);
                    overflow: hidden;
                }

                .card-header {
                    padding: 16px;
                    border-bottom: 1px solid #222;
                    display: flex;
                    gap: 8px;
                }

                .dot-red { width: 8px; height: 8px; background: #ff5f56; border-radius: 50%; }
                .dot-yellow { width: 8px; height: 8px; background: #ffbd2e; border-radius: 50%; }
                .dot-green { width: 8px; height: 8px; background: #27c93f; border-radius: 50%; }

                .card-content {
                    padding: 24px;
                }

                .skeleton-line {
                    height: 20px;
                    background: #1a1a1a;
                    border-radius: 4px;
                    margin-bottom: 24px;
                }

                .skeleton-line.large { width: 60%; }

                .skeleton-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr;
                    gap: 12px;
                }

                .skeleton-box {
                    height: 80px;
                    background: #1a1a1a;
                    border-radius: 4px;
                }

                .footer {
                    padding: 32px 64px;
                    border-top: 1px solid #111;
                    color: #333;
                    font-size: 12px;
                    font-weight: 500;
                    text-align: center;
                }

                @keyframes pulse {
                    0% { opacity: 1; }
                    50% { opacity: 0.4; }
                    100% { opacity: 1; }
                }

                @media (max-width: 1024px) {
                    .hero { flex-direction: column; text-align: center; padding: 32px; }
                    .hero-content { margin-bottom: 64px; }
                    .hero-visual { display: none; }
                    .navbar { padding: 24px; }
                    .cta-group { justify-content: center; }
                }
            `}</style>
        </div>
    );
}

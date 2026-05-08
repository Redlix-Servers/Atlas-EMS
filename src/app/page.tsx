'use client';

import React from 'react';
import Link from 'next/link';

export default function Home() {
    return (
        <div className="landing-wrapper">
            {/* Ambient Background Elements */}
            <div className="ambient-glow top-right"></div>
            <div className="ambient-glow bottom-left"></div>

            <header className="main-nav">
                <div className="brand-container">
                    <img src="https://ik.imagekit.io/dypkhqxip/atlasf?updatedAt=1778110387224" alt="Atlas Logo" className="brand-logo" />
                    <span className="brand-name">ATLAS</span>
                </div>
            </header>

            <main className="hero-section">
                <div className="hero-box">
                    <div className="hero-tag">Enterprise Management Solution</div>
                    <h1 className="hero-main-title">
                        Command your <br />
                        <span className="gradient-text">Workspace</span>
                    </h1>
                    <p className="hero-description">
                        The definitive internal platform for modern organizations. 
                        Attendance, payroll, and tasks—unified in one intelligent interface.
                    </p>

                    <div className="portal-grid">
                        <Link href="/employee/login" className="portal-box employee">
                            <div className="box-icon">
                                <span className="material-symbols-outlined">person</span>
                            </div>
                            <div className="box-info">
                                <span className="box-title">Employee Portal</span>
                                <span className="box-desc">Access your dashboard</span>
                            </div>
                            <span className="material-symbols-outlined arrow">arrow_forward</span>
                        </Link>

                        <Link href="/admin/login" className="portal-box admin">
                            <div className="box-icon">
                                <span className="material-symbols-outlined">admin_panel_settings</span>
                            </div>
                            <div className="box-info">
                                <span className="box-title">Admin Access</span>
                                <span className="box-desc">Manage organization</span>
                            </div>
                            <span className="material-symbols-outlined arrow">arrow_forward</span>
                        </Link>
                    </div>

                    <div className="system-status">
                        <div className="status-dot"></div>
                        <span className="status-text">Core Systems Operational</span>
                    </div>
                </div>
            </main>

            <footer className="landing-footer">
                <div className="footer-content">
                    <div className="powered-by">
                        <span>Powered by</span>
                        <a href="https://redlix.co.in" target="_blank" rel="noopener noreferrer" className="redlix-link">
                            <img src="https://ik.imagekit.io/dypkhqxip/redlixlogo?updatedAt=1777318254456" alt="Redlix" className="footer-logo" />
                        </a>
                    </div>
                </div>
            </footer>

            <style jsx>{`
                .landing-wrapper {
                    min-height: 100vh;
                    background-color: #000;
                    color: #fff;
                    font-family: 'Inter', sans-serif;
                    display: flex;
                    flex-direction: column;
                    position: relative;
                    overflow: hidden;
                }

                .ambient-glow {
                    position: absolute;
                    width: 600px;
                    height: 600px;
                    background: radial-gradient(circle, rgba(124, 58, 237, 0.08) 0%, transparent 70%);
                    filter: blur(80px);
                    z-index: 1;
                }

                .top-right { top: -200px; right: -200px; }
                .bottom-left { bottom: -200px; left: -200px; }

                .main-nav {
                    padding: 40px;
                    display: flex;
                    justify-content: center;
                    z-index: 10;
                }

                .brand-container {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .brand-logo {
                    width: 32px;
                    height: 32px;
                }

                .brand-name {
                    font-size: 16px;
                    font-weight: 800;
                    letter-spacing: 4px;
                    background: linear-gradient(to bottom, #fff, #888);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .hero-section {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 40px 24px;
                    z-index: 2;
                }

                .hero-box {
                    max-width: 800px;
                    text-align: center;
                    animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1);
                }

                .hero-tag {
                    display: inline-block;
                    padding: 6px 16px;
                    background: rgba(124, 58, 237, 0.1);
                    color: #7c3aed;
                    border: 1px solid rgba(124, 58, 237, 0.2);
                    border-radius: 100px;
                    font-size: 11px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    margin-bottom: 32px;
                }

                .hero-main-title {
                    font-size: clamp(36px, 6vw, 60px);
                    font-weight: 800;
                    line-height: 1.1;
                    margin-bottom: 20px;
                    letter-spacing: -2px;
                }

                .gradient-text {
                    background: linear-gradient(to right, #7c3aed, #a78bfa);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .hero-description {
                    font-size: clamp(14px, 1.5vw, 17px);
                    color: #888;
                    max-width: 480px;
                    margin: 0 auto 48px auto;
                    line-height: 1.6;
                }

                .portal-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 20px;
                    margin-bottom: 48px;
                }

                .portal-box {
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    padding: 18px 24px;
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    text-decoration: none;
                    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                    text-align: left;
                    position: relative;
                    overflow: hidden;
                }

                .portal-box:hover {
                    background: rgba(255, 255, 255, 0.06);
                    border-color: rgba(255, 255, 255, 0.1);
                    transform: translateY(-4px);
                }

                .portal-box.employee:hover { border-color: rgba(124, 58, 237, 0.4); }
                .portal-box.admin:hover { border-color: rgba(255, 255, 255, 0.4); }

                .box-icon {
                    width: 48px;
                    height: 48px;
                    background: rgba(255, 255, 255, 0.05);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 0;
                }

                .box-icon .material-symbols-outlined { font-size: 24px; color: #fff; }

                .box-info { display: flex; flex-direction: column; }
                .box-title { font-size: 14px; font-weight: 600; color: #fff; margin-bottom: 2px; }
                .box-desc { font-size: 11px; color: #555; }

                .arrow { font-size: 18px; color: #333; margin-left: auto; transition: transform 0.3s ease; }
                .portal-box:hover .arrow { transform: translateX(4px); color: #fff; }

                .system-status {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    opacity: 0.5;
                }

                .status-dot { width: 6px; height: 6px; background: #10b981; border-radius: 50%; box-shadow: 0 0 10px #10b981; }
                .status-text { font-size: 11px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; }

                .landing-footer {
                    padding: 40px;
                    display: flex;
                    justify-content: center;
                    z-index: 10;
                    border-top: 1px solid rgba(255, 255, 255, 0.03);
                }

                .powered-by {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    font-size: 12px;
                    color: #444;
                    font-weight: 500;
                }

                .footer-logo {
                    height: 20px;
                    filter: grayscale(1) opacity(0.5);
                    transition: all 0.3s ease;
                }

                .redlix-link:hover .footer-logo {
                    filter: grayscale(0) opacity(1);
                }

                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @media (max-width: 768px) {
                    .portal-grid { grid-template-columns: 1fr; }
                    .hero-main-title { letter-spacing: -1px; }
                    .main-nav { padding: 32px 24px; }
                    .landing-footer { padding: 32px 24px; }
                }
            `}</style>
        </div>
    );
}


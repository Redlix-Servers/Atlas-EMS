'use client';

import React, { useState } from 'react';
import Link from 'next/link';

import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function EmployeeSignUpPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [selectedCompany, setSelectedCompany] = useState<any>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const router = useRouter();

    const companies = [
        { id: 'redlix', name: 'Redlix', logo: 'https://ik.imagekit.io/dypkhqxip/redlixlogo?updatedAt=1777318254456' },
        { id: 'student-forge', name: 'Student Forge', logo: 'https://ik.imagekit.io/dypkhqxip/sf-next-logo?updatedAt=1772993490660' },
        { id: 'forge-digital', name: 'Forge Digital Technologies', logo: 'https://ik.imagekit.io/dypkhqxip/Screenshot_2026-03-18_at_10.22.48-removebg-preview.png?updatedAt=1775325233099' },
        { id: 'cleed-systems', name: 'Cleed Systems', logo: 'https://ik.imagekit.io/dypkhqxip/logo.png?updatedAt=1777320313623' },
    ];
    const handleGitLabLogin = async () => {
        setIsLoading(true);
        setError('');
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'gitlab',
                options: {
                    redirectTo: `${window.location.origin}/employee/dashboard`
                }
            });
            if (error) throw error;
        } catch (err: any) {
            setError(err.message || 'GitLab signup failed');
            setIsLoading(false);
        }
    };

    const handleWeb3Login = async () => {
        setIsLoading(true);
        setError('');
        try {
            if (!(window as any).ethereum) {
                throw new Error('Web3 wallet not found. Please install MetaMask.');
            }
            const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
            console.log('Connected with address:', accounts[0]);
            router.push('/employee/dashboard');
        } catch (err: any) {
            setError(err.message || 'Failed to connect wallet');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const formData = new FormData(e.currentTarget);
        const email = formData.get('email');
        const password = formData.get('password');
        const company = selectedCompany?.id;

        if (!company) {
            setError('Please select a company');
            setIsLoading(false);
            return;
        }

        try {
            const res = await fetch('/api/employee/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, company }),
            });

            if (res.ok) {
                router.push('/employee/dashboard');
            } else {
                const data = await res.json();
                setError(data.error || 'Something went wrong');
            }
        } catch (err) {
            setError('Failed to connect to server');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <main className="auth-content">
                <h1 className="auth-title">Create your Employee Account</h1>

                {error && <div style={{ color: '#ff4b4b', marginBottom: '16px', fontSize: '14px' }}>{error}</div>}

                <div className="sso-section">
                    <button 
                        className="sso-button" 
                        onClick={handleGitLabLogin}
                        style={{ background: 'transparent', border: '1px solid #444', color: '#fff' }}
                        disabled={isLoading}
                    >
                        <img 
                            src="https://img.icons8.com/color/48/gitlab.png" 
                            alt="GitLab" 
                            style={{ width: '22px', height: '22px' }} 
                        />
                        {isLoading ? 'Connecting...' : 'Sign up with GitLab'}
                    </button>
                </div>

                <div className="divider">or</div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="email">Work Email</label>
                        <input 
                            name="email"
                            type="email" 
                            id="email" 
                            className="form-input" 
                            placeholder="name@company.com"
                            required
                        />
                    </div>

                    <div className="form-group" style={{ position: 'relative' }}>
                        <label className="form-label">Company</label>
                        <div 
                            className="custom-select" 
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'space-between',
                                cursor: 'pointer',
                                background: '#000',
                                border: '1px solid #444',
                                padding: '10px 12px',
                                color: selectedCompany ? '#fff' : '#888'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                {selectedCompany ? (
                                    <>
                                        <img 
                                            src={selectedCompany.logo} 
                                            alt="" 
                                            style={{ 
                                                height: '16px', 
                                                width: 'auto', 
                                                objectFit: 'contain',
                                                filter: selectedCompany.id === 'forge-digital' ? 'invert(1) grayscale(1) brightness(2)' : 'none'
                                            }} 
                                        />
                                        <span>{selectedCompany.name}</span>
                                    </>
                                ) : (
                                    <span>Select your company</span>
                                )}
                            </div>
                            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                                {isDropdownOpen ? 'expand_less' : 'expand_more'}
                            </span>
                        </div>

                        {isDropdownOpen && (
                            <div className="dropdown-menu" style={{ 
                                position: 'absolute', 
                                top: '100%', 
                                left: 0, 
                                right: 0, 
                                background: '#111', 
                                border: '1px solid #333', 
                                zIndex: 10,
                                marginTop: '4px',
                                maxHeight: '200px',
                                overflowY: 'auto'
                            }}>
                                {companies.map((comp) => (
                                    <div 
                                        key={comp.id}
                                        className="dropdown-item"
                                        onClick={() => {
                                            setSelectedCompany(comp);
                                            setIsDropdownOpen(false);
                                        }}
                                        style={{ 
                                            padding: '10px 12px', 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            gap: '12px',
                                            cursor: 'pointer',
                                            transition: 'background 0.2s'
                                        }}
                                        onMouseOver={(e) => e.currentTarget.style.background = '#222'}
                                        onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                                    >
                                        <img 
                                            src={comp.logo} 
                                            alt="" 
                                            style={{ 
                                                height: '16px', 
                                                width: '24px', 
                                                objectFit: 'contain',
                                                filter: comp.id === 'forge-digital' ? 'invert(1) grayscale(1) brightness(2)' : 'none'
                                            }} 
                                        />
                                        <span style={{ fontSize: '13px', color: '#eee' }}>{comp.name}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="password">Password</label>
                        <div className="input-wrapper">
                            <input 
                                name="password"
                                type={showPassword ? "text" : "password"} 
                                id="password" 
                                className="form-input" 
                                placeholder="Set a secure password"
                                required
                            />
                            <button 
                                type="button" 
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                    <circle cx="12" cy="12" r="3"/>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <button type="submit" className="submit-button" disabled={isLoading}>
                        {isLoading ? 'Creating account...' : 'Sign up'}
                    </button>
                </form>

                <div className="auth-links">
                    <div className="auth-link-item">
                        <Link href="#" onClick={(e) => { e.preventDefault(); handleWeb3Login(); }} className="auth-link">Sign up with Web3 Wallet</Link>
                    </div>
                    <div className="auth-link-item">
                        Already have an account? <Link href="/employee/login" className="auth-link">Sign in</Link>
                    </div>
                </div>
            </main>

            <footer className="auth-footer">
                <div className="auth-footer-left">
                    <Link href="/privacy" className="auth-footer-link">Privacy</Link>
                    <Link href="/terms" className="auth-footer-link">Terms</Link>
                    <Link href="/support" className="auth-footer-link">Support</Link>
                </div>
                <div className="auth-footer-right">
                    © 2026 Redlix Systems
                </div>
            </footer>
        </div>
    );
}

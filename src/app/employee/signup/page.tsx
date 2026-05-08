'use client';

import React, { useState } from 'react';
import Link from 'next/link';

import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function EmployeeSignUpPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();
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
        const company = formData.get('company');

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

                    <div className="form-group">
                        <label className="form-label" htmlFor="company">Company</label>
                        <select name="company" id="company" className="form-select" required defaultValue="">
                            <option value="" disabled>Select your company</option>
                            <option value="redlix">Redlix</option>
                            <option value="student-forge">Student Forge</option>
                            <option value="forge-digital">Forge Digital Technologies</option>
                            <option value="cleed-systems">Cleed Systems</option>
                            <option value="dhasha-media">Dhasha Media</option>
                        </select>
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
                    <Link href="#" className="auth-footer-link">Privacy Policy</Link>
                    <Link href="#" className="auth-footer-link">Terms of Service</Link>
                    <Link href="#" className="auth-footer-link">Support</Link>
                </div>
                <div className="auth-footer-right">
                    devhacksender@gamil.com
                </div>
            </footer>
        </div>
    );
}

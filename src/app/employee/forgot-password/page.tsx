'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const res = await fetch('/api/employee/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (res.ok) {
                setMessage({ type: 'success', text: 'Password reset link has been sent to your email.' });
                setEmail('');
            } else {
                setMessage({ type: 'error', text: data.error || 'Something went wrong. Please try again.' });
            }
        } catch (err) {
            setMessage({ type: 'error', text: 'Failed to connect to the server.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <main className="auth-content">
                <div style={{ marginBottom: '32px' }}>
                    <Link href="/employee/login" style={{ color: '#888', textDecoration: 'none', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_back</span>
                        Back to Login
                    </Link>
                </div>

                <h1 className="auth-title">Reset your password</h1>
                <p style={{ color: '#888', fontSize: '14px', marginBottom: '32px', lineHeight: '1.5' }}>
                    Enter the email address associated with your account and we'll send you a link to reset your password.
                </p>

                {message.text && (
                    <div style={{ 
                        padding: '12px 16px', 
                        borderRadius: '4px', 
                        marginBottom: '24px',
                        fontSize: '14px',
                        background: message.type === 'success' ? 'rgba(74, 222, 128, 0.1)' : 'rgba(248, 113, 113, 0.1)',
                        border: `1px solid ${message.type === 'success' ? '#4ade80' : '#f87171'}`,
                        color: message.type === 'success' ? '#4ade80' : '#f87171'
                    }}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Work Email</label>
                        <input 
                            type="email" 
                            className="form-input" 
                            placeholder="name@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="submit-button" disabled={isLoading} style={{ width: '100%', marginTop: '12px' }}>
                        {isLoading ? 'Sending Link...' : 'Send Reset Link'}
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '32px', fontSize: '13px', color: '#666' }}>
                    Don't have an account? <Link href="/employee/signup" style={{ color: '#a78bfa', textDecoration: 'none' }}>Sign up</Link>
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

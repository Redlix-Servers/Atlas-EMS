'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem('admin_session', 'true');
                router.push('/admin/dashboard');
            } else {
                setError(data.error || 'Invalid admin credentials.');
            }
        } catch (err) {
            setError('Connection error.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ 
            backgroundColor: '#0a0a0a', 
            minHeight: '100vh', 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontFamily: 'Inter, sans-serif'
        }}>
            <div style={{ width: '100%', maxWidth: '400px', padding: '40px', animation: 'fadeIn 0.5s ease-out' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '40px' }}>
                    <div style={{ width: '24px', height: '24px', backgroundColor: '#7c3aed' }}></div>
                    <span style={{ fontSize: '18px', fontWeight: 600, letterSpacing: '-0.5px' }}>Atlas Admin</span>
                </div>

                <h1 style={{ fontSize: '24px', fontWeight: 500, marginBottom: '32px' }}>Sign in to Admin Panel</h1>

                {error && (
                    <div style={{ 
                        padding: '12px', 
                        background: 'rgba(239, 68, 68, 0.1)', 
                        color: '#f87171', 
                        border: '1px solid #f87171', 
                        fontSize: '13px', 
                        marginBottom: '24px' 
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', fontSize: '12px', color: '#888', marginBottom: '8px' }}>Admin Email</label>
                        <input 
                            type="email" 
                            className="form-input" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email address"
                            required
                        />
                    </div>

                    <div style={{ marginBottom: '32px' }}>
                        <label style={{ display: 'block', fontSize: '12px', color: '#888', marginBottom: '8px' }}>Password</label>
                        <input 
                            type="password" 
                            className="form-input" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="submit-button" 
                        disabled={isLoading}
                        style={{ width: '100%', padding: '12px', background: '#7c3aed', color: '#fff' }}
                    >
                        {isLoading ? 'Verifying...' : 'Login as Admin'}
                    </button>
                </form>
            </div>
        </div>
    );
}

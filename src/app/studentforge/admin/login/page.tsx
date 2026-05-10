'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function StudentForgeLoginPage() {
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
                localStorage.setItem('studentforge_session', 'true');
                router.push('/studentforge/admin/dashboard');
            } else {
                setError(data.error || 'Invalid credentials for StudentForge Admin.');
            }
        } catch (err) {
            setError('Connection error.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ 
            backgroundColor: '#050505', 
            minHeight: '100vh', 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontFamily: 'Inter, sans-serif'
        }}>
            <div style={{ width: '100%', maxWidth: '420px', padding: '40px', animation: 'fadeIn 0.8s ease-out' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '48px', justifyContent: 'center' }}>
                    <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #fbbf24 0%, #d97706 100%)', borderRadius: '4px' }}></div>
                    <span style={{ fontSize: '24px', fontWeight: 800, letterSpacing: '-1px', color: '#fbbf24' }}>StudentForge</span>
                </div>

                <div style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', padding: '40px', borderRadius: '20px', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
                    <h1 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px', textAlign: 'center' }}>Forge Administration</h1>
                    <p style={{ color: '#555', fontSize: '13px', textAlign: 'center', marginBottom: '32px' }}>Authorized access only.</p>

                    {error && (
                        <div style={{ 
                            padding: '12px 16px', 
                            background: 'rgba(239, 68, 68, 0.05)', 
                            color: '#f87171', 
                            border: '1px solid rgba(239, 68, 68, 0.2)', 
                            fontSize: '13px', 
                            marginBottom: '24px',
                            borderRadius: '8px',
                            textAlign: 'center'
                        }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin}>
                        <div style={{ marginBottom: '24px' }}>
                            <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#333', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>Forge Identifier</label>
                            <input 
                                type="email" 
                                style={{ width: '100%', background: '#050505', border: '1px solid #1a1a1a', borderRadius: '10px', padding: '14px', color: 'white', outline: 'none', fontSize: '14px' }}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Admin Email"
                                required
                            />
                        </div>

                        <div style={{ marginBottom: '40px' }}>
                            <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#333', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>Security Key</label>
                            <input 
                                type="password" 
                                style={{ width: '100%', background: '#050505', border: '1px solid #1a1a1a', borderRadius: '10px', padding: '14px', color: 'white', outline: 'none', fontSize: '14px' }}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <button 
                            type="submit" 
                            disabled={isLoading}
                            style={{ 
                                width: '100%', 
                                padding: '16px', 
                                background: 'linear-gradient(90deg, #fbbf24 0%, #d97706 100%)', 
                                color: '#000', 
                                border: 'none', 
                                borderRadius: '12px', 
                                fontWeight: 800, 
                                cursor: 'pointer',
                                fontSize: '15px',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                boxShadow: '0 10px 20px rgba(251, 191, 36, 0.1)'
                            }}
                        >
                            {isLoading ? 'INITIATING ACCESS...' : 'ENTER THE FORGE'}
                        </button>
                    </form>
                </div>
                
                <p style={{ color: '#333', fontSize: '11px', textAlign: 'center', marginTop: '40px', fontWeight: 500 }}>
                    POWERED BY REDLIX CORE INFRASTRUCTURE
                </p>
            </div>
        </div>
    );
}

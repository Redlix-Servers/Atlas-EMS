'use client';

import React, { useState, useEffect } from 'react';
import DashboardShell from '@/components/DashboardShell';
import { useRouter } from 'next/navigation';

interface Document {
    id: string;
    title: string;
    description: string | null;
    fileUrl: string;
    createdAt: string;
}

interface UserSession {
    id: string;
    email: string;
    company: string;
}

export default function EmployeeDocumentsPage() {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [session, setSession] = useState<UserSession | null>(null);
    const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const res = await fetch('/api/employee/documents');
                if (res.ok) {
                    const data = await res.json();
                    setDocuments(data);
                } else if (res.status === 401) {
                    router.push('/employee/login');
                }

                // We need session info for the shell
                // This is a bit hacky because we're in a client component
                // In a real app, you'd probably use a context or fetch it
                const sessionRes = await fetch('/api/employee/profile'); // Assuming this exists or create one
                if (sessionRes.ok) {
                    const profile = await sessionRes.json();
                    setSession({
                        id: profile.id,
                        email: profile.email,
                        company: profile.company
                    });
                }
            } catch (error) {
                console.error('Error fetching documents:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchInitialData();
    }, [router]);

    const handleLogout = async () => {
        // Since we're in a client component, we can't use 'use server' directly easily
        // We'll call a logout API
        await fetch('/api/employee/logout', { method: 'POST' });
        router.push('/employee/login');
    };

    if (isLoading) {
        return <div style={{ padding: '40px', textAlign: 'center', color: '#555' }}>Loading...</div>;
    }

    return (
        <DashboardShell 
            userEmail={session?.email || ''} 
            company={session?.company || ''}
            onLogout={handleLogout}
        >
            <div style={{ animation: 'fadeIn 0.5s ease-out', maxWidth: '1000px', height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ marginBottom: '24px' }}>
                    <h2 style={{ fontSize: '22px', fontWeight: 600, marginBottom: '4px' }}>Documents</h2>
                    <p style={{ color: '#555', fontSize: '13px' }}>View and download your official documents.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: selectedDoc ? '300px 1fr' : '1fr', gap: '24px', flex: 1, minHeight: 0 }}>
                    {/* Documents List */}
                    <div style={{ background: '#111', border: '1px solid #222', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                        <div style={{ padding: '16px', borderBottom: '1px solid #222', fontSize: '14px', fontWeight: 600 }}>
                            Available Files
                        </div>
                        <div style={{ overflowY: 'auto', flex: 1 }}>
                            {documents.length === 0 ? (
                                <div style={{ padding: '32px', textAlign: 'center', color: '#444', fontSize: '13px' }}>No documents available.</div>
                            ) : (
                                documents.map((doc) => (
                                    <div 
                                        key={doc.id}
                                        onClick={() => setSelectedDoc(doc)}
                                        style={{ 
                                            padding: '16px', 
                                            borderBottom: '1px solid #1a1a1a', 
                                            cursor: 'pointer',
                                            background: selectedDoc?.id === doc.id ? 'rgba(124, 58, 237, 0.05)' : 'transparent',
                                            borderLeft: selectedDoc?.id === doc.id ? '3px solid #7c3aed' : '3px solid transparent',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        <div style={{ fontSize: '13px', fontWeight: 500, color: selectedDoc?.id === doc.id ? '#7c3aed' : '#eee', marginBottom: '4px' }}>
                                            {doc.title}
                                        </div>
                                        <div style={{ fontSize: '11px', color: '#444' }}>
                                            {new Date(doc.createdAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* PDF Viewer */}
                    {selectedDoc ? (
                        <div style={{ background: '#111', border: '1px solid #222', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ padding: '12px 20px', borderBottom: '1px solid #222', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ fontSize: '14px', fontWeight: 600 }}>{selectedDoc.title}</div>
                                <button 
                                    onClick={() => setSelectedDoc(null)}
                                    style={{ background: 'none', border: 'none', color: '#555', cursor: 'pointer' }}
                                >
                                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>close</span>
                                </button>
                            </div>
                            <div style={{ flex: 1, background: '#0a0a0a' }}>
                                <iframe 
                                    src={`${selectedDoc.fileUrl}#toolbar=0`} 
                                    style={{ width: '100%', height: '100%', border: 'none' }}
                                    title={selectedDoc.title}
                                />
                            </div>
                        </div>
                    ) : (
                        !selectedDoc && documents.length > 0 && (
                            <div style={{ background: '#111', border: '1px solid #222', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#444' }}>
                                <div style={{ textAlign: 'center' }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.2 }}>description</span>
                                    <div style={{ fontSize: '14px' }}>Select a document to preview</div>
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </DashboardShell>
    );
}

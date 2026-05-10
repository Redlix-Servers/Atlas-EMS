'use client';

import React, { useState, useEffect } from 'react';
import StudentForgeShell from '@/components/StudentForgeShell';

interface Employee {
    id: string;
    fullName: string | null;
    email: string;
}

interface Document {
    id: string;
    title: string;
    description: string | null;
    fileUrl: string;
    createdAt: string;
    employee: {
        fullName: string | null;
        email: string;
    } | null;
}

export default function StudentForgeDocumentsPage() {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const companyName = "StudentForge";

    // Form state
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [fileUrl, setFileUrl] = useState('');
    const [selectedEmployeeId, setSelectedEmployeeId] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [docsRes, empsRes] = await Promise.all([
                fetch(`/api/admin/documents?company=${encodeURIComponent(companyName)}`),
                fetch(`/api/admin/employees?company=${encodeURIComponent(companyName)}`)
            ]);
            
            if (docsRes.ok) setDocuments(await docsRes.json());
            if (empsRes.ok) setEmployees(await empsRes.json());
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const res = await fetch('/api/admin/documents', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title,
                    description,
                    fileUrl,
                    employeeId: selectedEmployeeId || null
                })
            });

            if (res.ok) {
                setShowForm(false);
                setTitle('');
                setDescription('');
                setFileUrl('');
                setSelectedEmployeeId('');
                fetchData();
            } else {
                const data = await res.json();
                alert(data.error || 'Failed to add document');
            }
        } catch (error) {
            console.error('Error adding document:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <StudentForgeShell>
            <div style={{ animation: 'fadeIn 0.5s ease-out', maxWidth: '1200px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                    <div>
                        <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#fff', marginBottom: '8px', letterSpacing: '-1px' }}>Forge Documents</h2>
                        <p style={{ color: '#666', fontSize: '14px' }}>Issue and manage official StudentForge documentation.</p>
                    </div>
                    <button 
                        onClick={() => setShowForm(!showForm)}
                        style={{
                            background: showForm ? '#111' : '#fbbf24',
                            color: showForm ? '#666' : '#000',
                            border: showForm ? '1px solid #222' : 'none',
                            padding: '12px 24px',
                            borderRadius: '12px',
                            fontSize: '14px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            transition: 'all 0.2s'
                        }}
                    >
                        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                            {showForm ? 'close' : 'add_circle'}
                        </span>
                        {showForm ? 'Cancel' : 'Issue New Document'}
                    </button>
                </div>

                {showForm && (
                    <div style={{ 
                        background: '#0a0a0a', 
                        border: '1px solid #fbbf24', 
                        padding: '32px', 
                        borderRadius: '16px',
                        marginBottom: '40px',
                        animation: 'slideDown 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                        boxShadow: '0 20px 40px rgba(251, 191, 36, 0.05)'
                    }}>
                        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                            <div style={{ gridColumn: '1 / -1' }}>
                                <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#444', marginBottom: '10px', letterSpacing: '1px' }}>Document Title</label>
                                <input 
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="e.g. StudentForge Welcome Letter"
                                    required
                                    style={{ width: '100%', background: '#050505', border: '1px solid #1a1a1a', borderRadius: '10px', padding: '14px', color: 'white', outline: 'none', fontSize: '14px' }}
                                />
                            </div>
                            <div style={{ gridColumn: '1 / -1' }}>
                                <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#444', marginBottom: '10px', letterSpacing: '1px' }}>File URL (PDF Link)</label>
                                <input 
                                    value={fileUrl}
                                    onChange={(e) => setFileUrl(e.target.value)}
                                    placeholder="https://cloud.forge.com/docs/welcome.pdf"
                                    required
                                    style={{ width: '100%', background: '#050505', border: '1px solid #1a1a1a', borderRadius: '10px', padding: '14px', color: 'white', outline: 'none', fontSize: '14px' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#444', marginBottom: '10px', letterSpacing: '1px' }}>Assign to Participant</label>
                                <select 
                                    value={selectedEmployeeId}
                                    onChange={(e) => setSelectedEmployeeId(e.target.value)}
                                    style={{ width: '100%', background: '#050505', border: '1px solid #1a1a1a', borderRadius: '10px', padding: '14px', color: 'white', outline: 'none', fontSize: '14px', cursor: 'pointer' }}
                                >
                                    <option value="">All Forge Members (Global)</option>
                                    {employees.map(emp => (
                                        <option key={emp.id} value={emp.id}>{emp.fullName || emp.email}</option>
                                    ))}
                                </select>
                            </div>
                            <div style={{ gridColumn: '1 / -1' }}>
                                <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#444', marginBottom: '10px', letterSpacing: '1px' }}>Brief Description</label>
                                <textarea 
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Provide context for this document..."
                                    style={{ width: '100%', background: '#050505', border: '1px solid #1a1a1a', borderRadius: '10px', padding: '14px', color: 'white', outline: 'none', minHeight: '100px', resize: 'vertical', fontSize: '14px' }}
                                />
                            </div>
                            <div style={{ gridColumn: '1 / -1' }}>
                                <button 
                                    type="submit" 
                                    disabled={isSubmitting}
                                    style={{
                                        width: '100%',
                                        background: 'linear-gradient(90deg, #fbbf24 0%, #d97706 100%)',
                                        color: '#000',
                                        border: 'none',
                                        padding: '16px',
                                        borderRadius: '12px',
                                        fontSize: '15px',
                                        fontWeight: 800,
                                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                        opacity: isSubmitting ? 0.7 : 1,
                                        boxShadow: '0 10px 20px rgba(251, 191, 36, 0.15)'
                                    }}
                                >
                                    {isSubmitting ? 'PROVISIONING DOCUMENT...' : 'ISSUE DOCUMENT'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                <div style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: '16px', overflow: 'hidden' }}>
                    <div style={{ padding: '24px 32px', borderBottom: '1px solid #1a1a1a', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.01)' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#fff' }}>Forge Vault</h3>
                        <div style={{ fontSize: '11px', fontWeight: 800, color: '#444', textTransform: 'uppercase', letterSpacing: '1px' }}>{documents.length} Records Secured</div>
                    </div>
                    <div>
                        {isLoading ? (
                            <div style={{ padding: '80px', textAlign: 'center', color: '#444' }}>Synchronizing vault...</div>
                        ) : documents.length === 0 ? (
                            <div style={{ padding: '80px', textAlign: 'center', color: '#444' }}>No documents issued yet.</div>
                        ) : (
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ textAlign: 'left', borderBottom: '1px solid #111' }}>
                                        <th style={{ padding: '16px 32px', fontSize: '11px', color: '#333', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>Identity</th>
                                        <th style={{ padding: '16px 32px', fontSize: '11px', color: '#333', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>Owner</th>
                                        <th style={{ padding: '16px 32px', fontSize: '11px', color: '#333', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>Issued On</th>
                                        <th style={{ padding: '16px 32px', fontSize: '11px', color: '#333', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {documents.map((doc) => (
                                        <tr key={doc.id} style={{ borderBottom: '1px solid #111', transition: 'background 0.2s' }} className="vault-row">
                                            <td style={{ padding: '20px 32px' }}>
                                                <div style={{ fontSize: '14px', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>{doc.title}</div>
                                                <div style={{ fontSize: '12px', color: '#555', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{doc.description || 'No description provided'}</div>
                                            </td>
                                            <td style={{ padding: '20px 32px' }}>
                                                {doc.employee ? (
                                                    <div>
                                                        <div style={{ fontSize: '13px', color: '#fbbf24', fontWeight: 600 }}>{doc.employee.fullName || 'User'}</div>
                                                        <div style={{ fontSize: '11px', color: '#333' }}>{doc.employee.email}</div>
                                                    </div>
                                                ) : (
                                                    <span style={{ fontSize: '9px', fontWeight: 800, padding: '3px 10px', borderRadius: '4px', background: 'rgba(251, 191, 36, 0.1)', color: '#fbbf24', border: '1px solid rgba(251, 191, 36, 0.2)', textTransform: 'uppercase' }}>Forge Global</span>
                                                )}
                                            </td>
                                            <td style={{ padding: '20px 32px', fontSize: '13px', color: '#444', fontWeight: 500 }}>
                                                {new Date(doc.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                                            </td>
                                            <td style={{ padding: '20px 32px' }}>
                                                <a 
                                                    href={doc.fileUrl} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    style={{ 
                                                        color: '#fbbf24', 
                                                        fontSize: '12px', 
                                                        fontWeight: 700,
                                                        textDecoration: 'none',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '8px'
                                                    }}
                                                >
                                                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>visibility</span>
                                                    VIEW
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>

            <style jsx>{`
                .vault-row:hover {
                    background: rgba(251, 191, 36, 0.02);
                }
                @keyframes slideDown {
                    from { opacity: 0; transform: translateY(-20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </StudentForgeShell>
    );
}

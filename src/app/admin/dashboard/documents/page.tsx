'use client';

import React, { useState, useEffect } from 'react';
import AdminShell from '@/components/AdminShell';

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

export default function AdminDocumentsPage() {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showForm, setShowForm] = useState(false);

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
                fetch('/api/admin/documents'),
                fetch('/api/admin/employees')
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
        <AdminShell>
            <div style={{ animation: 'fadeIn 0.5s ease-out', maxWidth: '1000px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                    <div>
                        <h2 style={{ fontSize: '22px', fontWeight: 600, marginBottom: '4px' }}>Document Management</h2>
                        <p style={{ color: '#555', fontSize: '13px' }}>Upload and assign documents to employees.</p>
                    </div>
                    <button 
                        onClick={() => setShowForm(!showForm)}
                        style={{
                            background: '#7c3aed',
                            color: 'white',
                            border: 'none',
                            padding: '10px 20px',
                            borderRadius: '4px',
                            fontSize: '13px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}
                    >
                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                            {showForm ? 'close' : 'add'}
                        </span>
                        {showForm ? 'Cancel' : 'Add Document'}
                    </button>
                </div>

                {showForm && (
                    <div style={{ 
                        background: '#111', 
                        border: '1px solid #222', 
                        padding: '24px', 
                        marginBottom: '32px',
                        animation: 'slideDown 0.3s ease-out'
                    }}>
                        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div style={{ gridColumn: '1 / -1' }}>
                                <label style={{ display: 'block', fontSize: '12px', color: '#888', marginBottom: '8px' }}>Document Title</label>
                                <input 
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="e.g. Q1 Performance Review"
                                    required
                                    style={{ width: '100%', background: '#0a0a0a', border: '1px solid #222', padding: '12px', color: 'white', outline: 'none' }}
                                />
                            </div>
                            <div style={{ gridColumn: '1 / -1' }}>
                                <label style={{ display: 'block', fontSize: '12px', color: '#888', marginBottom: '8px' }}>File URL (PDF Link)</label>
                                <input 
                                    value={fileUrl}
                                    onChange={(e) => setFileUrl(e.target.value)}
                                    placeholder="https://example.com/document.pdf"
                                    required
                                    style={{ width: '100%', background: '#0a0a0a', border: '1px solid #222', padding: '12px', color: 'white', outline: 'none' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '12px', color: '#888', marginBottom: '8px' }}>Assign to Employee (Optional)</label>
                                <select 
                                    value={selectedEmployeeId}
                                    onChange={(e) => setSelectedEmployeeId(e.target.value)}
                                    style={{ width: '100%', background: '#0a0a0a', border: '1px solid #222', padding: '12px', color: 'white', outline: 'none' }}
                                >
                                    <option value="">All Employees (Global)</option>
                                    {employees.map(emp => (
                                        <option key={emp.id} value={emp.id}>{emp.fullName || emp.email}</option>
                                    ))}
                                </select>
                            </div>
                            <div style={{ gridColumn: '1 / -1' }}>
                                <label style={{ display: 'block', fontSize: '12px', color: '#888', marginBottom: '8px' }}>Description</label>
                                <textarea 
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Add a brief note about this document..."
                                    style={{ width: '100%', background: '#0a0a0a', border: '1px solid #222', padding: '12px', color: 'white', outline: 'none', minHeight: '80px', resize: 'vertical' }}
                                />
                            </div>
                            <div style={{ gridColumn: '1 / -1' }}>
                                <button 
                                    type="submit" 
                                    disabled={isSubmitting}
                                    style={{
                                        width: '100%',
                                        background: '#7c3aed',
                                        color: 'white',
                                        border: 'none',
                                        padding: '12px',
                                        borderRadius: '4px',
                                        fontSize: '14px',
                                        fontWeight: 600,
                                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                        opacity: isSubmitting ? 0.7 : 1
                                    }}
                                >
                                    {isSubmitting ? 'Saving...' : 'Save Document'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                <div style={{ background: '#111', border: '1px solid #222' }}>
                    <div style={{ padding: '16px 20px', borderBottom: '1px solid #222', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 style={{ fontSize: '14px', fontWeight: 600 }}>All Documents</h3>
                        <span style={{ fontSize: '12px', color: '#444' }}>{documents.length} Total</span>
                    </div>
                    <div style={{ padding: '0' }}>
                        {isLoading ? (
                            <div style={{ padding: '32px', textAlign: 'center', color: '#555', fontSize: '13px' }}>Loading documents...</div>
                        ) : documents.length === 0 ? (
                            <div style={{ padding: '32px', textAlign: 'center', color: '#555', fontSize: '13px' }}>No documents found.</div>
                        ) : (
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ textAlign: 'left', borderBottom: '1px solid #222', background: 'rgba(255,255,255,0.01)' }}>
                                        <th style={{ padding: '12px 20px', fontSize: '11px', color: '#444', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Document</th>
                                        <th style={{ padding: '12px 20px', fontSize: '11px', color: '#444', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Assigned To</th>
                                        <th style={{ padding: '12px 20px', fontSize: '11px', color: '#444', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Date Added</th>
                                        <th style={{ padding: '12px 20px', fontSize: '11px', color: '#444', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Link</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {documents.map((doc) => (
                                        <tr key={doc.id} style={{ borderBottom: '1px solid #1a1a1a' }}>
                                            <td style={{ padding: '12px 20px' }}>
                                                <div style={{ fontSize: '13px', fontWeight: 500, color: '#eee' }}>{doc.title}</div>
                                                <div style={{ fontSize: '11px', color: '#444', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{doc.description || 'No description'}</div>
                                            </td>
                                            <td style={{ padding: '12px 20px' }}>
                                                {doc.employee ? (
                                                    <div>
                                                        <div style={{ fontSize: '12px', color: '#888' }}>{doc.employee.fullName || 'User'}</div>
                                                        <div style={{ fontSize: '10px', color: '#333' }}>{doc.employee.email}</div>
                                                    </div>
                                                ) : (
                                                    <span style={{ fontSize: '10px', padding: '2px 6px', background: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.2)' }}>GLOBAL</span>
                                                )}
                                            </td>
                                            <td style={{ padding: '12px 20px', fontSize: '12px', color: '#444' }}>
                                                {new Date(doc.createdAt).toLocaleDateString()}
                                            </td>
                                            <td style={{ padding: '12px 20px' }}>
                                                <a 
                                                    href={doc.fileUrl} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    style={{ 
                                                        color: '#7c3aed', 
                                                        fontSize: '12px', 
                                                        textDecoration: 'none',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '4px'
                                                    }}
                                                >
                                                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>open_in_new</span>
                                                    View Link
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
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes slideDown {
                    from { opacity: 0; transform: translateY(-20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </AdminShell>
    );
}
